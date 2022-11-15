const express = require('express');
const cors = require('cors');   
const app = express();
require('dotenv').config();

const port = process.env.PORT || 5000


//Middle Ware

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Adventure Zone Server Running')
});

app.listen(port, () => {
    console.log(`Adventure Zone Server Running On ${port}`);

})