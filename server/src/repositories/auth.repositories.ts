import { dbPaths } from "@/config/db.paths";

export class Repositories {
    table(): string {
        return dbPaths.tables.auth;
    }
}
