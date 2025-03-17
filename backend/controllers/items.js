// This file contains all the methods that are called when a GET/POST/DELETE/PATCH methods are called by user 

const models = require('../models/items')
const Item = models.Item
const completedItems = models.completedItems

const getAllItems = async (req, res) => {
    try {
        const allItems = await Item.find({})  // this method obtains all the Items (since it is Item.find) stored in the database
        res.status(200).json({allItems})   // For objects, {allItems: allItems} is the same as {allItems}. That is, if they have the same name for key and value, you can leave it as just one name.
    }
    catch(error){
        res.status(500).json({msg:error})
    }
 
}

// this function will be asynchronous because creating an item and saving it could take large amounts of time. 
const createItem = async (req, res) => {
    try {
        // All the information from the user must be sent in the request body

        const item = await Item.create(req.body)  // create method automatically triggers save(). The create method returns a promise. The request contains information about the item we want to save.
        res.status(201).json({item})

    }
    catch (error){
        res.status(500).json({msg: error})  // error 500 is just a general error code

    }
    
}

const getItem = async (req, res) => {
    try{
        const {id: ItemID} = req.params
        const item = await Item.findOne({_id: ItemID})  // Here we use "_id" instead of just "id" since the id we are looking for is the id created by the database. Not our objects own id
        if (!item){   
            return res.status(404).json({msg: `No item with id: ${ItemID}`})  // this condition is if we can't find the task. That is, the structure of the id must still be same (e.g. length of id), but could have wrong characters.
        }
        res.status(200).json({item})
    }
    catch(error){
        res.status(500).json({msg: error})
    }
}

const updateItem = async (req, res) => {
    try{
        const {id: ItemID} = req.params
        const item = await Item.findOneAndUpdate({_id: ItemID}, req.body, {
            new: true,
            runValidators: true 
        })
        // the third argument passed into the findOneAndUpdate function is the 'options' parameter. In the options, we have set new to true. This means, 
        // the 'item' variable will now be the updated data not the old data. The runValidators option has also been set to true. This is so that when we
        // update the "name" etc, we still make sure it has max length of 20 characters or not empty etc
        if(!item){
            return res.status(404).json({msg: `No task with id: ${ItemID}`})
        }
        res.status(200).json({item})
    }
    catch(error){
        res.status(500).json({msg: error})
    }
   
}

const deleteItem = async (req, res) => {
    try{

        const {id: ItemID} = req.params
        const item = await Item.findOneAndDelete({_id: ItemID})   // if the task exists, it will return something 
        if(!item){
            return res.status(404).json({msg: `No item with id : ${ItemID}`})
        }
        res.status(200).json({item})
    }
    catch(error){
        res.status(500).json({msg:error})
    }


}

const getCompleted = async (req, res) => {
    try{
        allcompleted = await completedItems.find({}) // this method obtains all the completedItems (since it is completedItems.find) stored in the database
        res.status(200).json({allcompleted})   // For objects, {allcompleted: allcompleted} is the same as {allcompleted}. That is, if they have the same name for key and value, you can leave it as just one name.
    }
    catch (error){
        res.status(500).json({msg:error})
    }
}

const deleteCompleted = async (req, res) => {
    try{

        const {id: completedID} = req.params
        const completedSet = await completedItems.findOneAndDelete({_id: completedID})
        if (!completedSet){
            return res.status(404).json({msg: `No completed item set with id: ${completedID}`})
        }
        res.status(200).json({completedSet})
    }
    catch (error) {
        res.status(500).json({msg:error})
    }
}

const createCompletedSet = async (req, res) => {
    try{
        const completedSet = await completedItems.create(req.body)
        res.status(201).json({completedSet})

    }
    catch (error){
        res.status(500).json({msg: error})
    }

}


module.exports = {
    getAllItems,
    createItem, 
    getItem,
    updateItem, 
    deleteItem,
    getCompleted,
    deleteCompleted,
    createCompletedSet
}
