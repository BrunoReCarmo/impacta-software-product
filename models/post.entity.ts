import { TagIdEnum } from "../enums/tags.enum";
import { PostTagsEntity } from "./postTags.entity";
import { UserEntity } from "./user.entity";

export interface PostEntity {
    body: string;
    title: string;
    tags: PostTagsEntity[];
    user: UserEntity;
    created_at: Date;
    id: number;
}
