const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const indexRouter = require('./routes/index');


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:270/library',{useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to MongoDB'));

app.use('/', indexRouter);




const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}.....`);
});