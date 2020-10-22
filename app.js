const { request } = require('express');
const express = require('express');
const mongoose = require('mongoose')

const app = express();

// middle ware in express 

app.use(express.json());

//another middleware

app.use(express.urlencoded({extended:true}));


// Database connection 

//mongodb+srv://lan:<password>@cluster0.63qzk.mongodb.net/<dbname>?retryWrites=true&w=majority
// lan
//DjESeDJUazmAAdWY

//const mongoose = require('mongoose')

const url = 'mongodb://127.0.0.1:27017/test'

mongoose.connect(url, { useNewUrlParser: true })

const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', url)
})

db.on('error', err => {
  console.error('connection error:', err)
})








/*
 mongoose.connect('mongodb+srv://cluster0.63qzk.mongodb.net/',{
     dbName: 'testdata',
     user: 'lan',
     pass: 'DjESeDJUazmAAdWY',
     useNewUrlParser: true,
     useUnifiedTopology: true */

 
 
  

//test 

app.all('/test',(req,res) => {

// console.log(req.params);
// res.send(req.params);


    /* console.log(req.query);
     console.log(req.query.name);
     res.send(req.query);*/

console.log(req.body);
res.send(req.body);


});





const ProduceRoute = require('./routes/product.route');

app.use('/products', ProduceRoute);


// middleware

app.use((req,res,next)=>{
   const err = new Error("Not found");
   err.status = 404;
   next(err);
});

//express error handler

app.use((err,req,res,next)=>{
res.status(err.status || 500)
res.send({
    error: {
        status: err.status || 500,
        message: err.message
    }
});
});


app.listen(3000, ()=>{
    console.log('Server started on port 3000');
});