const mongoose = require("mongoose");
const toDosSchema =  new mongoose.Schema({

    toDo: {
     type: String, 
     max:1000,
     required:true
    },

   date:{
    type:Date,
    default:Date.now
   },
   
   do: {type: Boolean,
       default: false
   },
    
   listId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'listId'
   }

})


module.exports=mongoose.model("toDos",toDosSchema)
