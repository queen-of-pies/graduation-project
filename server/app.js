const express = require("express")
const mongoose = require("mongoose")
const config = require("config")
const chalk = require("chalk")
const routes = require("./routes")
const cors = require("cors")
const path = require("path");

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use("/api", routes)

const PORT = config.get("port") ?? 8181

if (process.env.NODE_ENV === "production") {
    app.use("/", express.static(path.join(__dirname,"client")))
    const indexPath = path.join(__dirname,"client", "index.html")
    app.get("*", (req, res) => {
        res.sendFile(indexPath)
    })
} else {
    app.use("/", express.static(path.join(__dirname,"../client/build")))
    const indexPath = path.join(__dirname,"../client/build", "index.html")
    app.get("*", (req, res) => {
        res.sendFile(indexPath)
    })
}

async function start() {
    try {
        mongoose.set('strictQuery', true);
        const options = {
            dbName: "graduation-project"
        }
        await mongoose.connect(config.get("mongoUri"), options)
        console.log(chalk.green(`MongoDB connected`))

        app.listen(PORT, () => console.log(chalk.green(`Server has been started on port ${PORT}`)))
    } catch (err) {
        console.log(chalk.red(err.message))
        process.exit(1)
    }
}

start()

