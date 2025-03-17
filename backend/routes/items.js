// This file is used to handle all the different URLs. It calls the appropriate functions which are loccated in the controller folder for specific URL and methods

const express = require('express');
const router = express.Router();
const {getAllItems,createItem, getItem, updateItem, deleteItem, getCompleted, deleteCompleted, createCompletedSet} = require('../controllers/items')

// app.get('/api/v1/items')                     - get all the items 
// app.post('/api/v1/items')                    - create a new item 
// app.get('/api/v1/items/:id')                 - get single item 
// app.patch('/api/v1/items/:id')               - update item 
// app.delete('/api/v1/items/:id')              - delete item  
// app.get('/api/v1/items/completed')           - get all completed items 
// app.post('/api/v1/items/completed')          - create new set of completed items 
// app.delete('/api/v1/items/completed/:id')    - delete a set of completed items 



router.route('/').get(getAllItems).post(createItem)  // we are chaining the get and post. The router will either choose function of getAllItems or createItem depending on the method of the request. 
// If the method of the request is POST then it will choose createItem, if the method is GET then it will choose getAllItems. 

// Note: the order of the routes is important. We need to put '/completed' before the '/:id'. This is because, suppose we use the URL /api/v1/items/completed, then express will first check if it is an endpoint before it checks if it is a parameter.
// If the order was the other way around, then express will think that '/completed' is a parameter and through an error saying the id of 'completed' cannot be found in the database. 
router.route('/completed').get(getCompleted).post(createCompletedSet)

router.route('/:id').get(getItem).patch(updateItem).delete(deleteItem)// we are chaining the get and post. The router will either choose function of getItem, updateItem, or deleteItem depending on the method of the request. 
// If the method of the request is GET then it will choose getItem, if the method is PATCH then it will choose updateItem and if the method is DELETE then it will choose deleteItem. 



router.route('/completed/:id').delete(deleteCompleted)
module.exports = router