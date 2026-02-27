import path from "path"
import fs from "fs"
import { IController } from "../types/IController"
import { HTTP_METHODS } from "../types/HTTPMethod"

export default class {

    expressApp: Express.Application
    startingDir: string
    urlCache: { [key: string]: boolean }
    
    constructor(expressApp: Express.Application, startingDir: string) {
        this.expressApp = expressApp
        this.startingDir = startingDir
        this.urlCache = {}

        this.__getAsyncRoutes()
    }

    async __getAsyncRoutes() {
        const folders = await this.__resolveFoldersRecursive(this.startingDir)

        const routes: IController[] = []
        const specialRoutes: IController[] = []

        for (const entry of folders!) {
            const file = path.resolve(entry)
            const controllerImported = require(file)
            const controller: IController = new controllerImported.default()

            if(controller.url === "*") {
                specialRoutes.push(controller)
            }else {
                routes.push(controller)
            }
        }

        this.__initialiseRoutes(routes, specialRoutes)
    }

    __initialiseRoutes(routes: IController[], specialRoutes: IController[]) {
        for (const controller of routes) {
            this.__activateRoute(controller)
        }

        for (const specialController of specialRoutes) {
            this.__activateRoute(specialController)
        }
    }

    async __activateRoute(controller: IController) {
        const url: string = controller.url
        const method = controller.method.toLowerCase() as HTTP_METHODS

        if(this.urlCache[url]) {
            throw new Error(`Duplicate route detected: ${url}`)
        }
        this.urlCache[url] = true
        
        if (controller.validate){
            (this.expressApp as any)[method](url, controller.validate, controller.execute);
        }else {
            (this.expressApp as any)[method](url, controller.execute);
        }

        console.log("-----------------------------------")
        console.log(`URL: ${url}`)
        console.log(`Method: ${method.toString().toUpperCase()}`)
        console.log("-----------------------------------")
    }

    async __resolveFoldersRecursive(currentPath: string) {
        const routes: string[] = []
        try {
            const folders = fs.readdirSync(currentPath)

            for (const folder of folders) {
                const entryPath = path.join(currentPath, folder)
                const fileStat = fs.statSync(entryPath)

                if(fileStat.isDirectory()) {
                    const subFolder = await this.__resolveFoldersRecursive(entryPath)
                    routes.push(...subFolder!)
                } else {
                    routes.push(entryPath)
                }
            }

            return routes
        }catch (e) {
            console.log(e)
        }
    }
}