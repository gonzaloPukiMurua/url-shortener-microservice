require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

//DB connection
const mongoDBURL = 'mongodb+srv://puki:Zeppeli89@db.6phbdyt.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoDBURL);
const db = mongoose.connection;
db.on('error', (err) => {
  console.log('connection error', err)
});
db.once('open', () => {
  console.log('Connection to DB successful!');
});

//Schema and Model creation
const urlSchema = new mongoose.Schema({
  originalURL : String,
  shortURL : String
});

const urlModel = new mongoose.model('urlShort', urlSchema);

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

const findByURL = (url, done) => {
  EmailModel.findOne({email: urlToShort }, (err, urlStored) => {
    if(err){
      return console.log(err);
      }else{
        done(null, urlStored);
        }
      }
    );
};

app.post('/api/shorturl', (req, res) => {
  const {url} = req.body;
  console.log(url);

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
