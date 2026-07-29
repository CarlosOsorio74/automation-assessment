const { By, until } = require('selenium-webdriver');

class ProductsPage {
    constructor(driver) {
        this.driver = driver;
        this.title = By.css('.title');
        this.addToCartButton = By.id('add-to-cart-sauce-labs-backpack');
        this.removeButton = By.id('remove-sauce-labs-backpack');
    }

    async getTitleText() {
        await this.driver.wait(until.elementLocated(this.title), 10000);
        return await this.driver.findElement(this.title).getText();
    }

    async addProductToCart() {
        await this.driver.wait(until.elementLocated(this.addToCartButton), 10000);
        let addBtn = await this.driver.findElement(this.addToCartButton);
        await this.driver.wait(until.elementIsVisible(addBtn), 10000);
        await addBtn.click();

        // Esperamos de forma inteligente a que el botón cambie a "Remove", confirmando que el producto se añadió
        await this.driver.wait(until.elementLocated(this.removeButton), 10000);
    }

    async goToCart() {
        let currentUrl = await this.driver.getCurrentUrl();
        let baseUrl = currentUrl.substring(0, currentUrl.indexOf('/inventory.html'));
        await this.driver.get(`${baseUrl}/cart.html`);
    }
}

module.exports = ProductsPage;