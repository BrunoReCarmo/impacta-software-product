import { Response } from "@common/models";
import connection from "@/config/db.connection";
import { Response as ResponseAdapter } from "./response.adapter";

const responseAdapter = new ResponseAdapter();

export class OperationsAdapter {
  query<T, R>(res: Response<string>, query: string, mutation?: (result: R[]) => void | Promise<void>, filter?: T | T[]) {
    connection.query(query, [filter], async (err, result) => {
      if (err) {
        console.error("error", err);
        return responseAdapter.json<string>(res, "error from connection", {
            status: "failed",
        });
    }
    try {
        await mutation(result)
    } catch (error) {
        console.error("error", error);
        return responseAdapter.json<string>(res, `error from connection: ${error}`, {
            status: "failed",
          });
      }
    });
  }
}
