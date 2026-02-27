import bettersqlite3 from "better-sqlite3";
import { DATABASE_NAME } from "../../lib/constants";
import path from "path";

export class DatabaseHandler {
    databaseName: string
    db: bettersqlite3.Database

    constructor(databaseFilename: string) {
        this.databaseName = databaseFilename
        const dbPath = path.resolve(__dirname, "..", this.databaseName)
        console.log("Database path:", dbPath)
        this.db = new bettersqlite3(dbPath)
    }

    getDB(): bettersqlite3.Database {
        return this.db
    }
}

export default DatabaseHandler