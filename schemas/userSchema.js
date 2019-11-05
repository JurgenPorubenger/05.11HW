    const usr = {
    '$schema': 'http://json-schema.org/draft-07/schema#',
    'properties': {
        'firstName': {
            'type': 'string',
            'minLength': 2,
            'maxLength': 20,
        },
        'lastName': {
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
        'dob': {
            "format": "date",
        },
        'phone': {
            'type': ['string', 'number'],
            'minimum': 2,
            'exclusiveMaximum': 30,
        },

    },
};
module.exports = usr;