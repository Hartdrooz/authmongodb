const express = require('express');
const bodyParser = require('body-parser');
const Config = require('./shared/config');
const MongoRepository = require('./services/mongoRepository');
const passport = require('passport');
const cors = require('cors');
const AuthService = require('./services/authservice');
const app = express();

// Routes
const AccountRoute = require('./routes/account.route')
const HomeRoute = require('./routes/home.route');

const port = process.env.PORT || 3000;

// Configure middleware
app.use(cors()); // Allow all (for demo purpose)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

// Create instance services/repository
const mongoRepository = new MongoRepository(Config);

// Create services and configure them
const authservice = new AuthService(Config,passport,mongoRepository);
authservice.init();

mongoRepository.connect().then(() => {
    
    // // Import the route
    const accountRoute = new AccountRoute(express,mongoRepository,passport,Config);
    const homeRoute = new HomeRoute(express);

    app.use('/api/account',accountRoute.init());
    app.use('/api/home',passport.authenticate('jwt',{session:false}),homeRoute.init());

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        res.status(404);
        res.send('Not Found');
    });
    
    // error handler
    app.use(function(err, req, res, next) {
        
        console.log(`Internal Server Error : ${err}`);

        // render the error page
        res.status(err.status || 500);
        res.send('Internal Server Error');
    
    });

    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });

}).catch(() => {
    console.log('Program failed to initialize execution stopped');
});
    




