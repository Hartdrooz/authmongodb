
// Except when developping local host
// always use the ENV variable
class Config {
    static get mongoCnxString() {
        const server = process.env.MONGO_DB || 'localhost';
        return `mongodb://${server}/cake`;
    }
    static get JwtSecretKey(){
        return process.env.JWTSECRET || 'mySecret';
    }
}

module.exports = Config;