import { Locator, Page } from '../pages/base-page';

export class CartPage {
    private cartItem: Locator;
    private processingSpinner: Locator
    private updateCartButton: Locator;
    private productNameSelector: string;
    productsTable: Locator;
    emptyCart: Locator;
    private quantityBoxSelector: string;
    private totalPriceSelector: string;
    private removeItemSelector: string;


    constructor(private page: Page) {
        this.cartItem = page.locator('tbody tr.cart_item')
        this.processingSpinner = page.locator('[class="woocommerce-cart-form processing"]')
        this.updateCartButton = page.locator('button[name=update_cart]')
        this.productsTable = this.page.locator('.woocommerce-cart-form')
        this.emptyCart = this.page.locator('.cart-empty')
        this.productNameSelector = '.product-name'
        this.quantityBoxSelector = '[id^="quantity"]'
        this.totalPriceSelector = '.product-subtotal'
        this.removeItemSelector = '.product-remove .remove'
    }

    private getItem(positionInCart: number): Locator {
    return this.cartItem.nth(positionInCart - 1);
  }


    async getItemName(positionInCart: number): Promise<string> {
        const name = await this.getItem(positionInCart).locator(this.productNameSelector).textContent();
        return name?.trim() ?? '';
    }
    
    async getItemTotalPrice(positionInCart: number): Promise<number> {
        const price = await this.getItem(positionInCart).locator(this.totalPriceSelector).textContent()
        return this.parsePrice(price ?? '');
    }
    
    async getItemQuantity(positionInCart: number): Promise<number> {
        const quantity = await this.getItem(positionInCart).locator(this.quantityBoxSelector).inputValue();
        return Number(quantity);
    }

    
    async waitForCartUpdate(): Promise<void> {
        await this.processingSpinner.waitFor({ state: 'visible', timeout: 20000 });
        await this.processingSpinner.waitFor({ state: 'hidden', timeout: 20000 });
    }
    
    async changeItemQuantity(positionInCart: number, numOfItems: number): Promise<void> {
        const quantityBoxLocator = this.getItem(positionInCart).locator(this.quantityBoxSelector)
        await quantityBoxLocator.fill(String(numOfItems))
        await this.clickUpdateCartButton()
        await this.waitForCartUpdate()
    }
    
    async clickUpdateCartButton(): Promise<void>{
        await this.updateCartButton.click()
    }
    
    async getItemsCount(): Promise<number> {
        return await this.cartItem.count()
    }
    
    async removeItem(positionInCart: number): Promise<void> {
        await this.getItem(positionInCart).locator(this.removeItemSelector).click()
        await this.waitForCartUpdate()
    }
    
    parsePrice(priceString: string): number {
        return parseFloat(
            priceString
                .replace(/\s/g, '')
                .replace(/&nbsp;/g, '')
                .replace(/zł/g, '')
                .replace(',', '.')
        );
    }
}