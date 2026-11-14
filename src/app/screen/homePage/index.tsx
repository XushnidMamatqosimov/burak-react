import React, { useEffect } from "react";
import Statistics from "./Statistics"
import PopularDishes from "./PopularDishes"
import NewDishes from "./NewDishes"
import Advertisement from "./Advertisement"
import ActiveUsers from "./ActiveUsers"
import Events from "./Events"
import "../../../css/home.css";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setPopularDishes } from "./slice";
import { rethrievePopularDishes } from "./selector";
import { Product } from "../../../lib/types/product";
import ts from "typescript";


/**  Redux Slice & Selector **/
const actionDishpatch = (dispatch: Dispatch) => ({
    setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
});
const popularDishesRetriever = createSelector(
    rethrievePopularDishes, 
    (popularDishes) => ({ popularDishes })
);

export default function HomePage() {
    const { setPopularDishes } = actionDishpatch(useDispatch());
    const popularDishes = useSelector(popularDishesRetriever);
    //Selector: Store => Data

    useEffect(() => {}, []);

    console.log(popularDishes);


    return <div className={"homepage"}>
        <Statistics />
        <PopularDishes />
        <NewDishes />
        <Advertisement />
        <ActiveUsers />
        <Events />
    </div>
}