const mongoose = require('mongoose');

const mongoDBURL = 'mongodb+srv://puki:Zeppeli89@db.6phbdyt.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoDBURL);
const db = mongoose.connection;
db.on('error', (err) => {
  console.log('connection error', err)
});
db.once('open', () => {
  console.log('Connection to DB successful!');
});

module.exports = db;