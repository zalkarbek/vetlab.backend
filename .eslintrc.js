module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "import/no-extraneous-dependencies": 0,
        "import/no-dynamic-require": 0,
        "class-methods-use-this": 0,
        "no-trailing-spaces": 0,
        "no-underscore-dangle": 0,
        "no-shadow": 0,
        "camelcase": 0,
        "no-undef": 0,
        "no-tabs": 0,
        "no-console": 0,
        "global-require": 0,
        "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};
