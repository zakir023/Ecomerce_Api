const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const db = require('./config/mongoose')



// Body Parser
app.use(express.urlencoded({extended:true}));
 app.use(express.json());



app.get('/',(req,res)=>{
    res.end("<h1> Yeah server is run</h1>")
})

const authRoute = require('./routes/auth.js')
const authproduct = require('./routes/product.js');
// Fetch User API API
app.use('/user',authRoute);
app.use('/product',authproduct);

// Passport Jwt
const passportjwt = require('./config/passport-jwt-strtegy.js');

app.listen(port,function(err){
    if(err){
        console.log("Error in connecting to server server",err);
    }
    console.log("Server is run on Port::",port);
})