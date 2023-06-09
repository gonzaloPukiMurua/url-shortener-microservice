const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
const urlShortener = require('shortid');
const mongoose = require('mongoose');
const dns = require('dns');
const urlparser = require('url');
const db = require('./db'); //DB connection
const urlModel = require('./database/urlModel');

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended : false }));
app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', (req, res) => {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', async (req, res) => {
  const url = req.body.url; 
  const url_shorted = urlShortener.generate();
  const query = {
    'original_url' : url,
    'short_url' : url_shorted    
  };
  console.log(url);
  console.log(query)
  const dnslookup = dns.lookup(urlparser.parse(url).hostname, async (err, address) => {
    if(!address){
      console.error(err);
      res.json("invalid url");
    }else{
      try{
        let findByURL = await urlModel.findOne({ original_url : url});
        if(findByURL){
          console.log('url find in DB');
          res.json({
            'original_url' : findURL.original_url,
            'short_url' : findURL.short_url
          });
        }else{
          console.log('url not find in db');
          findURL = new urlModel(query)
          await findURL.save();
          res.json({
            original_url : findURL.original_url,
            short_url : findURL.short_url
          });
        }    
      }catch (err){
        console.error(err);
        res.status(500).json('Server error...');
      }
    }
    
    //res.redirect('/');
  });

  });
  

app.get('/api/shorturl/:shorturl', async (req, res) => {
  const shorturl = req.params.shorturl;
  console.log(shorturl);
  const findURL = await urlModel.findOne({short_url : shorturl});
  console.log(findURL.original_url);
  if(findURL){
    console.log('url find');
    res.redirect(findURL.original_url);
  }else{
    console.log('url could not be find');
    res.redirect('/');
  };
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
