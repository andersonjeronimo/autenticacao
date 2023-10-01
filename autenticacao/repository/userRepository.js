const database = require('../config/database');
const bcrypt = require('bcryptjs');
const { ObjectId } = require('mongodb');

async function insertUser(email, password, profileId) {
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
}

async function getUserById(id) {
    const db = await database.connect();
    const user = await db
        .collection('users')
        .findOne({ _id: new ObjectId(id) });
    if (!user) {
        throw new Error('Não foi possível localizar o usuário');
    }
    return user;
}

async function findUser(email, password) {
    const db = await database.connect();
    const user = await db
        .collection('users')
        .findOne({ email: email });
    if (!user) {
        throw new Error('User not found');
    }
    const isValid = bcrypt.compareSync(password, user.password);
    if (isValid) {
        return user;
    } else {
        throw new Error('Email or / and password is invalid');
    }
}

module.exports = { findUser, insertUser, getUsers, getUserById };