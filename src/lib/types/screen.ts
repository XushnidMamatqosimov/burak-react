import { Member } from "./member";
import { Product } from "./product";

// ** ReactApp State **
export interface AppRootState {
    homePage: HomePageState;
    
}

/** HomePage **/
export interface HomePageState {
    popularDishes: Product[];
    newDishes: Product[];
    topUsers: Member[];
}

/** ProductsPage **/
/** OrdersPage **/