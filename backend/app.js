const express = require('express');
const app = express();
const items = require('./routes/items')
const connectDB = require('./connect.js')
const cors = require('cors')
require('dotenv').config()  // this is used to obtain the hidden texts used in the dotenv file 

const port = 3000;

// This code is used to connect to the database. The MONGO URI is obtained from the dot env file
const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}`));
    } catch (error) {
        console.log(error)
    }

}

start()

app.use(cors())  // allows any source to request for data. CORS is a security system that blocks requests from places unless it is allowed by server
app.use(express.json())  // this is another middleware that makes sure that we get JSON data in the request body. It allows our server to parse incoming requests with JSON payloads. 

app.use('/api/v1/items', items)  // All URLs with starting address of /api/v1/tasks will use the items router as middleware. 



// app.get('/api/v1/items')         - get all the items 
// app.get('/api/v1/items')         - create a new item 
// app.get('/api/v1/items/:id')     - get single item 
// app.patch('/api/v1/items/:id')   - update item 
// app.delete('/api/v1/items/:id')  - delete item  

