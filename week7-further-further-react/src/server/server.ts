import express from "express"
import viteExpress from "vite-express"
import path from "path"

const app = express()

viteExpress.config({
    inlineViteConfig: {
        root: path.join(__dirname, "..", "client"),
    }
})

viteExpress.listen(app, 3000, () => {
    console.log("Server is running on http://localhost:3000")
})