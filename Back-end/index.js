require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT | 3001;
const router = require('./routes/route.js')
const fs = require('fs/promises');

app.set('views', __dirname+'/views');
app.set('view engine', 'html');



app.use(express.static(__dirname + '/views'))
app.use(express.urlencoded({ extended: true }))

app.use('/', router);

const dp = require('./ulliti/db.js')
// console.log(dp.getAll('test'))

app.listen(port, () => console.log(`Listening on port ${port}!`))
