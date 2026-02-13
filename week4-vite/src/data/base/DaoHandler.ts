import { error } from "node:console";
import IDao from "../../lib/types/IDao";
import DatabaseHandler from "./Connection";
import SongsDao from "../DAOS/SongsDao";
import ArtistDao from "../DAOS/ArtistDao";

class DaoHandler {
    daos: { [key: string]: IDao};
    db: DatabaseHandler

    constructor() {
        this.daos = {}
        this.db = new DatabaseHandler("wadsongs.db")
    }

    addDao(dao: IDao) {
        if (this.getDao(dao.tableName.toLowerCase())) {
            error(`Duplicate Entry for ${dao.tableName} Exists!`)
            return
        }
        this.daos[dao.tableName.toLowerCase()] = dao
    }
    
    getDao(daoName: string) {
        if (this.daos[daoName])
            return this.daos[daoName]
        else
            error(`${daoName} doesn't exist`)
    }
}

export const daoHandler = new DaoHandler()

daoHandler.addDao(new SongsDao(daoHandler.db))
daoHandler.addDao(new ArtistDao(daoHandler.db))

console.log(daoHandler.daos)

