import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectOrdersPage = (state: AppRootState) => state.ordersPage;

export const rethrievePopularDishes = createSelector(
  selectOrdersPage,
  (OrderPage) => OrderPage.pausedOrders
);

export const rethrieveNewDishes = createSelector(
  selectOrdersPage,
  (HomePage) => HomePage.processOrders
);

export const rethrieveTopUsers = createSelector(
  selectOrdersPage,
  (HomePage) => HomePage.finishedOrders
);