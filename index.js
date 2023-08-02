const express = require('express');
const app = express();
const port = 8000 || process.env.PORT;

// Bosy Parser
app.use(express.json())
app.use(express.urlencoded({extended:true}));

// Requiue mongodb
const db = require('./config/user');

app.get('/', async (req,res)=>{
    res.send("<h1>Yeah ! Server is Run</h1>");
})

const route = require('./routes/route');
app.use('/api', route);

app.listen(port, function(err){
    if(err){
        console.log(err);
        return;
    }
   console.log(`Server is run on :: ${port}`);
})