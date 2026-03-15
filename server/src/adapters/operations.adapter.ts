import { Response } from "express";
import { supabase } from "@/config/supabase.config";
import { Response as ResponseAdapter } from "./response.adapter";

const responseAdapter = new ResponseAdapter();

/**
 * Adapter for executing Supabase queries with error handling
 * and standardized JSON responses via `ResponseAdapter`.
 */
export class OperationsAdapter {
  /**
   * Executes a Supabase query and pipes the result through an optional mutation callback.
   *
   * @template R - The expected row type returned by the query.
   * @param res - The Express response object (typed as `Response<string>` for error payloads).
   * @param table - The Supabase table name to query.
   * @param mutation - Async callback that receives the query result rows.
   * @param builder - Optional function to customize the Supabase query (filters, selects, etc.).
   *
   * @example
   * adapter.query<UserRow>(res, "users", async (rows) => {
   *   responseAdapter.json(res, rows[0]);
   * }, (q) => q.eq("id", userId));
   */
  async query<R>(
    res: Response<string>,
    table: string,
    mutation?: (result: R[]) => unknown,
    builder?: (query: any) => any
  ) {
    try {
      const base = supabase.from(table);
      const query = builder ? builder(base) : base.select("*");

      const { data, error } = await query;

      if (error) {
        console.error("error", error);
        return responseAdapter.json<string>(res, error.message, { status: "failed" }, 500);
      }

      await mutation?.(data as R[]);
    } catch (error) {
      console.error("error", error);
      return responseAdapter.json<string>(res, `error from connection: ${error}`, { status: "failed" });
    }
  }
}
