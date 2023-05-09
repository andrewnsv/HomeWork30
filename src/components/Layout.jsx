import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import Navigation from './Navigation'

const Layout = () => {
  return (
    <>
      <Navigation>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/episodes">Eposodes</NavLink>
        <NavLink to="/table">Table</NavLink>
      </Navigation>
      <Outlet />
    </>
  );
};

export default Layout;
