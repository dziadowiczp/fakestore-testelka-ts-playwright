import { expect, Locator, Page } from '../pages/base-page';
import { Trip } from "../data/trips";
import { ProductPage } from "./product-page"
import { CartPage } from "./cart-page"


export class NavigationPage {
    private CartButton: Locator;
    private SearchField: Locator;
    private StoreNoticeDismiss: Locator;

    constructor(private page: Page) {
        this.CartButton = page.locator('#menu-item-200');
        this.SearchField = page.locator('input#woocommerce-product-search-field-0')
        this.StoreNoticeDismiss = page.locator('.woocommerce-store-notice__dismiss-link')
    }

    async closeStoreNotice(): Promise<void> {
    await this.StoreNoticeDismiss.click();
    await expect(this.StoreNoticeDismiss).toBeHidden();
    }

    async clickCartButton(): Promise<void> {
        await this.CartButton.click();
        const cartPage = new CartPage(this.page)
        await Promise.any([
            cartPage.productsTable.waitFor({ timeout: 10000 }),
            cartPage.emptyCart.waitFor({ timeout: 10000 })
        ]);
    }

    async searchSpecificTrip(tripName: Trip): Promise<void> {
        console.log(`Szukam: ${tripName.name}`)
        await this.SearchField.waitFor({ state: 'visible' });
        await this.SearchField.fill(tripName.name);
        await this.SearchField.press('Enter');
        const productPage = new ProductPage(this.page)
        await this.page.waitForSelector(productPage.formatTripHeader(tripName), { timeout: 10000 });
    }

    async searchAndAddTripsToCart(...tripNames: Trip[]): Promise<void> {
        const productPage = new ProductPage(this.page)
        for (const tripName of tripNames) {
            await this.searchSpecificTrip(tripName);
            await productPage.clickAddToCart();
            await this.page.waitForSelector(productPage.formatTripHeader(tripName), { timeout: 10000 });
        }
        await this.clickCartButton()
    }
}
