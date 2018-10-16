const preflight=(req,res,next)=>{
    if (req.method!=='OPTIONS'){
        next()
        return 
    }
    if (req.method ==='OPTIONS'){
        res.set({
            'Access-Control-Allow-Headers': 'Content-Type,Authorization',
            'Access-Control-Allow-Methods': 'PUT,DELETE'
        
        }).status(200).end()
    }
}
module.exports = preflight