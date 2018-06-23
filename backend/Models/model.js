

// Wrapper to contains all the Schema
// inside a model class 
class Model {

    constructor(Schema) {
        // Create all schema
        this._user = require('./user')(Schema);
    }

    get User() {
        return this._user;
    }
}

module.exports = function (Schema) {
    return new Model(Schema);
}