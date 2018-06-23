

class AccountRoute {
    constructor(express) {
        this.express = express;
    }

    init() {
        const router = this.express.Router();

        router.post('/register', () => { });

        return router;
    }
}