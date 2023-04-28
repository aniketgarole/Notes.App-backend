const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {

    try {
        const wholeToken = req.headers.authorization
        if (wholeToken) {
            const token = wholeToken.split(" ")[1]
            
            jwt.verify(token, 'avenger', function(err, decoded) {
                if (err) {
                    res.status(200).json({"err": err})
                } else if (decoded) {
                    req.body.author = decoded.author
                    req.body.authorId = decoded.authorId
                    next()
                }
              });
        } else {
            res.status(200).json({"msg": "please login first"})
        }
        
    } catch (error) {
        res.status(400).json({"err": error.message})
    }

}

module.exports = {auth}