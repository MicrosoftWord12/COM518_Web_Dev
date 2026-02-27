import express from "express"
import viteExpress from "vite-express"
import path from "path"
import RouteHandler from "./lib/handler/RouteHandler"

const app = express()
const port = 5050

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

new RouteHandler(app, "./routes")

viteExpress.config({
    inlineViteConfig: {
        root: path.join(__dirname, "..", "client")
    }
})

viteExpress.listen(app, port, () => {
    console.log(`Server is running on port ${port}`)
})
