const express = require('express')
const app = express();
const port = 3000;
const path = require('path');
const router = require('./router')

const session = require("express-session");

const{v4:uuidv4}=require("uuid");



const bodyparser = require("body-parser");
// (Basically bodyparser module is responsible for passing the incoming request bodies in the middelware before u use it)

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true
}));

app.use('/route',router);

// initialising engine 
app.set('view engine','ejs');

//load static assests (hame hamare http server ko batana hoga na ki style.css file ko use karna hai toh ye ussi kai liye hai)
app.use('/static',express.static(path.join(__dirname, 'public')));

// for including background image 
app.use('/assets',express.static(path.join(__dirname,'public/assets')));

// home route 
app.get('/', (req,res) =>{
    res.render('base', {titl: "Login System"})
});

app.listen(port , () =>{
    console.log(`Listening on port ${port}`)
})