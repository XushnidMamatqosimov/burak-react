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
import useBasket from './hooks/useBasket';

const RouterLink = Link as unknown as React.ComponentType<React.PropsWithChildren<{ to: string }>>;

function App() {
  const location = useLocation();
  const { cardItems, onAdd, onRemove, onDelete, onDeleteAll } = useBasket();


  return (
    <>
      {location.pathname === "/" ? (
        <HomeNavbar
          cardItems={cardItems}
          onAdd = {onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
        />
      ) : (
        <OtherNavbar
          cardItems={cardItems}
          onAdd = {onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
        />
      )}
      <Switch>
        <Route path="/products">
          <ProductsPage onAdd={onAdd} />
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