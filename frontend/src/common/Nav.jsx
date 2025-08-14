import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <Link to="/login">Login</Link> |{" "}
      <Link to="/register">Signup</Link> |{" "}
      <Link to="/Logout">Logout</Link> |{" "}
    </nav>
  );
}

export default Nav;