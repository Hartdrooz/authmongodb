

module.exports = function (Schema) {

    var userSchema = new Schema({
        username: String,
        password: String
    });

    return userSchema;
};