import { Request, Response } from "express";
import { IController } from "../../../lib/types/IController";
import { HttpMethod } from "../../../lib/types/HTTPMethod";
import BetterSqlite from "../../../lib/handler/Database";

export default class implements IController {
    url: string = "/ChangeSongDetails";
    method: HttpMethod = "put";

    async execute(req: Request, res: Response) {
        const { id, price, quantity } = req.body

        BetterSqlite.getDB().prepare("UPDATE wadsongs SET price = ?, quantity = ? WHERE id = ?").run(price, quantity, id);

        res.json({
            message: `Song details updated for Id: ${id}`,
        });
    }
}