const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Prduct= require('../models/product');

//getting request from app.js allowing to route
router.get('/',(req, res,next)=>{
    res.status(200).json({
        message:'Handling Get requests to/ products'
    })
});

router.post('/',(req, res,next)=>{
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price:req.body.price
    });
    product.save().then(result =>{
        console.log(result);
    })
    .catch(err => console.log(err));
    res.status(201).json({
        message:'Handling Post requests to/ products',
        createProduct:product
    })
});

router.get('/:productId',(req, res, next)=>{
    const  id = req.params.productId;
    if (id  === 'special'){
        res.status(200).json({
            message:'u discovered special id',
            id:id
        });
    }else{
        res.status(200).json({
            message:'You passed an ID'
        });
    }
})

router.patch('/:productId',(req, res, next)=>{
    res.status(200).json({
        message:'updated product '
    });
})

router.delete('/:productId',(req, res, next)=>{
    res.status(200).json({
        message:'Deleted product '
    });
})

module.exports = router;