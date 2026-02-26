import jwt from "jsonwebtoken";
var bcrypt = require("bcryptjs");
import { dbPaths } from "@/config/db.paths";
import { LoginInputDTO, SignUpInputDTO } from "@common/dto";
import { Request, Response, UserEntity } from "@common/models";
import { OperationsAdapter } from "@/adapters/operations.adapter";
import { Response as ResponseAdapter } from "@/adapters/response.adapter";

const responseAdapter = new ResponseAdapter();
const operationsAdapter = new OperationsAdapter();
const jwt_secret_key = process.env.JWT_SECRET as string;

export class authController {
  login(req: Request<LoginInputDTO>, res: Response<string>) {
    const { email, password } = req.query.body;
    operationsAdapter.query<UserEntity, LoginInputDTO>(
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
            return responseAdapter.json(
              { message: "Wrong password" },
              { status: "failed" }
            );
          }
        } else {
          return responseAdapter.json(
            { message: "Not Found" },
            { status: "failed" }
          );
        }
      }
    );
  }

  signUp(req: Request<SignUpInputDTO>, res: Response<string>) {
    const saltRounds = 10;
    const { name, email, password } = req.query.body;

    const hashedPassword = bcrypt.hash(password, saltRounds);

    const data = { name, email, hashedPassword };

    operationsAdapter.query<Omit<UserEntity, "id">, SignUpInputDTO>(
      res,
      `INSERT INTO ${dbPaths.tables.auth} 
        (${dbPaths.columns.auth.user}, ${dbPaths.columns.auth.email}, ${dbPaths.columns.auth.passwd})
        VALUES (?, ?, ?))`,
      async (result) => {
        console.log(result);
      },
      data
    );
  }
}
