import { Request, Response, NextFunction } from "express";
import { HttpMethod } from "../lib/types/HTTPMethod";
import { IController } from "../lib/types/IController";

export default class implements IController {
    url: string = "/";
    method: HttpMethod = "get";
    
    execute(req: Request, res: Response) {
        res.render("index", { title: "Main Page"});
    }   
}