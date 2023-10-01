const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const repository = require('../repository/userRepository');

module.exports = (passport) => {

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await repository.findUserById(id);
        if (!user) {
            done(new Error('Não foi possível localizar o usuário'), null);
        }
        done(null, user);
    });

    passport.use(new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password'
        },
        (username, password, done) => {
            repository.findUser(username, (err, user) => {
                if (err) { return done(err) }
                if (!user) { return done(null, false) }
                bcrypt.compare(password, user.password, (err, isValid) => {
                    if (err) { return done(err) }
                    if (!isValid) { return done(null, false) }
                    return done(null, user);
                })
            })
        }
    ));
}