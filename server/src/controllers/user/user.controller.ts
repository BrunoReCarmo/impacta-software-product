import jwt from "jsonwebtoken";
import { UserEntity } from "@common/models";
import { Request, Response } from "express";
import { supabase } from "@/config/supabase.config"; // 👈
import { Repositories } from "@/repositories/auth.repositories";
import { OperationsAdapter } from "@/adapters/operations.adapter";
import { Response as ResponseAdapter } from "@/adapters/response.adapter";

const repositories = new Repositories();
const responseAdapter = new ResponseAdapter();
const operationsAdapter = new OperationsAdapter();
const jwt_secret_key = process.env.JWT_SECRET as string;

type AuthRow = UserEntity & { password: string };

export class UserController {
async getUserFromToken(req: Request): Promise<UserEntity | null> {
  const authorization = req.headers.authorization;
  if (!authorization) return null;

  const token = authorization.replace("Bearer ", "");

  let email: string;
  try {
    const decoded = jwt.verify(token, jwt_secret_key) as { email: string };
    email = decoded.email;
    console.log("email decoded:", email); // 👈
  } catch (err) {
    console.log("jwt error:", err); // 👈
    return null;
  }

const { data, error } = await supabase
  .from(repositories.table())
  .select("*")
  .eq("email", email)
  .limit(1) // 👈
  .maybeSingle(); // 👈 não quebra com 0 ou múltiplos resultados

  console.log("supabase data:", data); // 👈
  console.log("supabase error:", error); // 👈

  if (error || !data) return null;

  const { password: _, ...user } = data as AuthRow;
  return user as UserEntity;
}

  // 👇 userMe continua igual, usando operationsAdapter normalmente
  userMe(req: Request, res: Response) {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return responseAdapter.json<string>(res, "Unauthorized", { status: "failed" });
    }

    const token = authorization.replace("Bearer ", "");

    let email: string;
    try {
      const decoded = jwt.verify(token, jwt_secret_key) as { email: string };
      email = decoded.email;
    } catch {
      return responseAdapter.json<string>(res, "Invalid token", { status: "failed" });
    }

    operationsAdapter.query<AuthRow>(
      res,
      repositories.table(),
      async (result) => {
        if (result.length === 0) {
          return responseAdapter.json<string>(res, "User not found", { status: "failed" });
        }
        const { password: _, ...user } = result[0];
        return responseAdapter.json<UserEntity>(res, user as UserEntity, { status: "ok" });
      },
      (q) => q.select("*").eq("email", email)
    );
  }
}