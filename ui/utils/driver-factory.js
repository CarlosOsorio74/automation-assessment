const { Builder } = require('selenium-webdriver');
require('dotenv').config();

class DriverFactory {
    static async createDriver() {
        let driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().window().maximize();
        return driver;
    }
}

module.exports = DriverFactory;