import { Page, Locator } from '@playwright/test';

export class ProductsPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly productsContainer: Locator;
    readonly menuButton: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.locator('.title');
        this.productsContainer = page.locator('.inventory_list');
        this.menuButton = page.locator('.bm-burger-button');
        this.logoutButton = page.locator('[data-test="logout-sidebar-link"]');
    }

    async isPageLoaded() {
        await this.pageTitle.waitFor({ state: 'visible' });
        return await this.pageTitle.isVisible();
    }

    async getProductsCount() {
        const products = this.productsContainer.locator('.inventory_item');
        return await products.count();
    }

    async openMenu() {
        await this.menuButton.click();
        await this.logoutButton.waitFor({ state: 'visible' });
    }

    async logout() {
        await this.openMenu();
        await this.logoutButton.click();
    }

    async getPageTitle() {
        return await this.pageTitle.textContent();
    }
}