const registerValidation = {
    '$schema': 'http://json-schema.org/draft-07/schema#',
    'properties': {
        'firstName': {
            'type': 'string',
            'minLength': 2,
            'maxLength': 20,
        },
        'email': {
            'format':'email'
        },
        'pwd': {
            'type': ['string', 'number'],
        },
    },
};

const loginValidation = {
    '$schema': 'http://json-schema.org/draft-07/schema#',
    'properties': {
        'email': {
            'format':'email'
        },
        'pwd': {
            'type': ['string', 'number'],
        },
    },
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;