import bettersqlite3 from "better-sqlite3";
import { DATABASE_NAME } from "../constants";

export class DatabaseHandler {
    databaseName: string
    db: bettersqlite3.Database

    constructor(databaseFilename: string) {
        this.databaseName = databaseFilename
        this.db = new bettersqlite3(`./src/data/${this.databaseName}`)
    }

    getDB(): bettersqlite3.Database {
        return this.db
    }
}

const BetterSqlite = new DatabaseHandler(DATABASE_NAME)
export default BetterSqlite