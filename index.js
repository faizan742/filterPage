const express = require('express');
const CarModel=require('./carsmodel');
require("dotenv").config();
const app = express();
const port = process.env.PORT || '8001';
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(port, (err) => {
    if (err) {
      return console.log('ERROR: ' + err);
    }
    console.log('Listening on Port ' + port);
  });
  
function getFilteredData(filters) {
    let query = {}; 
  
    
    if (filters.name) {
      query.name = { "$regex": filters.name, "$options": "i" };
    }
    
    if (filters.year) {
        query.year = filters.year;
      }
    
      if (filters.Price ) {
        console.log(filters.Price);
      query.selling_price = {
        $gte: parseInt(filters.Price)
      };
    }
    
    if(filters.transmission){
        query.transmission=filters.transmission;
    }
  
    return query 
    
  }


app.get('/simplefiller',async (req, res) => {
    const year = req.query.year;
    console.log(year);
    CarModel.find({year:year}).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.json(204);     
    });
   
  });

app.get('/advancesfiller',  async (req, res) => {
    query = getFilteredData(req.query);
    var filteredData = await CarModel.find(query);
    if(Object.keys(filteredData).length==0){
        res.send(404);
    }else
    {
      car1={
        'TOTAL DATA':4340,
        'GOT RECORD':Object.keys(filteredData).length,
    };
      filteredData=[car1,...filteredData];
      res.send(filteredData);
    }

  });  



  app.get('/ALLFILTER', async (req, res) => {
    car=await CarModel.find({
      $or: [
        { name: { $regex: req.query.name, $options: 'i' } }, // 'i' for case-insensitive search
        { owner: { $regex: req.query.name, $options: 'i' } },
      ],
    })
    if(Object.keys(car).length==0){
        res.send(404);
    }else
    {
      
      car1={
        'TOTAL DATA':4340,
        'GOT RECORD':Object.keys(car).length,
    };
      car=[car1,...car];
        res.json(car);    
    }


  });  


  app.get('/Pagenation', async (req, res) => {
    let limit= parseInt(req.query.limit) || 10;
    let page=parseInt(req.query.pageno) || 1;
    let skip=(page-1)*limit;
    car=await CarModel.find({}).skip(skip).limit(limit);
    
    if(Object.keys(car).length==0){
        res.send(402);
    }else
    {
      car1={
        'TOTAL DATA':4340,
        'GOT RECORD':Object.keys(car).length,
        'Page No':page,
        'TOTAL PAGES':Math.round(4340/limit)
    };
      car=[car1,...car];
        res.json(car);    
    }
  });