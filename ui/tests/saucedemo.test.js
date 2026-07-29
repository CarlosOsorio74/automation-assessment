const { expect } = require('chai');
require('dotenv').config();
const DriverFactory = require('../utils/driver-factory');
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');

describe('Pruebas E2E de UI - SauceDemo Flow', function () {
    let driver;
    let loginPage;
    let productsPage;
    let cartPage;
    let checkoutPage;
    const UI_URL = process.env.UI_BASE_URL || 'https://www.saucedemo.com';

    beforeEach(async function () {
        driver = await DriverFactory.createDriver();
        loginPage = new LoginPage(driver);
        productsPage = new ProductsPage(driver);
        cartPage = new CartPage(driver);
        checkoutPage = new CheckoutPage(driver);
    });

    afterEach(async function () {
        await driver.quit();
    });

    it('Debería iniciar sesión, agregar un producto al carrito y completar la compra con éxito', async function () {
        // 1. Login
        await loginPage.open(UI_URL);
        await loginPage.login('standard_user', 'secret_sauce');
        
        const title = await productsPage.getTitleText();
        expect(title).to.equal('Products');

        // 2. Agregar al carrito
        await productsPage.addProductToCart();
        await productsPage.goToCart();

        const isItemPresent = await cartPage.verifyItemInCart();
        expect(isItemPresent).to.be.true;

        // 3. Checkout
        await cartPage.proceedToCheckout();
        await checkoutPage.fillCheckoutInformation('Carlos', 'Osorio', '1101');
        await checkoutPage.finishCheckout();

        const successMsg = await checkoutPage.getSuccessMessage();
        expect(successMsg).to.include('Thank you for your order');
    });
});