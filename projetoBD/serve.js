const express = require('express');
//const { MongoClient } = require('mongodb');
const app = express();


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://dbUser:aluno@cluster0.zirndln.mongodb.net/?retryWrites=true&w=majority";


MongoClient.connect(uri,(err, client)=>{
    if(err) return console.log(err)
    db = client.db('teste-bd')

    app.listen(3000, ()=>{
        console.log("Servidor rodando tranquilo")
    })
})

// app.listen(3000, function(){
//     console.log('o nosso servidor esta rodando na porta 3000')
// }) 

app.get('/',(req, res)=>{
    res.render('index.ejs')
})
app.set('view engine', 'ejs')

app.use(express.urlencoded({extended:true}))

app.post('/show',(req, res)=>{
   db.conection('crud').insertOne(req.body,(err,result)=>{
    if(err) return console.log(err)
    console.log("salvou no banco de dados mongodb")
    res.redirect('/show')
    db.collection('crud').find().toArray((err,result)=>{
        console.log(result)
    })
   })
})