const passport = require('passport');
const LocalStrategy = require('passport-local');

class AuthService {

    constructor() {

    }

    init() {
        passport.use(new LocalStrategy((username, password, done) => {
            User.findOne()
        }));
    }
}

module.exports = AuthService;