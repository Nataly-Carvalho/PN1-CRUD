const express = require('express');
//const { MongoClient } = require('mongodb');
const app = express();
const {MongoClient}= require('mongodb-legacy')
const uri = "mongodb+srv://dbUser:dbUser@cluster0.xnmmqjo.mongodb.net/?retryWrites=true&w=majority";
//email educacional que a conta do mongo  foi criada
const client = new MongoClient(uri);
const db = client.db("teste-db");
const collection = db.collection('crud');


 app.listen(3000, function(){
    console.log('o nosso servidor esta rodando na porta 3000')
 }) 

app.get('/',(req, res)=>{
    res.send('index.ejs')
})
app.set('view engine', 'ejs')

app.use(express.urlencoded({extended:true}))

app.post('/show',(req, res)=>{
   db.collection('crud').insertOne(req.body,(err,result)=>{
    if(err) return console.log(err)
    console.log("salvou no banco de dados mongodb")
    res.redirect('/show')
    db.collection('crud').find().toArray((err,results)=>{
        console.log(results)
    })
   })
})
