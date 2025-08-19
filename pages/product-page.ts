import { Locator, Page } from '../pages/base-page';
import { Trip } from "../data/trips";

export class ProductPage {
    private addToCartButton: Locator;
    private quantityBox: Locator;
    private TripHeader: string;
    private TripAddedToCartAlert: string;

    constructor(private page: Page) {
        this.addToCartButton = page.locator('.single_add_to_cart_button')
        this.quantityBox = page.locator('[id^="quantity"]')
        this.TripHeader = '//h1[text() = "{tripName}"]'
        this.TripAddedToCartAlert = '//div[contains(text(), "„{tripName}“ został dodany do koszyka.")]'
    }

    async changeNumberOfItems(numOfItems: number): Promise<void> {
        await this.quantityBox.fill(String(numOfItems))
    }

    async clickAddToCart(): Promise<void> {
        await this.addToCartButton.click()
    }

    formatTripAddedToCartSelector(tripName: Trip): string {
        return this.TripAddedToCartAlert.replace('{tripName}', this.formatTripName(tripName.name))
    }

    formatTripHeader(tripName: Trip): string {
        return this.TripHeader.replace('{tripName}', this.formatTripName(tripName.name))
    }

    private formatTripName(name: string): string {
        return name.replace('-', '–');
    }
}