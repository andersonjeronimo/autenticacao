const Joi = require('joi');

const userSchema = Joi.object({
    username: Joi.string()
        .min(8)
        .required(),
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: {
                allow: ['com', 'br', 'net']
            }
        })
        .required(),
    password: Joi.string()
        .min(6)
        .pattern(/^(?=.*[0-9]+.*)\w+$/i)
        .required(),
    profileId: Joi.number()
        .integer()
        .min(1)
        .required()
});

module.exports = userSchema;