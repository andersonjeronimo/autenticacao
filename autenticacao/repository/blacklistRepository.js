const database = require('../config/database');

async function blacklistToken(token) {
    const db = await database.connect();
    const result = await db
        .collection('blacklist')
        .insertOne({ _id: token, data: new Date() });
    return result;
}

async function checkTokenBlacklist(token) {
    const db = await database.connect();
    const qtd = await db
        .collection('blacklist')
        .countDocuments({ _id: token });
    return qtd > 0;
}

module.exports = { blacklistToken, checkTokenBlacklist };