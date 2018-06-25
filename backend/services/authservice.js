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

                // Compare the password here
                if (user.password != password){
                    done(null, false, {message: 'Incorrect email or password.'});
                    return;
                }
                // Return the list of the role to the client
                // this can be used in guard in Angular
                // The id is passed in the token to validate it again
                done(null, {role:user.role,id: user.id}, {
                    message: 'Logged In Successfully'
                });
            });
        }));

        this.passport.use(new JWTStrategy({
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: this.config.JwtSecretKey
        },(jwtPayload, done) => {
            // To be sure the client didn't altered the JWT
            // we get the info again to see if the user exists and
            // it's role (double validation on server and client side)
            this.mongoRepository.User.findById(jwtPayload.id,(err,user) =>{
                if (err){
                    done(err,false)
                }else if(user){
                    done(null,{role: user.role});
                }else{
                    done(null,false);
                }
            });
        }));
    }
}

module.exports = AuthService;