const verifyUser = (req, res, next) => {
    // je vérifie si l'user est connecté
    if (!req.user) { 
        res.status(401).send("Unauthorized")
    } else {
        next()
    }
}

module.exports = {
    verifyUser
}