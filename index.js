require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const db = require('./db'); //DB connection
const urlModel = require('./database/urlModel');
//Schema and Model creation
const urlSchema = new mongoose.Schema({
  originalURL : String,
  shortURL : String
});

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

app.post('/api/shorturl', (req, res) => {
  const {url} = req.body;  
  console.log(url);
  const findByURL = (url, done) => {
    urlModel.findOne({originalURL: url }, (err, urlStored) => {
      if(err){
        return console.log(err);
        }else{
          done(null, urlStored);
          }
        }
      );
  };
  if(findByURL){
    console.log('url find in DB');
  }else{
    console.log('url not find in db');
  }
  res.redirect('/');
});

app.get('/api/:shorturl', (req, res) => {
  const {originalURL} = req.params;
  const query = {
    "original_url":"https://www.youtube.com/watch?v=ciDw3-Lp1kI",
    "short_url":15368
  };
  res.json(query);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
