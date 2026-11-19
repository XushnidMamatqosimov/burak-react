import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";
import HomePage from "../homePage";

const selectProductsPage = (state: AppRootState)=>state.productsPage;

export const retrieveRestaurant = createSelector(selectProductsPage, 
    (HomePage) => HomePage.restaurant
);

export const retrieveChosenProduct = createSelector(selectProductsPage, 
    (HomePage) => HomePage.chosenProduct
);

export const retrieveProducts = createSelector(selectProductsPage, 
    (HomePage) => HomePage.products
);