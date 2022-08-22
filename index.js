const cookieParser = require('cookie-parser');
const express = require('express');
const path= require('path'); 
const app = express();
const port = 8000;


const expressLayouts=require('express-ejs-layouts');
app.use(expressLayouts);

app.use(express.urlencoded()); // for reading through POST Requests

app.use(cookieParser());

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



app.use(express.static('./assets'));



app.use('/',require('./routes/index'));

app.set('view engine','ejs'); // Telling express that view engine is going to be ejs

app.set('views','./views');


app.listen(port, () => {
  console.log(`Application running on Port: ${port}`)
});