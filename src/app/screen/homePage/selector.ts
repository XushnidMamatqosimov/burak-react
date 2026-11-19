
import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectHomePage = (state: AppRootState) => state.homePage;

export const rethrievePopularDishes = createSelector(selectHomePage,
    (HomePage) => HomePage.popularDishes
);

export const rethrieveNewDishes = createSelector(
    selectHomePage,
    (HomePage) => HomePage.newDishes
);

export const rethrieveTopUsers = createSelector(
    selectHomePage,
    (HomePage) => HomePage.topUsers
);