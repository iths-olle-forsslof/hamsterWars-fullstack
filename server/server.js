const express = require('express');
const fileUpload = require('express-fileupload')
require('dotenv').config()
const app = express();
const path = require('path')

const serverPort = process.env.PORT || 3002

app.use(fileUpload())
app.use(express.json());
app.use(express.static(__dirname + '/../build'));

const hamstersRoute = require('./routes/hamsters');
app.use('/api/hamsters', hamstersRoute);

const gamesRoute = require('./routes/games');
app.use('/api/games', gamesRoute);

const chartsRoute = require('./routes/charts');
app.use('/api/charts', chartsRoute);

const statsRoute = require('./routes/stats');
app.use('/api/stats', statsRoute);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../build/index.html'))
})


app.listen(serverPort, () => {
    console.log(`Server is listening on port ${serverPort}`);
})