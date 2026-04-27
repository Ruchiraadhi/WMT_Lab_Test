const mongoose = require('mongoose'); 

const ItemSchema = new mongoose.Schema({ 
    name: { type: String, required: true }, 
    description: { type: String, required: true }, 
    price: { type: Number, required: true }, 
    serialNo: { type: String, required: true, unique: true }
}, { timestamps: true }); 
    
module.exports = mongoose.model('Item', ItemSchema);

