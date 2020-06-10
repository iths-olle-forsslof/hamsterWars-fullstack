const express = require('express');
require('dotenv').config()
const app = express();

const serverPort = process.env.PORT || 3002

app.use(express.json());
app.use(express.static(__dirname + '/../build'));

// app.use(express.static('public'));

const hamstersRoute = require('./routes/hamsters');
app.use('/api/hamsters', hamstersRoute);

const gamesRoute = require('./routes/games');
app.use('/api/games', gamesRoute);

const chartsRoute = require('./routes/charts');
app.use('/api/charts', chartsRoute);

const statsRoute = require('./routes/stats');
app.use('/api/stats', statsRoute);


app.listen(serverPort, () => {
    console.log(`Server is listening on port ${serverPort}`);
})