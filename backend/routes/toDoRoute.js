var express = require('express');
var router = express.Router();
let ToDo= require("../models/ToDoModel");
const list= require("../models/ListModel")
const mongoose = require("mongoose");
const { json } = require('body-parser');
const  toId =mongoose.Types.ObjectId
const verify = require("./verifyToken")


//version 1 -> with promise 
/*
 router.post("/", (req,res)=>{
  const toDo = new ToDo({
    toDo : req.body.toDo
  })
  toDo.save().then((data) => {
    res.status(200).json(data)
  })
  .catch(err => {
    res.json(err)
  })
  ;
  
})*/

//version 2 with async/await
 router.post("/add/:id", async (req,res)=>{
  console.log(req.params.id)
  var myId = JSON.parse(req.params.id);
  const toDo = new ToDo({
    toDo : req.body.toDo,
    listId:  mongoose.Types.ObjectId(myId)
  })
  try{ 
    const savedToDo = await toDo.save();
    res.status(200).json(savedToDo)
  }
  catch(err){
    res.json(err)
  }
})


router.get("/todo-list",verify, async (req,res)=>{
  try{
    const list = await ToDo.find();
    res.json(list);

  }catch(err){
    console.log(err)
  }

})

router.get("/getToDos/:listId", async (req,res)=>{
  try{
    var myId = JSON.parse(req.params.listId);
    const list = await ToDo.find({listId: mongoose.Types.ObjectId(myId)});
    res.json(list);

  }catch(err){
    console.log(err)
  }

})

router.delete("/delete/:id", async (req,res)=>{
  try{
    const removedToDo = await ToDo.remove({_id: req.params.id});
    res.json(removedToDo);

  }catch(err){
    console.log(err)
  }

})

router.patch("/edit/:id", async(req,res)=>{
  try{
    const updateToDo = await ToDo.updateOne( {_id:req.params.id}, {$set: {toDo: req.body.toDo}}) 
    const update2 =await ToDo.findById({_id:req.params.id})
    res.status(200).json(update2)
  }
  catch(err){
  res.json(err)
  }
})

router.patch("/ckeckIfDo/:id", async(req,res)=>{
  try{
    const updateToDo = await ToDo.updateOne( {_id:req.params.id}, {$set: {do: req.body.do}}) 
    const update2 =await ToDo.findById({_id:req.params.id})
    console.log(update2.toDo)
    console.log(update2.do)

    res.status(200).json(update2)
  }
  catch(err){
res.json(err)
  }
})





module.exports = router;