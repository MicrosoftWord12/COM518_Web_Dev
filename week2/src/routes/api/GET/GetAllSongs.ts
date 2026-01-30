import { Request, Response } from "express";
import { HTTP_METHODS } from "../../../lib/types/HTTPMethod";
import { IController } from "../../../lib/types/IController";
// import BetterSqlite from "../../../lib/handler/Database";
import { daoHandler } from "../../../data/base/DaoHandler";

export default class implements IController {
    url: string = "/GetAllSongs";
    method: HTTP_METHODS = HTTP_METHODS.GET;
    
    async execute(req: Request, res: Response) {
        const songs = daoHandler.getDao("wadsongs")!.createSql("SELECT * FROM wadsongs")

        res.json({
            message: `All Songs`,
            data: songs
        });
    }   
}