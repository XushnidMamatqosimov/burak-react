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
import useBasket from './hooks/useBasket';
import AuthenticationModal from './components/auth';
import { T } from '../lib/types/common';
import { sweetErrorHandling, sweetTopSuccessAlert } from '../lib/sweetAlert';
import MemberService from './service/MemberService';
import { useGlobals } from './hooks/useGlobal';

const RouterLink = Link as unknown as React.ComponentType<React.PropsWithChildren<{ to: string }>>;

function App() {
  const location = useLocation();
  const {setAuthMember} = useGlobals();
  const { cardItems, onAdd, onRemove, onDelete, onDeleteAll } = useBasket();
  const [signupOpen, setSignupOpen] = useState<boolean>(false);
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  /** HANDLERS **/
  const handleSignupClose = () => setSignupOpen(false);
  const handleLoginClose = () => setLoginOpen(false);

  const handleLogoutClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  }
  const handleCloseLogout = () => setAnchorEl(null);
  const handleLogoutRequest = async () =>{
    try{
      const member = new MemberService();
      await member.logout();
      await sweetTopSuccessAlert("success", 1500);
      setAuthMember(null);
    }catch(err){
      console.log(err);
      sweetErrorHandling(err);
    }
  }

  
  return (
    <>
      {location.pathname === "/" ? (
        <HomeNavbar
          cardItems={cardItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
          setSignupOpen={setSignupOpen}
          setLoginOpen={setLoginOpen}
          anchorEl={anchorEl}
          handleLogoutClick={handleLogoutClick}
          handleCloseLogout={handleCloseLogout}
          handleLogoutRequest={handleLogoutRequest}
        />
      ) : (
        <OtherNavbar
          cardItems={cardItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
          setSignupOpen={setSignupOpen}
          setLoginOpen={setLoginOpen}
          anchorEl={anchorEl}
          handleLogoutClick={handleLogoutClick}
          handleCloseLogout={handleCloseLogout}
          handleLogoutRequest={handleLogoutRequest}
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

      <AuthenticationModal
          signupOpen={signupOpen}
          loginOpen = {loginOpen}
          handleLoginClose={handleLoginClose}
          handleSignupClose={handleSignupClose}
      />
    </>
  );
}

export default App;