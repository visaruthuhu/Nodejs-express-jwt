
const Sequelize = require('sequelize')
const sequelize = require('../sequelize')

const fields = {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    username: Sequelize.STRING(50),
    password: Sequelize.STRING(100)

}
const option = {
   // timestamps: false
}


module.exports = sequelize.define('user', fields, option)