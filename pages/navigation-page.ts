import { expect, Locator, Page } from "@playwright/test";
import { Trip } from "../data/trips";
import { ProductPage } from "./product-page"
import { CartPage } from "./cart-page"

export class NavigationPage {
    CartButton: Locator;
    SearchField: Locator;
    SubmitSearch: Locator;
    StoreNoticeDismiss: Locator;
    TripHeader: string;
    TripAddedToCartAlert: string;



    constructor(private page: Page) {
        this.CartButton = page.locator('#menu-item-200');
        this.SearchField = page.locator('input#woocommerce-product-search-field-0')
        this.StoreNoticeDismiss = page.locator('.woocommerce-store-notice__dismiss-link')
        this.SubmitSearch = page.locator('form.woocommerce-product-search button[type="submit"]')
        this.TripHeader = '//h1[text() = "{tripName}"]'
        this.TripAddedToCartAlert = '//div[contains(text(), "„{tripName}“ został dodany do koszyka.")]'
    }

    async closeStoreNotice(): Promise<void> {
        this.StoreNoticeDismiss.click();
        expect(this.StoreNoticeDismiss).toBeHidden()
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
        const tripHeaderSelector = this.TripHeader.replace('{tripName}', this.formatTripName(tripName.name))
        await this.page.waitForSelector(tripHeaderSelector, { timeout: 10000 });
    }

    async searchAndAddTripsToCart(...tripNames: Trip[]): Promise<void> {
        const productPage = new ProductPage(this.page)
        for (const tripName of tripNames) {
            await this.searchSpecificTrip(tripName);
            await productPage.clickAddToCart();
            const alertMessageSelector = this.TripAddedToCartAlert.replace('{tripName}', this.formatTripName(tripName.name))
            await this.page.waitForSelector(alertMessageSelector, { timeout: 10000 })
        }
        await this.clickCartButton()
    }

    private formatTripName(name: string): string {
        return name.replace('-', '–');
    }
}
