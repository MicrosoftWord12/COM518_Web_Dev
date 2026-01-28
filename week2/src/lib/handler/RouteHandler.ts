import path from "path"
import fs from "fs"
import { IController } from "../types/IController"
import { HttpMethod } from "../types/HTTPMethod"
import { pathToFileURL } from "url"

export default class {

    expressApp: Express.Application
    startingDir: string
    
    constructor(expressApp: Express.Application, startingDir: string) {
        this.expressApp = expressApp
        this.startingDir = startingDir

        this.__getAsyncRoutes()
    }

    async __getAsyncRoutes() {
        const folders = await this.__resolveFoldersRecursive(this.startingDir)

        const routes: IController[] = []
        const specialRoutes: IController[] = []

        for (const entry of folders!) {
            const file = path.resolve(entry)
            // const controllerImported = await import(pathToFileURL(file).href)
            const controllerImported = require(file)
            const controller: IController = new controllerImported.default()

            if(controller.url === "*") {
                specialRoutes.push(controller)
            }else {
                routes.push(controller)
            }
        }

        console.log(routes)
        this.__initialiseRoutes(routes, specialRoutes)
    }

    __initialiseRoutes(routes: IController[], specialRoutes: IController[]) {
        for (const controller of routes) {
            const url: string = controller.url
            const method = controller.method.toLowerCase() as HttpMethod
            
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
                    return
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