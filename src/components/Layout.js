import React from "react";
import Navbar from "./Navbar/Navbar";

function Layout({ children }) {
  return (
    <>
      <header><Navbar /></header>
      <main>{children}</main>
      <footer></footer>
    </>
  );
}

export default Layout;
