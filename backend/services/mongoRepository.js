
class MongoRepository {
    constructor(Config) {
        this.mongoose = require('mongoose');
        this.config = Config;
    }

    async connect() {
        await this.mongoose.connect(this.config.mongoCnxString);
    }
}

module.exports = MongoRepository;