import React, { useEffect } from "react";
import Statistics from "./Statistics"
import PopularDishes from "./PopularDishes"
import NewDishes from "./NewDishes"
import Advertisement from "./Advertisement"
import ActiveUsers from "./ActiveUsers"
import Events from "./Events"
//@ts-ignore
import "../../../css/home.css";
import { ProductCollection } from "../../../lib/enums/productEnum";
import ProductService from "../../service/ProductService";

import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setNewDishes, setPopularDishes, setTopUsers } from "./slice";
import { Product } from "../../../lib/types/product";
import MemberService from "../../service/MemberService";
import { Member } from "../../../lib/types/member";


/**  Redux Slice & Selector **/
const actionDishpatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
  setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});

export default function HomePage() {
  const { setPopularDishes, setNewDishes, setTopUsers } = actionDishpatch(useDispatch());
  //Selector: Store => Data

  useEffect(() => {
    // Backend Serverdan datalar olib kelinadi;
    const product = new ProductService();

    product.getProducts({
      page: 1,
      limit: 4,
      order: "productViews",
      productCollection: ProductCollection.DISH,
    }).then((data: Product[]) => {
      console.log("Data passed here: ", data);
      setPopularDishes(data);  // borib redux storega joylaydi
    }).catch((err: any) => {
      console.log("Error: ", err);
    });

    // FreshMenu Sectional Component uchun
    product.getProducts({
      page: 1,
      limit: 4,
      order: "createdAt",
      productCollection: ProductCollection.DISH,
    }).then((data: Product[]) => {
      console.log("NewDishes passed: ", data);
      setNewDishes(data);  // borib redux storega joylaydi
    }).catch((err: any) => {
      console.log("Error: ", err);
    });

    //GetTopUsers sectional component uchun
    const memberService = new MemberService();

    memberService
      .getTopUsers()
      .then((data) => {setTopUsers(data)})
      .catch((err) => console.log("setTopUsers, error: ", err ));


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