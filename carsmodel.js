const mongoose = require('mongoose');
require("dotenv").config();
mongoose.connect(process.env.DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const CarsScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  year: {
    type: Number,
    required: true,
    min: 1800,
  },
  selling_price: {
    type: Number,
    required: true,
    min: 100000,
  },
  km_driven: {
    type: Number,
    required: true,
    min: 1,
    
  },
  fuel:{
    type:String,
    required: true,
    
  },
  seller_type:{
    type:String,
    required: true,
    
  },
  transmission:{
    type:String,
    required: true,
    
  },
  owner:{
    type:String,
    required: true,
    
  },
});

const CAR = mongoose.model('carsdatas', CarsScheme);
module.exports= CAR;