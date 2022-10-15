const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
   name:{
    type: String,
    required: true
   },
   description:{
    type:String,
    default:""
   },
   icon: { 
    data: Buffer, 
    contentType: String
   }

})
listSchema.methods.addCollection = function() {

   console.log(`hi my name is ${this.name}`)
}


listSchema.statics.findByName = function( name) {
   return this.where({name: name}) //Un constructeur new RegExp est utilisé pour étudier les correspondances d'un texte avec un motif donné.
}





listSchema.methods.addNewList = function( name, description) {
   const l = new listSchema({
      name:name,
      description: description
   })
   l.save();
}
module.exports=mongoose.model("list",listSchema)
