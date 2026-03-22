import { dbPaths } from "@/config/db.paths";

export class Repositories {
    table(): string {
        return dbPaths.tables.auth;
    }
    PostTags(): string {
        return dbPaths.tables.pubTags;
    }
}
