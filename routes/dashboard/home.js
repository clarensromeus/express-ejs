const fs = require("fs")
const queryString = require("querystring")
const router = require("express").Router()

router.get("/dashboard/home", (req, res) => {
        const userdata = []
        fs.readFile("./data/users.txt", "utf-8",function(error, data) {
        if(error) console.log(error)
        if(!data) console.log("sorry there's no data")
        if(data.length < 0) console.log("No users yet registered")
        const users = data.split("\n")
        users.shift()
        
        users.map((user, index) => {
            return userdata.push(queryString.parse(user))
        })
        res.render("dashboard/home", {users: userdata})
    })  

})

router.get("/dashboard/home/edit/:username", (req, res) => {
    const userData = []
    const username = req.params.username
    fs.readFile("./data/users.txt", "utf-8", (error, data) => {
        if(error) console.log("sorry there's an error : ", error)
        if(!data) console.log("sorry there's no data")
        const users = data.split("\n")
        users.shift()
        
        users.map((user, index) => {
            return userData.push(queryString.parse(user))
        })
        
        const singleUser = userData.find((user) => user.username === username)
        res.render("dashboard/edit", { singleUser })
    })
})

router.post("/dashboard/home/edit/form/user", (req, res) => {
    const email = req.body.email;
    if(!email) console.log("sorry, no user registered with that email")
    const userData = []

    fs.readFile("./data/users.txt", "utf-8", (error, data) => {
        if(error) console.log("sorry there's an error : ", error)
        if(!data) console.log("sorry there's no data")
        const users = data.split("\n")
        console.log(users)
        users.shift()
        
        users.map((user, index) => {
            return userData.push(queryString.parse(user))
        })
        
        const singleUser = userData.find((user) => user.email === email)
        if(!singleUser) console.log("sorry user is existed")
        const updateUser = userData.map((user) => user.email == req.body.email ? {...singleUser, username: req.body.username, password: req.body.password} : user)
    
        updateUser.map((user) => {
            const userStringification = queryString.stringify(user)
            fs.writeFile("./data/users.txt", `\n${userStringification}`, function(error){
                if(error) console.log("sorry there's an error", error)
            })
        })
        res.redirect("/dashboard/home")
    })
})

router.post("/dashboard/home/add/user", (req, res) => {
   const user = { 
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }
    // convert the user info into strings
    const userParsing = queryString.stringify(user)
    fs.appendFile("./data/users.txt", `\n${userParsing}`, (error) => {
        if(error) console.log("sorry there's an error : ", error)
        console.log("user registered successfully")
        res.redirect("/dashboard/home")
    })
})

router.get("/dashboard/home/user/delete/:email", (req, res) => {
   const userEmail = req.params.email
   const userData = []
   console.log("user email : ", userEmail)
   fs.readFile("./data/users.txt", "utf-8", (error, data) => {
      if(error) console.log("sorry there's an error : ", error)
        if(!data) console.log("sorry there's no data")
        const users = data.split("\n")
        users.shift()
        
        users.map((user, index) => {
            return userData.push(queryString.parse(user))
        })

        const filteredUser = userData.filter((user) => user.email !== userEmail)
        filteredUser.map((user) => {
            const userStringification = queryString.stringify(user)
            fs.writeFile("./data/users.txt", `\n${userStringification}`, function(error){
                if(error) console.log("sorry there's an error", error)
            }) 
        })
     
   })
   res.redirect("/dashboard/home") 
})

module.exports = router