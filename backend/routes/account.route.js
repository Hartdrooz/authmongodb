

class AccountRoute {
    constructor(express, mongoRepository) {
        this.express = express;
        this.mongoRepository = mongoRepository;
    }

    init() {
        const router = this.express.Router();
        
        router.post('/', (req, res) => {
            console.log('inside register route');
            const email = req.body.email;
            const password = req.body.password;

            const user = new this.mongoRepository.User({
                email: email,
                password: password
            });

            user.save((err,result) => {
           
                if (err){
                    res.status(500);
                    res.send('Internal Server error');
                }else{
                    res.status(204);
                }
            });


        });

        return router;
    }
}

module.exports = AccountRoute;