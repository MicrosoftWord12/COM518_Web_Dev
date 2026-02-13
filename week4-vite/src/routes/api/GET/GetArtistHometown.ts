import { Request, Response } from "express";
import { HTTP_METHODS } from "../../../lib/types/HTTPMethod";
import { IController } from "../../../lib/types/IController";
import { daoHandler } from "../../../data/base/DaoHandler";

export default class implements IController {
    url: string = "/GetArtistHometown/:artistName";
    method: HTTP_METHODS = HTTP_METHODS.GET;
    
    async execute(req: Request, res: Response) {
        const artistName = req.params.artistName;
        const artistDao = daoHandler.getDao("artists")?.createSql("SELECT name, lat, lon, hometown FROM artists WHERE name = ?", artistName)

        if (!artistDao || artistDao.length === 0) {
            res.status(404).json({
                message: `Artist ${artistName} not found`
            });
            return;
        }

        res.json({
            message: `Artist ${artistName} hometown`,
            data: artistDao[0]
        });
    }   
}