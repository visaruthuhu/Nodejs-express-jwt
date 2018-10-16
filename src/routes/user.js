
const router = require('express').Router()
const sequelize = require('../sequelize')
var fs = require('fs');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = sequelize.models['user']
var fs = require('fs');
var publicKey = "key" //fs.readFileSync('./key.rsa.pub', 'utf8');
var privateKey = "key" // fs.readFileSync('./key.rsa', 'utf8');
router.get('/', async (req, res) => {
    try {
        const users = await User.all()
        res.json(users)
    } catch (message) {
        res.status(500).json({
            message
        })
    }

})
router.post('/', async (req, res) => { 
    try {
        const { username,password } = req.body
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const users = await User.create({
            username,
            password: hash
        })
        res.json(users)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})
router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const customers = await Customer.findById(id)
        res.json(customers)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

})
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findById(id)
        if(!user){

        }
        await User.delete(id)
        res.json(user)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { body } = req
    try {
        const user = await User.findById(id)
        if (!user) {

        }
        await User.update(id)
        res.json(user)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({
            where :{
                username 
            }
        })
        //console.log(user['password'])
        if (!user){
                res.status(401).end()
                return
        }
        if(!bcrypt.compareSync(password,user['password'])){
           
            res.status(401).end()
            return
        }
        const payload ={
            username: user['username']
        }
        console.log("privateKey=>" + privateKey)
        const token = jwt.sign(payload, privateKey, {
            algorithm: 'RS256',
            issuer: 'urn:issuer'
        })
        
        res.json({token:token})
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})
module.exports = router