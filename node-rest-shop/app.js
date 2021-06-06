const express= require('express');
const app = express();
const morgan = require('morgan');
const bodyParser= require('body-parser');
const mongoose= require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

mongoose.connect("mongodb+srv://Krishna:"
    + process.env.MONGO_ATLAS_PW
    +"@node-rest-shop.buuvm.mongodb.net/node-rest-shop?retryWrites=true&w=majority",{
    
}).then(res => {
    app.listen(300)
})

console.log(process.env.Krishnamongodb)
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((res,req,next)=>{
    res.header('Acess-Control-Allow-Origin','*')
})

app.use((res,req,next)=>{
    res.header("Acess-Control-Allow-Origin","*");
    res.header("Acess-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept,Authorization"
    );
    console.log("header")
    if (req.method === 'OPTIONS'){
        res.header('Acess-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    console.log("requestadfadfasdfasdf")
})

//sending the request to product js 
app.use('/products',productRoutes);
app.use('/orders',orderRoutes);

app.use((req, res, next)=>{
    const error= new Error('Not found');
    error.status(404);
    next(error)
});

app.use((req, res, next)=>{
    res.status(error.status||500);
    res.json({
        error:{
            message:error.message
        }
    })    
});
module.exports =app;