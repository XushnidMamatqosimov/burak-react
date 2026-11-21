import { Box, Button, Container, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import { CardItem } from "../../../lib/types/search";

interface OtherNavbarProps {
  cardItems: CardItem[];
  onAdd: (item: CardItem) => void;
  onRemove: (item: CardItem) => void;
  onDelete: (item: CardItem) => void;
  onDeleteAll: () => void;
  setSignupOpen: (isOpen: boolean) => void;
  setLoginOpen: (isOpen: boolean) => void
}

export default function OtherNavbar(props: OtherNavbarProps) {
  const { cardItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll,
    setSignupOpen,
    setLoginOpen } = props;
  const authMember = null;
  return (
    <div className="other-navbar">
      <Container className="navbar-container">
        <Stack className="menu">
          <Box>
            <NavLink to="/">
              <img className="brand-logo" src="/icons/burak.svg" />
            </NavLink>
          </Box>
          <Stack className="links">
            <Box className={"hover-line"}>
              <NavLink to="/">Home</NavLink>
            </Box>
            <Box className={"hover-line"}>
              <NavLink to="/products" activeClassName="underline">Products</NavLink>
            </Box>
            {authMember ? (
              <Box className={"hover-line"}>
                <NavLink to="/orders" activeClassName="underline">Orders</NavLink>
              </Box>
            ) : null}
            {authMember ? (
              <Box className={"hover-line"}>
                <NavLink to="/member-page" activeClassName="underline">My Page</NavLink>
              </Box>
            ) : null}
            <Box className={"hover-line"}>
              <NavLink to="/help" activeClassName="underline">Help</NavLink>
            </Box>
            {/* {Baket} */}
            <Basket
              cardItems={cardItems}
              onAdd={onAdd}
              onRemove={onRemove}
              onDelete={onDelete}
              onDeleteAll={onDeleteAll}
            />
            {!authMember ? (
              <Box>
                <Button
                  variant="contained"
                  className="login-button"
                  onClick={() => setLoginOpen(true)}
                >
                  Login
                </Button>
              </Box>
            ) : (
              <img className="user-avatar"
                src={"/icons/default-user.svg"}
                aria-haspopup={"true"}
              />
            )}
          </Stack>
        </Stack>
      </Container>
    </div>);;
}