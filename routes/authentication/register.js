const router = require("express").Router()

router.get("/register", (req, res) => {
    res.render("authentication/register", { title: "register" })
})

router.post("/login/form", (req, res) => {
    const userInfo = req.body
    const userData = []
    fs.readFile("./data/users.txt", "utf-8", (error, data) => {
        if(error) console.log("there's an error : ", error)
        if(!data) console.log("sorry there's no data")
        if(data.length < 0) console.log("No users yet registered")
        const users = data.split("\n")
        users.shift()
    
        users.map((user) => {
        return userData.push(queryString.parse(user))
        }) 
    const singleUser = userData.find((user) => user.email === userInfo.email && user.password === userInfo.password )
    console.log("singleUser : ", singleUser)
    if(!singleUser) {
        console.log("sorry, email or password is wrong")
        res.redirect("/login")
    } else {
        res.redirect("/dashboard/home")
    }
})
})

module.exports = router