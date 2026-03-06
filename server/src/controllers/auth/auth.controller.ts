import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { dbPaths } from "@/config/db.paths";
import { LoginInputDTO, SignUpInputDTO } from "@common/dto";
import { Request, Response, UserEntity } from "@common/models";
import { OperationsAdapter } from "@/adapters/operations.adapter";
import { Response as ResponseAdapter } from "@/adapters/response.adapter";

const responseAdapter = new ResponseAdapter();
const operationsAdapter = new OperationsAdapter();
const jwt_secret_key = process.env.JWT_SECRET as string;

type AuthRow = UserEntity & { password: string };

export class AuthController {
  login(req: Request<LoginInputDTO>, res: Response<string>) {
    const { email, password } = req.body;
    operationsAdapter.query<AuthRow>(
      res,
      `SELECT * FROM ${dbPaths.tables.auth} WHERE ${dbPaths.columns.auth.email} = ?`,
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
      [email]
    );
  }

  async signUp(req: Request<SignUpInputDTO>, res: Response<string>) {
    const saltRounds = 10;
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    operationsAdapter.query<SignUpInputDTO & { id: number }>(
      res,
      `INSERT INTO ${dbPaths.tables.auth}
        (${dbPaths.columns.auth.user}, ${dbPaths.columns.auth.email}, ${dbPaths.columns.auth.passwd})
        VALUES (?, ?, ?)`,
      async (_result) => {
        return responseAdapter.json<string>(res, "User created", { status: "ok" });
      },
      [name, email, hashedPassword]
    );
  }
}
