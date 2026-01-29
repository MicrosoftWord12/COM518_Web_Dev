import { Request, Response } from "express";
import { IController } from "../../../lib/types/IController";
import { HttpMethod } from "../../../lib/types/HTTPMethod";
import BetterSqlite from "../../../lib/handler/Database";

export default class implements IController {
    url: string = "/RemoveSong";
    method: HttpMethod = "delete";

    async execute(req: Request, res: Response) {
        const { id } = req.query

        BetterSqlite.getDB().prepare("DELETE FROM wadsongs WHERE id = ?").run(id);

        res.json({
            message: `Song With ID:${id} has been removed`,
        });
    }
}