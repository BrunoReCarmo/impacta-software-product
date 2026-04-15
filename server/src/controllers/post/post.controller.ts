import { Request, Response } from "express";
import { PostEntity, PostTagsEntity } from "@common/models";
import { Repositories } from "@/repositories/auth.repositories";
import { OperationsAdapter } from "@/adapters/operations.adapter";
import { Response as ResponseAdapter } from "@/adapters/response.adapter";
import { UserController } from "../user/user.controller";
import { CreatePostInputDTO } from "@common/dto";

const repositories = new Repositories();
const userController = new UserController()
const responseAdapter = new ResponseAdapter();
const operationsAdapter = new OperationsAdapter();


const jwt_secret_key = process.env.JWT_SECRET as string;

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

  async GetPosts(req: Request, res: Response) {
    const user = await userController.getUserFromToken(req);
    if (!user) return responseAdapter.json<string>(res, "Unauthorized", { status: "failed" });

    operationsAdapter.query<PostEntity>(
      res,
      repositories.Post(),
      async (result) => {
        if (result.length === 0) {
          return responseAdapter.json<string>(res, "No posts found", { status: "failed" });
        }
        return responseAdapter.json<PostEntity[]>(res, result, { status: "ok" });
      },
      (q) => q.select(`
      id,
      body,
      title,
      created_at,
      user:${repositories.table()}(id, name, email),
      tags:${repositories.PostTagRelations()}(
        tag:${repositories.PostTags()}(id, tag_name, color)
      )
    `)
    );
  }
  async CreatePost(req: Request, res: Response) {
    const user = await userController.getUserFromToken(req);
    if (!user) return responseAdapter.json<string>(res, "Unauthorized", { status: "failed" });

    const { body, tagsId, title } = req.body as CreatePostInputDTO;

    operationsAdapter.query<{ id: number }>(
      res,
      repositories.Post(),
      async (result) => {
        const post = result[0];

        if (tagsId?.length > 0) {
          await Promise.all(
            tagsId.map((tagId) =>
              operationsAdapter.query(
                res,
                repositories.PostTagRelations(),
                undefined,
                (q) => q.insert({ post_id: post.id, tag_id: tagId })
              )
            )
          );
        }

        return responseAdapter.json<string>(res, "Post created successfully", { status: "ok" });
      },
      (q) => q.insert({ body, title, user_id: user.id }).select()
    );
  }
}
