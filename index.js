const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');   
const app = express();
require('dotenv').config();

const port = process.env.PORT || 5000


//Middle Ware

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2psefg9.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
function run() {
    try {
        
    } 
    finally {
        
    }
}

run()

app.get('/', (req, res) => {
    res.send('Adventure Zone Server Running')
});

app.listen(port, () => {
    console.log(`Adventure Zone Server Running On ${port}`);

})