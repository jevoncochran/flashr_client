import { useAppSelector } from "../app/hooks";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";

const Header = () => {
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
      {!user ? (
        <>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink as={Link} to="/login">
              Login
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink as={Link} to="/register">
              Sign Up
            </BreadcrumbLink>
          </BreadcrumbItem>
        </>
      ) : (
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>Sign Out</BreadcrumbLink>
        </BreadcrumbItem>
      )}
    </Breadcrumb>
  );
};

export default Header;
