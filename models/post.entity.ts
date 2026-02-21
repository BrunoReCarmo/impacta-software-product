import { TagIdEnum } from "../enums/tags.enum";

export interface PostEntity {
    text: string;
    author: string;
    tags: TagIdEnum
}
