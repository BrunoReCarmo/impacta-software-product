import { BaseEntity } from "./base.entity";

export interface UserEntity extends BaseEntity {
    name: string,
    email: string;
    job?: string,
}