import { Request, Response } from "express";
import { HTTP_METHODS } from "../../../lib/types/HTTPMethod";
import { IController } from "../../../lib/types/IController";
// import BetterSqlite from "../../../lib/handler/Database";

export default class implements IController {
    url: string = "/GetSongById";
    method: HTTP_METHODS = HTTP_METHODS.GET;
    
    async execute(req: Request, res: Response) {
        const id = req.query.id;

        // const songs = BetterSqlite.getDB().prepare("SELECT * FROM wadsongs where id = ?").get(id);

        res.json({
            message: `Songs by Id: ${id}`,
            // data: songs
        });
    }   
}