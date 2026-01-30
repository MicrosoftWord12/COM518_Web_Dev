import { Request, Response } from "express";
import { HTTP_METHODS } from "../../../lib/types/HTTPMethod";
import { IController } from "../../../lib/types/IController";
import { daoHandler } from "../../../data/base/DaoHandler";
// import BetterSqlite from "../../../lib/handler/Database";

export default class implements IController {
    url: string = "/GetAllSongsByArtist";
    method: HTTP_METHODS = HTTP_METHODS.GET;
    
    async execute(req: Request, res: Response) {
        const artist = req.query.artist;

        const songs = daoHandler.getDao("wadsongs")?.createSql("select * from wadsongs where artist = ?", [artist])

        res.json({
            message: `Songs by artist: ${artist}`,
            data: songs
        });
    }   
}