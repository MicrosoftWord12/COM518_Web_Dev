import { HTTP_METHODS } from "../../../lib/types/HTTPMethod";
import { IController } from "../../../lib/types/IController";
import type { Request, Response } from "express";
// import BetterSqlite from "../../../lib/handler/Database";

export default class implements IController {
    url: string = "/GetAllSongsByTitle";
    method: HTTP_METHODS = HTTP_METHODS.GET;
    
    async execute(req: Request, res: Response) {
        const title = req.query.title;

        // const songs = BetterSqlite.getDB().prepare(`SELECT * FROM wadsongs WHERE title = ?`).all(title);

        res.json({
            message: `Songs with title: ${title}`,
            // data: songs
        });
    }   
}