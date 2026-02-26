import { TagIdEnum } from "../enums/tags.enum";

export interface PostEntity {
    text: string;
    tags: TagIdEnum
    authorId: string;
}
