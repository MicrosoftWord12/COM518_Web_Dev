import { Request, Response } from "express";
import { HttpMethod } from "../../../lib/types/HTTPMethod";
import { IController } from "../../../lib/types/IController";
import BetterSqlite from "../../../lib/handler/Database";

export default class implements IController {
    url: string = "/GetAllSongs";
    method: HttpMethod = "get";
    
    async execute(req: Request, res: Response) {
        const artist = req.query.artist;

        const songs = BetterSqlite.getDB().prepare("SELECT * FROM wadsongs").all();

        res.json({
            message: `All Songs: ${artist}`,
            data: songs
        });
    }   
}