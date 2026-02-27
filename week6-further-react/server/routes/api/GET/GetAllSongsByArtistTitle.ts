import { Request, Response } from "express";
import { HTTP_METHODS } from "../../../lib/types/HTTPMethod";
import { IController } from "../../../lib/types/IController";
import { daoHandler } from "../../../data/base/DaoHandler";

export default class implements IController {
    url: string = "/GetAllSongsByArtistTitle";
    method: HTTP_METHODS = HTTP_METHODS.GET;
    
    async execute(req: Request, res: Response) {
        const artist = req.query.artist;
        const title = req.query.title;

        const songs = daoHandler.getDao("wadsongs")?.createSql("SELECT * FROM wadsongs WHERE artist = ? AND title = ?", [artist, title])

        res.json({
            message: `Songs by artist: ${artist} and title: ${title}`,
            data: songs
        });
    }   
}