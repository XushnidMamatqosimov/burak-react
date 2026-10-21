import React from 'react';
import "../css/app.css";
import { Container, Stack, Box, Typography, Button } from '@mui/material';
import { Link, Route, Switch } from 'react-router-dom';
import { About } from './screen/About';
import { Users } from './screen/Users';

const RouterLink = Link as unknown as React.ComponentType<React.PropsWithChildren<{ to: string }>>;

function Home() {
  return <h1>Home</h1>;
}

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <RouterLink to="/">Home</RouterLink>
          </li>
          <li>
            <RouterLink to="/about">About</RouterLink>
          </li>
          <li>
            <RouterLink to="/users">Users</RouterLink>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path="/about">
          <About />
        </Route>

        <Route path="/users">
          <Users />
        </Route>

        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;