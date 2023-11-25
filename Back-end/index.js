require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT | 3001;
const router = require('./routes/route.js')
const fs = require('fs/promises');

app.use(express.static(__dirname + '/asset'))

app.set('views', __dirname+'/views');
app.set('view engine', 'html');

app.engine('html', async (filePath, options, callback) => { 
    let content = await fs.readFile(filePath, { encoding: 'utf-8' });
    const arrSkip=['settings','_locals','cache'];
    for (const key in options) {
        if (options.hasOwnProperty(key) && arrSkip.indexOf(key)==-1) {
            content=content.replace(`{{${key}}}`,options[key]);
        }
    }

    return callback(null, content);
})

app.use(express.static(__dirname + '/views'))
app.use(express.urlencoded({ extended: true }))

app.use('/', router);

const dp = require('./ulliti/db.js')
console.log(dp.getAll('test'))

app.listen(port, () => console.log(`Listening on port ${port}!`))
