
const jwt = require('jsonwebtoken');

class AccountRoute {
    constructor(express, mongoRepository, passport, config) {
        this.express = express;
        this.mongoRepository = mongoRepository;
        this.passport = passport;
        this.config = config;
    }

    init() {
        const router = this.express.Router();
        

        router.post('/login',(req,res,next) => {
          
            this.passport.authenticate('local',{session:false},(err,user,info) => {
            
                console.log(err);
                if (err || !user){
                    return res.status(400).json({
                        message: info ? info.message : 'Login failed',
                        user   : user
                    });
                }

                req.login(user,{session:false},(err) => {

                    if (err){
                        res.send(err);
                        return;
                    }
                    // Encrypt the role to not send it plain text
                    const token = jwt.sign({role: user.role, id: user.id}, this.config.JwtSecretKey, {
                        expiresIn: 86400 // 1 day valid token (this can be changed)
                    });

                    res.json({user,token});              

                });
            })(req,res,next);;
         
        });

        router.post('/', (req, res) => {
          
            const email = req.body.email;
            const password = req.body.password;
            const role = req.body.role;

            const user = new this.mongoRepository.User({
                email: email,
                password: password,
                role: role
            });

            user.save((err,result) => {
           
                if (err){
                    res.status(500);
                    res.send('Internal Server error');
                }else{
                    res.status(204);
                    res.send();
                }
            });


        });

        return router;
    }
}

module.exports = AccountRoute;