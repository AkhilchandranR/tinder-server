import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cards from './dbCards.js';

//app config
const app = express();
const port = process.env.PORT || 8001
const connectionUrl = 'mongodb+srv://Akhil:v2Q539QgLL8BeDbJ@cluster0.cacuz.mongodb.net/tinder-db?retryWrites=true&w=majority'

//middlewares
app.use(express.json());
app.use(cors());

//db config
mongoose.connect(connectionUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error',(error)=>console.log(error));
db.on('open',()=>console.log('connected to database'));


//api endpoints
app.get('/',(req,res) =>{
    res.status(200).send("hello clever")
})
app.post('/tinder/cards',(req,res)=>{
    const Cards = req.body;
    cards.create(Cards, (err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})
app.get('/tinder/cards',(req,res)=>{
    cards.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
})

//listener
app.listen(port, ()=>console.log(`listening on localhost ${port}`))