const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const session = require("express-session")
const passport = require("./config/passport")
const app = express()
const port = 5000

const authRoutes = require("./routes/auth")
const adminRoutes = require("./routes/admin")

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true   //=> cette clé est obligatoire pour donner accès au navigateur
                        //=> pour transporter le cookie 
                        //=> toujours dès qu'il y a un système d'authentification comme 'passport'
}))

app.use(morgan('tiny'))

app.use(express.json()) //======> permet de lire le req.body

// on rend accessible/publique le dossier '/public'
app.use(express.static('public'))

// initialisation de la session
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: false
}))

// passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use("/auth", authRoutes)
app.use("/admin", adminRoutes)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})