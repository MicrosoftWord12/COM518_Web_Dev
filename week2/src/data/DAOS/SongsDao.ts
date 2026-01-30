import IDao from "../../lib/types/IDao";
import DatabaseHandler from "../base/Connection";

export default class implements IDao {
    tableName: string = "wadsongs";
    db: DatabaseHandler

    constructor(db: DatabaseHandler) {
        this.db = db
    }

    createSql(sqlQuery: string, params?: any[]) {
        if (params) {
            return this.db.getDB().prepare(sqlQuery).all(...params)
        }
        else
            return this.db.getDB().prepare(sqlQuery).all()
    }

    createSqlMany(sqlQueries: string[], params?: any[]) {
        const transaction = this.db.getDB().transaction((data) => {
            for (const query of sqlQueries) {
                this.db.getDB().prepare(query).run(data)
            }
        })

        transaction(params)
    }

    runSql(sqlQuery: string, params?: any[]) {
        if (params) {
            return this.db.getDB().prepare(sqlQuery).run(...params)
        }
        else
            return this.db.getDB().prepare(sqlQuery).run()
    }


}