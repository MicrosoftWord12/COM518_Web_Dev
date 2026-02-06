import express from "express"
import path from "path"
import RouteHandler from "./lib/handler/RouteHandler"

const app = express()
const port = 5050

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, "public")))

new RouteHandler(app, "./src/routes")

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
