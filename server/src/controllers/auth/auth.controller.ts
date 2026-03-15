import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { LoginInputDTO, SignUpInputDTO } from "@common/dto";
import { UserEntity } from "@common/models";
import { Request, Response } from "express";
import { Repositories } from "@/repositories/auth.repositories";
import { OperationsAdapter } from "@/adapters/operations.adapter";
import { Response as ResponseAdapter } from "@/adapters/response.adapter";

const repositories = new Repositories()
const responseAdapter = new ResponseAdapter();
const operationsAdapter = new OperationsAdapter();
const jwt_secret_key = process.env.JWT_SECRET as string;

type AuthRow = UserEntity & { password: string };

export class AuthController {
  login(req: Request, res: Response) {
    const { email, password } = req.body as LoginInputDTO;
    operationsAdapter.query<AuthRow>(
      res,
      repositories.table(),
      async (result) => {
        if (result.length > 0) {
          const hashedPassword = result[0].password;
          const passwordMatch = await bcrypt.compare(password, hashedPassword);

          if (passwordMatch) {
            const token = jwt.sign({ email }, jwt_secret_key, {
              expiresIn: "24h",
            });
            return responseAdapter.json<string>(res, token, { status: "ok" });
          } else {
            return responseAdapter.json<string>(res, "Wrong password", { status: "failed" });
          }
        } else {
          return responseAdapter.json<string>(res, "Not Found", { status: "failed" });
        }
      },
      (q) => q.select('*').eq('email', email)
    );
  }

  async signUp(req: Request, res: Response) {
    const saltRounds = 10;
    const { name, email, password } = req.body as SignUpInputDTO;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    operationsAdapter.query<SignUpInputDTO & { id: number }>(
      res,
      repositories.table(),
      async (_result) => {
        const token = jwt.sign({ email }, jwt_secret_key, {
          expiresIn: "24h",
        });

        return responseAdapter.json<string>(res, token, { status: "ok" });
      },
      (q) => q.insert({ name, email, password: hashedPassword }).select()
    );
  }
}
