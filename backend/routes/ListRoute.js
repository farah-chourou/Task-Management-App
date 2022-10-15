const express = require('express')
const router = express.Router()
const list= require("../models/ListModel")
const listService = require("../services/listService")





router.post("/addList", async  (req,res)=>{
    const name = req.body.name
    const description = req.body.description
    console.log(name+' ',description)
    const listWithName = await listService.findListByName(name)
    if (listWithName) {
        return res.status(409).send({message: 'name is already taken.'})
    }
  
    const newList = new list({
        name: req.body.name,
        description: req.body.description
    })
    try {
        const savedList = await   newList.save()
        res.status(200).json(savedList)
    } catch (error) {
        res.json(error)

    }

}
    
)

router.get("/getAllList", async (req,res)=> {
    try {
    const all = await list.find()
    res.status(200).json(all)
    } catch (error) {
        res.json(error)
}
})

module.exports = router;
