const express = require("express")
const app = express()
const multer = require("multer")
const fs = require("fs")
const moment = require('moment');

const upload = multer({ dest: 'public/uploads/' })

app.post('/:id', upload.single('photo'), (req, res) => {
    const id = req.params.id
    const photoUrl = `${req.file.destination}/${req.file.originalname}`
    
    fs.renameSync(req.file.path, photoUrl) //=> on renomme le fichier créé

    fs.readFile('./users.json', (err, data) => {
        const users = JSON.parse(data)
        const index = users.findIndex(user => user.id == id)
        console.log(id)
        users[index].profile_picture = `http://localhost:5000/${moment().format('DD-MM-YYYY-hh-mm-ss')}-${req.file.originalname}`
    
        fs.writeFile('./users.json', JSON.stringify(users), (err) => {
            res.json({ success: "File uploaded" })
        })
    })
})

module.exports = app