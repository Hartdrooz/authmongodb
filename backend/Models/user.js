

module.exports = function (Schema) {

    var userSchema = new Schema({
        email: String,
        password: String
    });

    return userSchema;
};