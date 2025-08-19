import { test as base, APIRequestContext, Locator, Page } from "@playwright/test";
import { NavigationPage } from "./navigation-page";
import { CartPage } from "./cart-page"
import { ProductPage } from "./product-page"

type BaseFixtures = {
  navigationPage: NavigationPage;
  cartPage: CartPage;
  productPage: ProductPage;
  // registerPage: RegisterPage;
};

export const test = base.extend<BaseFixtures>({
  navigationPage: async ({ page }, use) => {
    await use(new NavigationPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page))
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page))
  }
});

export { expect, request } from "@playwright/test";
export { CartPage, NavigationPage, ProductPage, APIRequestContext, Locator, Page };
