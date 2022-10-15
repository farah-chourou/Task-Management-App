   const listModel =require("../models/ListModel")
   
   
   async function findListByName  (name) {
    try {
        return listModel.findOne({name: name})
    } catch (error) {
        throw new Error(`Unable to connect to the database.`)
    }
 }
 
module.exports = {findListByName}