

class Config {
    static get mongoCnxString() {
        const server = process.env.MONGO_DB || 'localhost';
        return `mongodb://${server}/cake`;
    }
}

module.exports = Config;