import { Request, Response } from "express";
import { HttpMethod } from "../../../lib/types/HTTPMethod";
import { IController } from "../../../lib/types/IController";
import BetterSqlite from "../../../lib/handler/Database";

export default class implements IController {
    url: string = "/GetSongById";
    method: HttpMethod = "get";
    
    async execute(req: Request, res: Response) {
        const id = req.query.id;

        const songs = BetterSqlite.getDB().prepare("SELECT * FROM wadsongs where id = ?").all(id);

        res.json({
            message: `Songs by Id: ${id}`,
            data: songs
        });
    }   
}