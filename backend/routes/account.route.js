

class AccountRoute {
    constructor(express, mongoRepository) {
        this.express = express;
    }

    init() {
        const router = this.express.Router();

        router.post('/register', (req, res) => {
            const username = req.body.username;
            const password = req.body.password;

            const user = new this.mongoRepository.User({
                username: username,
                password: password
            });

            user.save();
        });

        return router;
    }
}