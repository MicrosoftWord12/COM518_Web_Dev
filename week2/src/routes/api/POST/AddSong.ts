import { Request, Response } from "express";
import { IController } from "../../../lib/types/IController";
import { HTTP_METHODS } from "../../../lib/types/HTTPMethod";
import { daoHandler } from "../../../data/base/DaoHandler";


export default class implements IController {
    url: string = "/AddSong";
    method: HTTP_METHODS = HTTP_METHODS.POST;

    async execute(req: Request, res: Response) {
        const { title, artist, year, price, quantity } = req.body

        if (!title || !artist || !year || !price || !quantity) { 
            res.status(400).json({
                message: "Missing required fields: title, artist, year, price, quantity"
            })
        }

        if (typeof title !== "string" || typeof artist !== "string" || typeof year !== "number" || typeof price !== "number" || typeof quantity !== "number") {
            res.status(400).json({
                message: "Invalid data types for fields: title and artist should be strings, year, price, and quantity should be numbers"
            })
        }

        daoHandler.getDao("wadsongs")!.runSql("INSERT INTO wadsongs (title, artist, year, downloads, price, quantity) VALUES (@title, @artist, @year, @downloads, @price, @quantity)", { title, artist, year, downloads: 0, price, quantity })

        res.status(200).json({
            message: `Song with title:${title} has been added, INFO: artist: ${artist}, year: ${year}, price: ${price}, quantity: ${quantity}`,
        })
    }
}