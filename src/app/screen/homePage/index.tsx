import React, { useEffect } from "react";
import Statistics from "./Statistics"
import PopularDishes from "./PopularDishes"
import NewDishes from "./NewDishes"
import Advertisement from "./Advertisement"
import ActiveUsers from "./ActiveUsers"
import Events from "./Events"
import "../../../css/home.css";
import ts from "typescript";
import { ProductCollection } from "../../../lib/enums/productEnum";
import ProductService from "../../service/ProductService";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setNewDishes, setPopularDishes } from "./slice";
import { rethrievePopularDishes } from "./selector";
import { Product } from "../../../lib/types/product";


/**  Redux Slice & Selector **/
const actionDishpatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
  setNewDishes: (data: Product[] )=> dispatch(setNewDishes(data)),
});

export default function HomePage() {
  const { setPopularDishes, setNewDishes } = actionDishpatch(useDispatch());
  //Selector: Store => Data
  console.log(process.env.REACT_APP_API_URL);

  useEffect(() => {
    // Backend Serverdan datalar olib kelinadi;
    const product = new ProductService();
    product.getProducts({
      page: 1,
      limit: 4,
      order: "productViews",
      productCollection: ProductCollection.DISH,
    }).then((data: Product[])=>{
      console.log("Data passed here: ", data);
      setPopularDishes(data);  // borib redux storega joylaydi
    }).catch((err: any)=>{
      console.log("Error: ", err);
    });

    product.getProducts({
      page: 1,
      limit: 4,
      order: "productViews",
      productCollection: ProductCollection.DISH,
    }).then((data: Product[])=>{
      console.log("NewDishes passed: ", data);
      setNewDishes(data);  // borib redux storega joylaydi
    }).catch((err: any)=>{
      console.log("Error: ", err);
    });
  }, []);


  return <div className={"homepage"}>
    <Statistics />
    <PopularDishes />
    <NewDishes />
    <Advertisement />
    <ActiveUsers />
    <Events />
  </div>
}