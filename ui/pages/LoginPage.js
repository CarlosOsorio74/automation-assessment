const { By, until } = require('selenium-webdriver');

class LoginPage {
    constructor(driver) {
        this.driver = driver;
        this.usernameInput = By.id('user-name');
        this.passwordInput = By.id('password');
        this.loginButton = By.id('login-button');
        this.errorMessage = By.css('h3[data-test="error"]');
    }

    async open(url) {
        await this.driver.get(url);
    }

    async login(username, password) {
        await this.driver.wait(until.elementLocated(this.usernameInput), 5000);
        await this.driver.findElement(this.usernameInput).sendKeys(username);
        await this.driver.findElement(this.passwordInput).sendKeys(password);
        await this.driver.findElement(this.loginButton).click();
    }
}

module.exports = LoginPage;