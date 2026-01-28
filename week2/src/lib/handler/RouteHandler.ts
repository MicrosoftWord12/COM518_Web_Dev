import path from "path"
import fs, { stat } from "fs"
import { IController } from "../types/IController"

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

        for (const entry in folders) {
            const file = path.resolve(entry)

            const controllerImported = await import("file://" + file)
            const controller: IController = new controllerImported.default()
        }
    }

    async __resolveFoldersRecursive(currentPath: string) {
        const routes: string[] = []
        try {
            const folders = fs.readdirSync(currentPath)

            for (const folder of folders) {
                const entryPath = path.join(currentPath, folder)

                fs.stat(entryPath, async (error, stat) => {
                    if(stat.isDirectory()) {
                        const subFolder = await this.__resolveFoldersRecursive(entryPath)
                        routes.push(...subFolder)
                        return
                    }

                    routes.push(entryPath)
                })
            }

            return routes
        }catch (e) {
            console.log(e)
        }

        return routes
    }
}