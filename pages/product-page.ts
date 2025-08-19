import { Locator, Page } from "@playwright/test";

export class ProductPage {
    addToCartButton: Locator;
    private quantityBox: Locator;
    productTitle: Locator

    constructor(private page: Page) {
        this.addToCartButton = page.locator('.single_add_to_cart_button')
        this.quantityBox = page.locator('[id^="quantity"]')
        this.productTitle = page.locator('.product_title')
    }

    async changeNumberOfItems(numOfItems: number): Promise<void> {
        await this.quantityBox.fill(String(numOfItems))
    }

    async clickAddToCart(): Promise<void> {
        await this.addToCartButton.click()
    }
}