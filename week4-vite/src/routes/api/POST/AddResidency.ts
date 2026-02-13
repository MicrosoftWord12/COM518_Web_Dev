import { Request, Response } from "express";
import { IController } from "../../../lib/types/IController";
import { HTTP_METHODS } from "../../../lib/types/HTTPMethod";
import { daoHandler } from "../../../data/base/DaoHandler";


export default class implements IController {
    url: string = "/AddResidency";
    method: HTTP_METHODS = HTTP_METHODS.POST;

    async execute(req: Request, res: Response) {
        const { lat, lon, artist, hometown } = req.body

        if (!lat || !lon || !artist || !hometown) { 
            res.status(400).json({
                message: "Missing required fields: lat, lon, artist, hometown"
            })
        }

        if (typeof lat !== "number" || typeof lon !== "number" || typeof artist !== "string" || typeof hometown !== "string") {
            res.status(400).json({
                message: "Invalid data types for fields: lat and lon should be numbers, artist and hometown should be strings"
            })
        }

        daoHandler.getDao("artists")!.runSql("INSERT INTO artists (name, lat, lon, hometown) VALUES (@name, @lat, @lon, @hometown)", { name: artist, lat, lon, hometown })

        res.status(200).json({
            message: `Artist with name:${artist} has been added, INFO: lat: ${lat}, lon: ${lon}, hometown: ${hometown}`,
        })
    }
}