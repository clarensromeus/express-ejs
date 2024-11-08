const express = require("express")
const path = require("path")
const { PORT, MESSAGE } = require("./config/index")
const bodyParser = require("body-parser")
const session = require("express-session")

const app = express()
const router = express.Router()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// initialize session
app.use(session({
  secret: 'user message',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.use(router)
// server static file to interconnect styles with web contents
app.use("/styles", express.static("styles"))
// folder-based template files
app.set("views", "views")
// used view engine
app.set("view engine", "ejs")

router.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "front/index.html"))
})

// middleware used for login routes
app.use("", require("./routes/authentication/register"))
// middleware used for Register routes
app.use("", require("./routes/authentication/login"))
// middleware used for home routes
app.use("", require("./routes/dashboard/home"))


app.listen(PORT, (error) => {
    if(error) console.log(`there's an error with the server ${error}`)
    console.log(MESSAGE)
})