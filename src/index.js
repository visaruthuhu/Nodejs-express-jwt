
const express = require('express') 
const app =express()
const auth = require('./middleware/auth') 
const cors = require('./middleware/cors') 
const preflight = require('./middleware/preflight') 

app.use(cors)
app.use(preflight)
app.get('/',(req,res)=>{
    res.json({})
})

/**
 * sequelize
 */
const sequelize = require('./sequelize')
/**
 * models
 */
const User =  require('./models/user')
require('./models/customer')
//User.sync({force:true})
//app.use(express.urlencoded({ extended: true }))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
/**
 * routes
 */
app.use('/customers',auth, require('./routes/customer'))
app.use('/users', require('./routes/user'))
app.use((req, res) => {
    res
        .status(404)
        .json({
        text:'404 Page Not Found'
    })
})
app.listen(3001)