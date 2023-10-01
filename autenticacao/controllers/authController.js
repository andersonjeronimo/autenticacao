const jwt = require('jsonwebtoken');
const blacklistRepository = require('../repository/blacklistRepository');
const userRepository = require('../repository/userRepository');

async function doLogin(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await userRepository.findUser(email, password);
        const token = jwt.sign(
            { userId: user._id, profileId: user.profileId },
            process.env.SECRET,
            { expiresIn: parseInt(process.env.EXPIRES) }
        );
        res.json({ token });
    } catch (error) {
        res.sendStatus(401);
    }
}

async function doLogout(req, res) {
    let token = req.headers['authorization'];
    token = token.replace('Bearer', '').trim();
    try {
        const result = await blacklistRepository.blacklistToken(token);
        res.json({ result });
    } catch (error) {
        res.sendStatus(401);
    }
}

module.exports = { doLogin, doLogout }