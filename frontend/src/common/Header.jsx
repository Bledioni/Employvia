import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav>
      <Link to="/">Home</Link> |{" "}
      <Link to="/login">Login</Link> |{" "}
      <Link to="/register">Signup</Link> |{" "}
      <Link to="/Logout">Logout</Link> |{" "}
    </nav>
  );
}

export default Header;