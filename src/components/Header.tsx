import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout } from "../features/auth/authSlice";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
} from "@chakra-ui/react";

const Header = () => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  return (
    <Breadcrumb
      separator=" "
      //   border="1px dashed black"
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      height="64px"
      padding="0 12px"
    >
      <BreadcrumbItem>
        <BreadcrumbLink as={Link} to="/">
          Decks
        </BreadcrumbLink>
      </BreadcrumbItem>
      {!user && (
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/login">
            Login
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}
      {!user && (
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/register">
            Sign Up
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}
      {user && (
        <BreadcrumbItem>
          <Button onClick={() => dispatch(logout())}>Sign Out</Button>
        </BreadcrumbItem>
      )}
    </Breadcrumb>
  );
};

export default Header;
