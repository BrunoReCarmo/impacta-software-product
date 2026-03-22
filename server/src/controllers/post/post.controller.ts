import { Request, Response } from "express";
import { PostTagsEntity } from "@common/models";
import { Repositories } from "@/repositories/auth.repositories";
import { OperationsAdapter } from "@/adapters/operations.adapter";
import { Response as ResponseAdapter } from "@/adapters/response.adapter";

const repositories = new Repositories();
const responseAdapter = new ResponseAdapter();
const operationsAdapter = new OperationsAdapter();

export class PostController {
  PostTags(req: Request, res: Response) {
    operationsAdapter.query<Array<PostTagsEntity>>(
      res,
      repositories.PostTags(),
      async (result) => {
        if (result.length === 0) {
          return responseAdapter.json<string>(res, "Post not found", { status: "failed" });
        }
        return responseAdapter.json<Array<PostTagsEntity>>(res, result, { status: "ok" });
      },
      (q) => q.select('*')
    );
  }
}
