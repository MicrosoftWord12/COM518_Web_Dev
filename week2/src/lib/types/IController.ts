import { HttpMethod } from "./HTTPMethod";
import type { Request, Response, NextFunction } from "express";

export interface IController {
    url: string, 
    method: HttpMethod,
    execute: (req: Request, res: Response) => void,
    validate?: (req: Request, res: Response, next: NextFunction) => void
}