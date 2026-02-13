import IDao from "../../lib/types/IDao";
import DatabaseHandler from "../base/Connection";

export default class implements IDao {
    tableName: string = "wadsongs";
    db: DatabaseHandler

    constructor(db: DatabaseHandler) {
        this.db = db
    }

    createSql(sqlQuery: string, params?: any) {
        if (params === undefined) {
            return this.db.getDB().prepare(sqlQuery).all()
        }

        if (Array.isArray(params)) {
            return this.db.getDB().prepare(sqlQuery).all(...params)
        }

        return this.db.getDB().prepare(sqlQuery).all(params)
    }

    createSqlMany(sqlQueries: string[], params?: any) {
        const transaction = this.db.getDB().transaction((data: any) => {
            for (const query of sqlQueries) {
                this.db.getDB().prepare(query).run(data)
            }
        })

        transaction(params)
    }

    runSql(sqlQuery: string, params?: any) {
        if (params === undefined) {
            return this.db.getDB().prepare(sqlQuery).run()
        }

        if (Array.isArray(params)) {
            return this.db.getDB().prepare(sqlQuery).run(...params)
        }

        return this.db.getDB().prepare(sqlQuery).run(params)
    }
}