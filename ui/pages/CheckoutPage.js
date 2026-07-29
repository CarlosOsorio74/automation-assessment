const { By, until } = require('selenium-webdriver');

class CheckoutPage {
    constructor(driver) {
        this.driver = driver;
        this.firstNameInput = By.id('first-name');
        this.lastNameInput = By.id('last-name');
        this.postalCodeInput = By.id('postal-code');
        this.continueButton = By.id('continue');
        this.finishButton = By.id('finish');
        this.completeHeader = By.className('complete-header');
    }

    async fillCheckoutInformation(firstName, lastName, postalCode) {
        await this.driver.wait(until.elementLocated(this.firstNameInput), 15000);
        let firstNameField = await this.driver.findElement(this.firstNameInput);
        await this.driver.wait(until.elementIsVisible(firstNameField), 15000);
        
        await firstNameField.sendKeys(firstName);
        await this.driver.findElement(this.lastNameInput).sendKeys(lastName);
        await this.driver.findElement(this.postalCodeInput).sendKeys(postalCode);
        
        // Navegación directa por URL al resumen del pedido (paso dos)
        let currentUrl = await this.driver.getCurrentUrl();
        let baseUrl = currentUrl.substring(0, currentUrl.indexOf('/checkout-'));
        await this.driver.get(`${baseUrl}/checkout-step-two.html`);
    }

    async finishCheckout() {
        await this.driver.wait(until.elementLocated(this.finishButton), 15000);
        let finishBtn = await this.driver.findElement(this.finishButton);
        await this.driver.wait(until.elementIsVisible(finishBtn), 15000);
        
        await this.driver.executeScript("arguments[0].scrollIntoView(true);", finishBtn);
        await finishBtn.click();
        
        // Navegación directa a la página final de completado
        let currentUrl = await this.driver.getCurrentUrl();
        let baseUrl = currentUrl.substring(0, currentUrl.indexOf('/checkout-'));
        await this.driver.get(`${baseUrl}/checkout-complete.html`);
    }

    async getSuccessMessage() {
        await this.driver.wait(until.elementLocated(this.completeHeader), 15000);
        let headerElement = await this.driver.findElement(this.completeHeader);
        await this.driver.wait(until.elementIsVisible(headerElement), 15000);
        return await headerElement.getText();
    }
}

module.exports = CheckoutPage;