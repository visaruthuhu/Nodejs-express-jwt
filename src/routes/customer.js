
const router = require('express').Router()
const sequelize = require('../sequelize')
const Customer = sequelize.models['customer']
router.get('/', async (req, res) => {
    try {
        const customers = await Customer.all({
            where :{
                gender:'M'
            }
        })
        res.json(customers)
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }

})
router.get('/:id', async (req, res) => {
    const {id} = req.params
    // const { username } = req.locals
    // console.log(username)
    try {
        const customers = await Customer.findById(id)
        res.json(customers)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

})
router.post('/', (req, res) => {
    const {body} =req 
    console.log(body)
    res.json({ body})
})
module.exports =router