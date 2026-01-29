import { Request, Response } from "express";
import { HttpMethod } from "../../../lib/types/HTTPMethod";
import { IController } from "../../../lib/types/IController";
import BetterSqlite from "../../../lib/handler/Database";

export default class implements IController {
    url: string = "/GetAllSongsByArtistTitle";
    method: HttpMethod = "get";
    
    async execute(req: Request, res: Response) {
        const artist = req.query.artist;
        const title = req.query.title;

        const songs = BetterSqlite.getDB().prepare("SELECT * FROM wadsongs WHERE artist = ? AND title = ?").all(artist, title);

        res.json({
            message: `Songs by artist: ${artist} and title: ${title}`,
            data: songs
        });
    }   
}