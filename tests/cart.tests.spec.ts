import { expect, test } from '../pages/base-page';
import { hikes, other, windsurfing, yoga } from '../data/trips'

test.beforeEach(async ({ page, navigationPage: navigationPage }) => {
    await page.goto('/');
    await navigationPage.closeStoreNotice();
    await page.reload()
});

test.describe('Cart functionality tests', () => {

    test('User can add a selected trip to the cart from the product page', async ({ navigationPage, cartPage, productPage }) => {
        await navigationPage.searchSpecificTrip(hikes.GranKoscielcow)
        await productPage.clickAddToCart()
        await navigationPage.clickCartButton()
        const productName = await cartPage.getItemName(1)
        expect(productName).toBe(hikes.GranKoscielcow.name)

    });

    test('User can add a selected trip to the cart 10 times from the product page', async ({ navigationPage, productPage, cartPage }) => {
        test.setTimeout(90000)
        await navigationPage.searchSpecificTrip(other.Mazury)
        for (let i = 1; i <= 10; i++) {
            await productPage.clickAddToCart()
        }
        await navigationPage.clickCartButton()
        const numberOfItems = await cartPage.getItemQuantity(1)
        expect(numberOfItems).toBe(10)
    });

    test('[wip] User can search and add at least 10 trips to the cart from product pages', async ({ navigationPage, cartPage }) => {
        test.setTimeout(120000)
        await navigationPage.searchAndAddTripsToCart(
            hikes.GranKoscielcow,
            hikes.IslandPeak,
            hikes.ViaFerraty,
            windsurfing.ElGouna,
            windsurfing.Karpathos,
            windsurfing.Lanzarote,
            windsurfing.Limnos,
            other.Mazury,
            yoga.Japonia,
            yoga.Wlochy,
        )
        const numberOfProducts = await cartPage.getItemsCount()
        expect(numberOfProducts).toBe(10

        )
    });

    // • użytkownik ma możliwość wybrania ilości wycieczek, które chce zakupić, na stronie produktu (np. dla zamówienia dla kilku osób),
    test('User can select the quantity of a trip on the product page before adding to the cart', async ({ navigationPage, cartPage, productPage }) => {
        await navigationPage.searchSpecificTrip(yoga.Malta)
        await productPage.changeNumberOfItems(3)
        await productPage.clickAddToCart()
        await navigationPage.clickCartButton()
        const numberOfItems = await cartPage.getItemQuantity(1)
        expect(numberOfItems).toBe(3)
    });

    // użytkownik ma możliwość zmiany ilości wybranej wycieczki (pojedynczej pozycji) na stronie koszyka,
    test('User can change the quantity of a trip in the cart', async ({ navigationPage, cartPage }) => {
        test.setTimeout(120000)
        await navigationPage.searchAndAddTripsToCart(windsurfing.Karpathos)
        const singleTripPrice = await cartPage.getItemTotalPrice(1)
        await cartPage.changeItemQuantity(1, 2)
        const doubleTripPrice = await cartPage.getItemTotalPrice(1)
        expect(doubleTripPrice).toBe(Number(singleTripPrice) * 2)
    });

    // użytkownik ma możliwość usunięcia wycieczki na stronie koszyka (całej pozycji),
    test('User can remove a trip from the cart', async ({ navigationPage, cartPage }) => {
        await navigationPage.searchAndAddTripsToCart(windsurfing.Sal, other.Mazury)
        const numberOfItems = await cartPage.getItemsCount()
        await cartPage.removeItem(1)
        expect(await cartPage.getItemsCount()).toBe(numberOfItems - 1)
    });
})




/* 
[TODO]
• użytkownik jest informowany o błędach w formularzu na stronie płatności poprzez odpowiednie
komunikaty,
• użytkownik ma możliwość zalogowania się na stronie płatności i dokonać płatności jako zalogowany
użytkownik,
• użytkownik ma możliwość założenia konta na stronie płatności i dokonać jednocześnie płatności,
• użytkownik ma możliwość dokonania zakupu bez zakładania konta,
• użytkownik, który posiada konto może zobaczyć swoje zamówienia na swoim koncie,
• użytkownik po dokonaniu zamówienia może zobaczyć podsumowanie, które zawiera numer
zamówienia, poprawną datę, kwotę, metodę płatności, nazwę i ilość zakupionych produktów.
• użytkownik ma możliwość dodania wybranej wycieczki do koszyka ze strony kategorii,
• użytkownik ma możliwość dodania 10 różnych wycieczek do koszyka,
*/