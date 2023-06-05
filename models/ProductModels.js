const mongoose = require('mongoose');

const productschema = mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please enter a product name"],
    },
     quantity:{
         type: Number,
         required: 0,
         default :0,
     },

     price:{
        type: Number,
        required: true,
     },
     Image:{
        type: String,
        required: true,
     },
},

{
    timestamps: true,
}
)

const Product  = new mongoose.model('Product',productschema);

module.exports = Product;




