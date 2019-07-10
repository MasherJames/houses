module.exports = {
    "extends": "airbnb-base",
    "parserOptions": {
        "ecmaVersion": 6
    },
    rules: {
        "linebreak-style": 0,
        "indent": ["error", 4],
        'max-len': ["error", { "code": 150 }],
        "prefer-destructuring": ["error", { "object": true, "array": false }]
    },
};