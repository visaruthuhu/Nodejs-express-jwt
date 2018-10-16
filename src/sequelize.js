const Sequelize = require('sequelize');
//const uri = 'mysql://root:password@127.0.0.1/tutor4dev'
const uri = 'mysql://root@127.0.0.1/tutor4dev'
const options = {
    operatorsAliases: false
}
const sequelize = new Sequelize(uri, options)
// sequelize.authenticate().then(() => {
//     console.log('OK');
// })
module.exports = sequelize