const database = require('../config/database');
//const bcrypt = require('bcryptjs');
const { ObjectId } = require('mongodb');


async function findUser(username) {
    const db = await database.connect();
    const user = await db
        .collection('users')
        .findOne({ 'username': username });
    if (!user) {
        throw new Error('User not found');
    }
    return user;
    //const isValid = bcrypt.compareSync(password, user.password);
    //if (isValid) {
    //    return user;
    //} else {
    //    throw new Error('Email or / and password is invalid');
    //}
}
//https://www.npmjs.com/package/connect-mongodb-session

async function findUserById(id) {
    const db = await database.connect();
    const user = await db
        .collection('users')
        .findOne({ '_id': new ObjectId(id) });
    if (!user) {
        throw new Error('Não foi possível localizar o usuário');
    }
    return user;
}

/*async function insertUser(email, password, profileId) {
    let encryptedPasswd = bcrypt.hashSync(password);
    const db = await database.connect();
    const result = await db
        .collection('users')
        .insertOne({
            email: email,
            password: encryptedPasswd,
            profileId: profileId
        });
    if (!result) {
        throw new Error('Não foi possível inserir novo usuário');
    }
    return result;
}

async function getUsers() {
    const db = await database.connect();
    const result = await db
        .collection('users')
        .find({}).toArray();
    if (!result) {
        throw new Error('Não foi possível listar os usuários');
    }
    return result;
}*/

module.exports = { findUser, findUserById };