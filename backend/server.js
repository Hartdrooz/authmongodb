const express = require('express');
const bodyParser = require('body-parser');
const Config = require('./shared/config');
const MongoRepository = require('./services/mongoRepository');
const app = express();

const port = process.env.PORT || 3000;

// Configure server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Create instance services/repository
const mongoRepository = new MongoRepository(Config);

// Connect to the db
mongoRepository.connect();


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});