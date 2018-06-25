
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

    connect() {
        return new Promise((resolve,reject) => {
            this.mongoose.connect(this.config.mongoCnxString, (err) => {
                if (err) {
                    console.log(`Error connection to MongoDB : ${err}`);
                    reject();
                    return;
                }
                console.log('Creating Schema')
                this.createSchema();
                resolve();
            });
    
        });
    }

    createSchema() {
        const userSchema = require('../models/user')(this.mongoose.Schema);
        this._user = this.mongoose.model('User', userSchema);
    }
}

module.exports = MongoRepository;