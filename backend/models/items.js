// This file is used to set up the general structure for the collections we are saving in the database.

const mongoose = require('mongoose')


// schema is used to set a structure for all our database items. In MongoDB the items can have any type (integer, string etc). Schema helps enforce a structure
const itemScehma = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "must provide a name"],  // indicates that this attribute is necessary for the database to save information
        trim: true,  // removes extra whitespace 
        maxlength: [20, "name cannot be more than 20 characters"],
        minlength: [0, "name cannot be empty"]

    }
    , 
    description: String, 
    completed: {
        type: Boolean,
        default: false  // when we create an item is is orginally not completed. Thus, it is defaulted to false
    },
    user: {
        type: String,
        required: [true, "must provide a name"],  // indicates that this attribute is necessary for the database to save information
        trim: true,  // removes extra whitespace 
        maxlength: [20, "name cannot be more than 20 characters"],
        minlength: [0, "name cannot be empty"]
    }

    })


const completedItemsSchema = new mongoose.Schema({
    items: [{
            name:{
                type: String,
                required: [true, "must provide item name"]
            }
            }],

    date: {
        type: String,
        required: [true, "must provide date of purchase"]
    },
    price: {
        type: String
    },
    user:{
        type: String, 
        required: [true , "must provide user"]
     }

})

module.exports = {
    // we are exporting the model or structure for our database to be used in other files.
    Item: mongoose.model('Item', itemScehma), 
    completedItems: mongoose.model('completedItems', completedItemsSchema)
} 
