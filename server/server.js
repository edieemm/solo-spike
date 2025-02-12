const express = require('express');
// require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const sheltersRouter = require('./routers/shelters.router')
const tagsRouter = require('./routers/tags.router')

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json()); // needed for angular requests
app.use(express.static('build'));

/** ---------- ROUTES ---------- **/
app.use('/shelters', sheltersRouter)
app.use('/tags', tagsRouter)

/** ---------- START SERVER ---------- **/
app.listen(port, function () {
    console.log('Listening on port: ', port);
});