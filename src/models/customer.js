
const Sequelize = require('sequelize')
const sequelize = require('../sequelize')

const fields ={
    id:{
        autoIncrement:true,
        primaryKey:true,
        type: Sequelize.INTEGER
    },
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
}

const option = {
        timestamps:false
}

module.exports = sequelize.define('customer', fields, option)