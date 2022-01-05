const express = require("express")
const app = express()
const fs = require("fs")

const { verifyUser } = require("../middlewares/auth")

// je veux proteger cette route
// seulement un user connecté peut avoir accès aux données
app.get('/', verifyUser, (req, res) => {
    fs.readFile('./users.json', (err, data) => {
        if (err) {
          console.log(err)
        } else {
          const users = JSON.parse(data)
          res.json(users)
        }
    })
})

module.exports = app