import React, { useState } from 'react';
import { Container, Stack, Box, Typography, Button } from '@mui/material';
import { Link, Route, Switch, useLocation } from 'react-router-dom';
import HomePage from './screen/homePage';
import ProductsPage from './screen/productsPage';
import OrdersPage from './screen/ordersPage';
import UserPage from './screen/userPape';
import HomeNavbar from './components/headers/HomeNavbar';
import OtherNavbar from './components/headers/OtherNavbar';
import Footer from './components/footer';
// @ts-ignore
import "../css/app.css";
// @ts-ignore
import "../css/navbar.css";
// @ts-ignore
import "../css/footer.css";
import HelpPage from './screen/helpPage';
import Test from './screen/Test';
import { CardItem } from '../lib/types/search';

const RouterLink = Link as unknown as React.ComponentType<React.PropsWithChildren<{ to: string }>>;

function App() {
  const location = useLocation();

  const cardJson: string | null = localStorage.getItem("cardData");
  const currentCard = cardJson ? JSON.parse(cardJson): []
  const [cardItems, setCardItems] = useState<CardItem[]>(currentCard);
  /* HANDLERS */
  const onAdd = (input: CardItem) => {
    const exist: any = cardItems.find(
      (item: CardItem) => item._id === input._id
    );
    if (exist) {
      const cardUpdate = cardItems.map((item: CardItem) =>
        item._id === input._id
          ? { ...exist, quantity: exist.quantity + 1 } : item
      );
      setCardItems(cardUpdate);
      localStorage.setItem("cardData", JSON.stringify(cardUpdate));
    } else {
      const cardUpdate = [ ...cardItems, { ...input }];
      setCardItems(cardUpdate);
      localStorage.setItem("cardData", JSON.stringify(cardUpdate));
    }
  }

  return (
    <>
      {location.pathname === "/" ? <HomeNavbar cardItems={cardItems} /> : <OtherNavbar  cardItems={cardItems}/>}
      <Switch>
        <Route path="/products">
          <ProductsPage onAdd={onAdd}/>
        </Route>
        <Route path="/orders">
          <OrdersPage />
        </Route>
        <Route path="/member-page">
          <UserPage />
        </Route>
        <Route path="/help">
          <HelpPage />
        </Route>

        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;