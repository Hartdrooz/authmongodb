const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy   = passportJWT.Strategy;

class AuthService {

    constructor(config,passport,mongoRepository) {
        this.config = config;
        this.passport = passport;
        this.mongoRepository = mongoRepository;
    }

    init() {
        this.passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },(email, password, done) => {
            this.mongoRepository.User.findOne({email,password},(err,user) => {
                if (err){
                    done(null,false,{message: 'Cannot connect right now'});
                    return;
                }
                if (!user) {
                    done(null, false, {message: 'Incorrect email or password.'});
                    return;
                }

                // Compare the password
                console.log(user);

                done(null, user, {
                    message: 'Logged In Successfully'
                });
            });
        }));

        this.passport.use(new JWTStrategy({
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: this.config.JwtSecretKey
        },(jwtPayload, cb) => {

            console.log(jwtPayload);

            // Add any validation here
            cb();
        }));
    }
}

module.exports = AuthService;