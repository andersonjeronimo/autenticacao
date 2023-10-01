const userRepository = require('../repository/userRepository');

async function postUser(req, res) {
    let { email, password, profileId } = req.body;
    try {
        const result = await userRepository.insertUser(email, password, profileId);
        res.json({ result });
    } catch (error) {
        res.sendStatus(422);
    }
}

async function getUsers(req, res) {    
    try {
        const result = await userRepository.getUsers();
        res.json(result);
    } catch (error) {
        res.sendStatus(401);
    }
}

async function getUserById(req, res) {
    const id = req.body.id;
    try {
        const user = await userRepository.getUserById(id);
        res.json(user);
    } catch (error) {
        res.sendStatus(401);
    }
}

module.exports = { postUser, getUsers, getUserById }