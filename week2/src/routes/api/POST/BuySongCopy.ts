import { Request, Response } from "express";
import { IController } from "../../../lib/types/IController";
import { HTTP_METHODS } from "../../../lib/types/HTTPMethod";
import { daoHandler } from "../../../data/base/DaoHandler";


export default class implements IController {
    url: string = "/BuySongCopy/:id";
    method: HTTP_METHODS = HTTP_METHODS.POST;

    async execute(req: Request, res: Response) {
        const { id } = req.params
        
        const sqlQueries = [
            "INSERT INTO orders(song_id, order_count) values (@song_id, @order_count)",
            "UPDATE wadsongs SET quantity = quantity - @order_count WHERE id = @id"
        ]    

        daoHandler.getDao("wadsongs")!.createSqlMany(sqlQueries, {song_id: id, order_count: 1, id})

        res.status(200).json({
            message: `Song with ID:${id} has been purchased, quantity: ${1}`,
        })
    }
}