import { Response } from "@common/models";
import connection from "@/config/db.connection";
import { Response as ResponseAdapter } from "./response.adapter";

const responseAdapter = new ResponseAdapter();

/**
 * Adapter for executing raw SQL queries against the database connection.
 *
 * Wraps the low-level `connection.query` call with error handling and
 * standardized JSON responses via `ResponseAdapter`.
 */
export class OperationsAdapter {
  /**
   * Executes a SQL query and pipes the result through an optional mutation callback.
   *
   * @template R - The expected row type returned by the query.
   * @param res - The Express response object (typed as `Response<string>` for error payloads).
   * @param query - The raw SQL query string to execute.
   * @param mutation - Optional async callback that receives the query result rows.
   *   Use this to transform data and send the final response.
   *   If the callback throws, a 200 response with a `"failed"` status is sent.
   * @param params - Optional array of parameterized query values (replaces `?` placeholders).
   *
   * @example
   * adapter.query<UserRow>(res, "SELECT * FROM users WHERE id = ?", async (rows) => {
   *   responseAdapter.json(res, rows[0]);
   * }, [userId]);
   */
  query<R>(res: Response<string>, query: string, mutation?: (result: R[]) => void | Promise<void>, params?: unknown[]) {
    connection.query(query, params ?? [], async (err, result) => {
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
