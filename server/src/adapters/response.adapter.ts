import { Metadata } from "@common/models";
import { Response as ExpressResponse } from "express";
/**
 * Response Adapter
 */
export class Response {
  // Método para enviar resposta padronizada após validação
  json<T>(res: ExpressResponse, data: T | T[], metadata?: Metadata) {
    // Validator simples: verifica se data não é undefined ou null
    if (data === undefined || data === null) {
      return res.status(400).json({
        success: false,
        error: "Response data is missing or invalid",
      });
    }
    // Se for array, calcula total automaticamente, senão usa o do options
    const isArray = Array.isArray(data);
    const total = isArray ? (data as T[]).length : undefined;

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
