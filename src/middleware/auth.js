
const jwt = require('jsonwebtoken')
var fs = require('fs');
var publicKey =  "key"//fs.readFileSync('./key.rsa.pub', 'utf8');
var privateKey = "key"//fs.readFileSync('./key.rsa', 'utf8');
const auth =(req,res,next) =>{
    try {
    const authHeader = req.headers['authorization']
    if (!authHeader){
        res.status(401).end()
        return 
    } 
    const token = authHeader.replace(/bearer /i,'')
    
    if(!token){
        res.status(401).end()
        return 
    }
    try {
        //console.log(jwt.verify)
        console.log("publicKey=>"+publicKey)
        const payload = jwt.verify(token, publicKey)
        /*res.status(403).end()
        console.log(payload);
        const {username} = payload
        res.locals.username =  username*/
        next()
        
    } catch (message) {
        res.status(403).end(message)

    }
} catch ({message}) {
    res.status(500).json({message})
}
   
}

module.exports = auth