const express = require("express")
const { PORT, MESSAGE } = require("./config/index")
const { fork } = require("child_process")

const app = express()
const router = express.Router()

// create some routes
app.use(router)

router.get("/", (req, res) => {
    res.status(200).json({name: "clarens romeus", proffession: "s. engineer"})
})

router.get("/:name/:proffession", (req, res) => {
    const { name, proffession } = req.params
    res.status(200).json({name, proffession})

})

router.get("/sync", (req, res) => {
    const short = longComputation(3_000_000_000_000_000_000)
    res.status(200).json({type: "sync", short})
})

router.get("/async", async (req, res) => {
  const forkprocess = fork("./computation.js")
  forkprocess.send("start")
  forkprocess.on("message", (data) => {
    res.status(200).json({type: "async", result: data})
  })
  forkprocess.on("exit", function(code, signal) {
    console.log(`process exits with the code of ${code}`)
    console.log(`process exits with signal ${signal}`) 
  })
  forkprocess.on("spawn", () => console.log(`new spawn-up process id is ${forkprocess.pid}`))
})

app.listen(PORT, (error) => {
    if(error) console.log(`there's an error with the server ${error}`)
    console.log(MESSAGE)
})

const longComputation = (data) => {
    let result = 0
    for(let i = 0; i <= data ; i++ ) {
       result += i
    }
    return result;
}


