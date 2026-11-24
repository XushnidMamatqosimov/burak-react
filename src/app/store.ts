import { configureStore, ThunkAction, Action, Middleware } from '@reduxjs/toolkit';
import HomePageReducer from './screen/homePage/slice';
import reduxLogger from "redux-logger";
import ProductsPageReducer from './screen/productsPage/slice';
import OrdersPageReducer from './screen/ordersPage/slice';

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reduxLogger as Middleware),
reducer: {
  homePage: HomePageReducer,
  productsPage: ProductsPageReducer,
  ordersPage: OrdersPageReducer,

  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
