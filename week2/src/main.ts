import express, { json } from "express"
import path from "path"
import Database from "./lib/Database"
import RouteHandler from "./lib/handler/RouteHandler"

const app = express()
const port = 5050

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

// app.get("/", (req, res) => {
//     res.render("index", { title: "Main Page"})
// })

// app.get("/getInfo", (req, res) => {
//     res.json({title: "name", test: "wasd"})
// })

// app.post("/post", (req, res) => {
//     let body = req.body
//     let statusCode = res.statusCode

//     body["CODE"] = statusCode

//     res.json(body)
// }) 

new RouteHandler(app, "./src/routes")

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
