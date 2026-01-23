import express from "express"
import config from "./constants/constants.json" with { type: "json" }
import { link } from "fs/promises"
const app = express()
const port = config.PORT


app.get("/", (req, res) => {
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sample Page</title>
        <link rel="stylesheet" href="styles.css">
    </head>
    <body>
        <h1>Welcome to the Sample Page</h1>
        <p>This is a simple HTML page served by Express.js</p>
    </body>
    </html>
    `
    res.send(htmlContent)
})





app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
