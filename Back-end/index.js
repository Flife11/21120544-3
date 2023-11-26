require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT | 3001;
const router = require('./routes/route.js')
const {template} = require('./21544.js')
const fs = require('fs/promises');
let cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: true }))

app.set('views', __dirname+'/views');
app.set('view engine', 'html');

app.engine('html', template);

app.use(express.static(__dirname + '/css'))
app.use('/', router);

const dp = require('./ulliti/db.js')
// console.log(dp.getAll('test'))

app.listen(port, () => console.log(`Listening on port ${port}!`))
