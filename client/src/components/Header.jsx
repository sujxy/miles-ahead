import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <Link to="/">Home </Link>
      <Link to="/chatpage">chatpage </Link>
      <Link to="/signup">Sigin up </Link>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Header;
