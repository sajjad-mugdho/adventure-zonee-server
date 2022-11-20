const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        const serviceCollection = client.db('adventure-zone-assignment').collection('tour-services')
        const reviewCollection = client.db('adventure-zone-assignment').collection('reviews')
        

        // Service Api
        app.get('/services', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query).limit(3);
            const services = await cursor.toArray();
            res.send(services);
        });
        app.get('/services-page', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });

        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await serviceCollection.findOne(query)
            res.send(service)
        })
        // Add Services Api
            app.post('/service-add', async(req, res) =>{
                const addService = req.body;
                const result = await serviceCollection.insertOne(addService);
                res.send(result)
            })

        // Review Api
        app.get('/reviews', async(req, res) =>{
            let query = {};
            
            if (req.query.email) {
                query = {
                    email: req.query.email
                }
            }
            const cursor = reviewCollection.find(query);
            const reviews = await cursor.toArray();
            res.send(reviews)
        })
        app.post('/reviews', async(req, res) =>{
            const addReview = req.body;
            const result = await reviewCollection.insertOne(addReview);
            res.send(result);
        })

        app.patch('/reviews/:id', async(req, res)=>{
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const updatedDoc = {
                $set:{
                    status: status
                }
            }
            const result = await reviewCollection.updateOne(query, updatedDoc);
            res.send(result)
        })

        app.delete('/reviews/:id' , async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await reviewCollection.deleteOne(query);
            res.send(result)
        })
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