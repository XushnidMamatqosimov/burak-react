import React from 'react';
import "../css/app.css";
import { Container, Stack, Box, Typography, Button } from '@mui/material';
import { Link, Route, Switch } from 'react-router-dom';
import { HomePage } from './screen/homePage';
import { ProductsPage } from './screen/productsPage';
import { OrdersPage } from './screen/ordersPage/orders';
import { UserPage } from './screen/userPape';

const RouterLink = Link as unknown as React.ComponentType<React.PropsWithChildren<{ to: string }>>;

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <RouterLink to="/">Home</RouterLink>
          </li>
          <li>
            <RouterLink to="/products">ProductsPage</RouterLink>
          </li>
          <li>
            <RouterLink to="/orders">OrdersPage</RouterLink>
          </li>
          <li>
            <RouterLink to="/member-page">UserPage</RouterLink>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path="/products">
          <ProductsPage />
        </Route>

        <Route path="/orders">
          <OrdersPage />
        </Route>
        <Route path="/orders">
          <UserPage />
        </Route>

        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;