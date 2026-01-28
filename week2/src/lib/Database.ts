import bettersqlite3 from "better-sqlite3";
// const db = new Database("../data/wadsongs.db")

export default class {
    databaseName: string
    db: bettersqlite3.Database


    constructor(databaseFilename: string) {
        this.databaseName = databaseFilename
        this.db = new bettersqlite3(`./src/data/${this.databaseName}`)
    }
}