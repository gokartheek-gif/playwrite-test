import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

test.describe('SauceDemo Login Tests', () => {
    let loginPage: LoginPage;
    let productsPage: ProductsPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productsPage = new ProductsPage(page);
    });

    test('should login successfully with valid credentials', async ({ page }) => {
        // Navigate to login page
        await loginPage.goto();
        
        // Login with valid credentials
        await loginPage.login('standard_user', 'secret_sauce');
        
        // Verify we are redirected to products page
        await expect(productsPage.isPageLoaded()).resolves.toBe(true);
        
        // Verify page title
        await expect(productsPage.getPageTitle()).resolves.toBe('Products');
        
        // Verify products are displayed
        const productsCount = await productsPage.getProductsCount();
        expect(productsCount).toBeGreaterThan(0);
    });

    test('should display error message with invalid credentials', async ({ page }) => {
        // Navigate to login page
        await loginPage.goto();
        
        // Login with invalid credentials
        await loginPage.login('invalid_user', 'wrong_password');
        
        // Verify error message is displayed
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.getErrorMessage()).resolves.toContain('Username and password do not match');
    });

    test('should logout successfully', async ({ page }) => {
        // Navigate to login page
        await loginPage.goto();
        
        // Login with valid credentials
        await loginPage.login('standard_user', 'secret_sauce');
        
        // Verify we are on products page
        await expect(productsPage.isPageLoaded()).resolves.toBe(true);
        
        // Logout
        await productsPage.logout();
        
        // Verify we are back on login page
        await expect(loginPage.usernameInput).toBeVisible();
    });
});