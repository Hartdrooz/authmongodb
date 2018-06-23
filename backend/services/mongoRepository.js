
// The mongo repository class ack like the unit of work
// pattern here (kind of)
class MongoRepository {

    get User() {
        return this._user;
    }

    constructor(Config) {
        this.mongoose = require('mongoose');
        this.config = Config;
        this._user = null;
    }

    async connect() {
        await this.mongoose.connect(this.config.mongoCnxString);
        this.createSchema();
    }

    createSchema() {
        const userSchema = require('../models/user')(this.mongoose.Schema);
        this._user = this.mongoose.model('User', userSchema);
    }
}

module.exports = MongoRepository;