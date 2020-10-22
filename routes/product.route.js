const express = require('express')

const router = express.Router()


// import product model from model.js file here 

const Product = require('../models/product.model');


// This get method is for getting response 

router.get('/', async                                    (req,res,next)=>{

    try {

        const results = await Product.find()
        res.send(results)
        
    } catch (error) {
        console.log(error.message);

        
    }

    
});

// the creation of products 

router.post('/',async (req,res,next)=>{

try {

const product = new Product(req.body);
const result = await product.save()
res.send(result)
    
} catch (error) {
    console.log(error.message);
    
}



// const product = new Product({
//     name: req.body.name,
//     price: req.body.price
// })
/*product.save()
.then(result=>{
    console.log(result);
    res.send(result);


})

.catch(err =>{
    console.log(err.message);
});*/

});




    



router.get('/:id', (req,res,next)=>{

   res.send('Getting a single product');


});


router.patch('/:id', (req,res,next)=>{
res.send('updating a single product');
});


router.delete('/:id', (req,res,next)=>{
    res.send('deleting a single product');
});


module.exports = router;


