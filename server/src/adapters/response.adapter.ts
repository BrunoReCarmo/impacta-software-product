import { Metadata } from "@common/models";
import { Response as ExpressResponse } from "express";

/**
 * Adapter for sending standardized JSON responses via Express.
 *
 * Wraps the Express `res.json` method to enforce a consistent response envelope:
 * ```json
 * {
 *   "success": true,
 *   "metadata": { ...metadata, "total": <number | undefined> },
 *   "data": <T | T[]>
 * }
 * ```
 * On invalid data, returns:
 * ```json
 * {
 *   "success": false,
 *   "error": "Response data is missing or invalid"
 * }
 * ```
 */
export class Response {
  /**
   * Sends a standardized JSON response.
   *
   * @template T - The type of the response payload.
   * @param res - The Express response object.
   * @param data - The payload to send. Can be a single object or an array.
   *   - If `data` is an array, `metadata.total` is automatically set to the array length.
   *   - If `data` is `null` or `undefined`, responds with HTTP 400 and an error message.
   * @param metadata - Optional metadata to include in the response envelope.
   * @returns The Express response with the JSON body.
   *
   * @example
   * // Single object
   * adapter.json(res, { id: 1, name: "Alice" });
   *
   * @example
   * // Array with pagination metadata
   * adapter.json(res, [{ id: 1 }, { id: 2 }], { page: 1, pageSize: 10 });
   */
  json<T>(res: ExpressResponse, data: T | T[], metadata?: Metadata) {
    const isArray = Array.isArray(data);
    const total = isArray ? (data as T[]).length : undefined;

    if (data === undefined || data === null) {
      return res.status(400).json({
        success: false,
        error: "Response data is missing or invalid",
      });
    }

    return res.json({
      success: true,
      metadata: {
        ...metadata,
        total,
      },
      data,
    });
  }
}
