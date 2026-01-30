import { Request, Response } from "express";
import { IController } from "../../../lib/types/IController";
import { HTTP_METHODS } from "../../../lib/types/HTTPMethod";


export default class implements IController {
    url: string = "/BuySongCopy";
    method: HTTP_METHODS = HTTP_METHODS.POST;

    async execute(req: Request, res: Response) {
        const { id, quantity } = req.body

        // This works
        // BetterSqlite.getDB().prepare("DELETE FROM wadsongs WHERE id = ?").run(id);
        // BetterSqlite.getDB().prepare("INSERT INTO orders(song_id, order_count) values (?,?)").run(id, 1);
        // BetterSqlite.getDB().prepare("UPDATE wadsongs SET quantity = quantity - 1 WHERE id = ?").run(id);
        
        // Potentially Better
        // const sqlQueries = [
        //     "INSERT INTO orders(song_id, order_count) values (@song_id, @order_count)",
        //     "UPDATE wadsongs SET quantity = quantity - @order_count WHERE id = @id"
        // ]

        // const transaction = BetterSqlite.getDB().transaction((data: any) => {
        //     for (const query of sqlQueries) {
        //         BetterSqlite.getDB().prepare(query).run(data);
        //     }
        // })

        // transaction({song_id: id, order_count: quantity, id});        
        res.json({
            // message: `Song with ID:${id} has been purchased, quantity: ${quantity}`,
        });
    }
}