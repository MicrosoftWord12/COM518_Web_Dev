import { Request, Response } from "express";
import { IController } from "../../../lib/types/IController";
import { HTTP_METHODS } from "../../../lib/types/HTTPMethod";
// import BetterSqlite from "../../../lib/handler/Database";

export default class implements IController {
    url: string = "/ChangeSongDetails";
    method: HTTP_METHODS = HTTP_METHODS.PUT;

    async execute(req: Request, res: Response) {
        const { id, price, quantity } = req.body

        // BetterSqlite.getDB().prepare("UPDATE wadsongs SET price = ?, quantity = ? WHERE id = ?").run(price, quantity, id);

        res.json({
            message: `Song details updated for Id: ${id}`,
        });
    }
}