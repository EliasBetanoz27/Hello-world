import React from "react";
import "../css/Navbar.css"
const Navbar = ({brand}) => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <a href="#!!" className="navbar-brand">
          {brand}
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
