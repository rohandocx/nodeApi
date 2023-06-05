const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Product = require('./models/ProductModels')

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello Node API');
})

app.get('/blog', (req, res)=>{
    res.send('Hello Blog');
})

// put data in database
app.post('/products', async(req, res)=>{
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product)
    }
    catch(error){
      console.log(error.message)
      res.status(500).json({message: error.message})
    }

    // console.log(req.body);
    // res.send(req.body);
})

// get products from database

app.get('/products', async(req, res)=>{
   try{
     const products = await Product.find({});
     res.status(200).json(products);

   }catch(error){
      res.status(500).json({message: error.message});
   }
})

// get product by ID

app.get('/products/:id', async(req, res)=>{
     try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
     } catch (error) {
        res.status(500).json({message: error.message});
     }
})

app.put('/products/:id', async(req, res)=>{
   try {
      const {id} = req.params;
      const products = await Product.findByIdAndUpdate(id, req.body);
       if(!products){
       return  res.status(404).json({message:"No prodcut found"})
       }
       const upadtedproducts = await Product.findById(id); // to get realtime updated dataabse response from database
       res.status(200).json(upadtedproducts)
   } catch (error) {
     res.status(500).json({message: error.message});
   }
})

mongoose.set("strictQuery", false);

mongoose.connect('mongodb+srv://user:1234@cluster0.yvtr1nn.mongodb.net/CRUD-API?retryWrites=true&w=majority')
.then(()=>{
    console.log('Connected to database');
    app.listen(3000,()=>{
        console.log('listening on port 3000');
    })
    
}).catch((error)=>{
    console.log(error);
})

