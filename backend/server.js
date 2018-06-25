const express = require('express');
const bodyParser = require('body-parser');
const Config = require('./shared/config');
const MongoRepository = require('./services/mongoRepository');
const passport = require('passport');
const app = express();

// Routes
const AccountRoute = new require('./routes/account.route')

const port = process.env.PORT || 3000;

// Configure middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

// Create instance services/repository
const mongoRepository = new MongoRepository(Config);

mongoRepository.connect().then(() => {
    
    // // Import the route
    const accountRoute = new AccountRoute(express,mongoRepository);
    app.use('/api/account',accountRoute.init());

    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });

}).catch(() => {
    console.log('Program failed to initialize execution stopped');
});
    




