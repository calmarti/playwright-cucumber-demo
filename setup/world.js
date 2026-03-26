const { setWorldConstructor, World } = require('@cucumber/cucumber');

class CustomWorld extends World {
    constructor({ attach, parameters, log }) {
        super({ attach, parameters, log });
        const env = parameters.env || 'local';
        this.BASE_URL = parameters.BASE_URL || 'https://saucedemo.com/';
        this.context = null;
        this.page = null;
    }
}

setWorldConstructor(CustomWorld);