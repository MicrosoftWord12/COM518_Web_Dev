import bettersqlite3 from "better-sqlite3";
import { DATABASE_NAME } from "../../lib/constants";

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

// const Connection = new DatabaseHandler(DATABASE_NAME)
export default DatabaseHandler