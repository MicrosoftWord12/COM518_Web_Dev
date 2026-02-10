import express from "express"
import path from "path"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname, "public")))
app.use("/leaflet", express.static(path.join(__dirname, "node_modules/leaflet/dist")))

app.listen(5050, ()=> {
    console.log("Started Server")
})