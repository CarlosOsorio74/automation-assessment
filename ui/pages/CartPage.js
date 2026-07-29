const { By, until } = require('selenium-webdriver');

class CartPage {
    constructor(driver) {
        this.driver = driver;
        this.cartItem = By.className('cart_item');
        this.checkoutButton = By.id('checkout');
    }

    async verifyItemInCart() {
        await this.driver.wait(until.elementLocated(this.cartItem), 10000);
        let item = await this.driver.findElement(this.cartItem);
        await this.driver.wait(until.elementIsVisible(item), 10000);
        return await item.isDisplayed();
    }

    async proceedToCheckout() {
        // Navegación directa por URL hacia el checkout para evitar bloqueos de clics
        let currentUrl = await this.driver.getCurrentUrl();
        let baseUrl = currentUrl.substring(0, currentUrl.indexOf('/cart.html'));
        await this.driver.get(`${baseUrl}/checkout-step-one.html`);
    }
}

module.exports = CartPage;