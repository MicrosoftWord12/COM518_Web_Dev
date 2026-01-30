import { Request, Response, NextFunction } from "express";
import { HTTP_METHODS } from "../lib/types/HTTPMethod";
import { IController } from "../lib/types/IController";

export default class implements IController {
    url: string = "/";
    method: HTTP_METHODS = HTTP_METHODS.GET;
    
    execute(req: Request, res: Response) {
        res.render("index", { title: "Main Page"});
    }   
}