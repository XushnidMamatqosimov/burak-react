import React from 'react';
import { Container, Stack, Box, Typography, Button } from '@mui/material';
import { Link, Route, Switch, useLocation } from 'react-router-dom';
import HomePage from './screen/homePage';
import ProductsPage from './screen/productsPage';
import OrdersPage from './screen/ordersPage/orders';
import UserPage from './screen/userPape';
import HomeNavbar from './components/headers/HomeNavbar';
import OtherNavbar from './components/headers/OtherNavbar';
import  Footer from './components/footer';
// @ts-ignore
import "../css/app.css";
// @ts-ignore
import "../css/navbar.css";
// @ts-ignore
import "../css/footer.css";
import HelpPage from './screen/helpPage';

const RouterLink = Link as unknown as React.ComponentType<React.PropsWithChildren<{ to: string }>>;

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/" ? <HomeNavbar /> : <OtherNavbar />}
      <Switch>
        <Route path="/products">
          <ProductsPage />
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