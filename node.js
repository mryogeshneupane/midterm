// File name: node.js
// Student’s Name: Yogesh neupane
// StudentID: 200570557
// Date: 2023/02/23
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routes = require('./src/route/route.js');
const cors = require('cors');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');


// Parse JSON bodies
app.use(express.json());

app.use(bodyParser.json());

dotenv.config({ path: './config.env' });

const InitiateMongoServer = require('./db.js');
// Initialize Mongodb Connection
InitiateMongoServer();

const data=JSON.parse(fs.readFileSync('./recipes.json', 'utf-8'));


app.use(cors()); // Enable CORS for all routes

const mongoURI=process.env.MONGODB_URL;

mongoose.connect(mongoURI).then(()=>{
    importData();
});

// Importing data to MongoDB if the collection is empty
const importData = async()=>{
    try {

        const Recipe=require('./src/model/model.js');
        //check if the collection is empty

        const count = await Recipe.countDocuments();

        if (count===0){
            await Recipe.create(data);
            console.log('Data Successfully Imported');
        }
        else{
            console.log('Data already exits in the database');
        }
        
    }
    catch (e) {

        console.log(e);
        throw e;

    }
};

app.use('/', routes);

// rendering index.html as main homepage
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/src/view/index.html');
});

const port = 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});