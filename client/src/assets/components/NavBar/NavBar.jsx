import MenuContainer from "./MenuContainer/MenuContainer";
import React, { useState } from "react";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="nav-container">
      <nav className="navbar">
        <MenuContainer isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </nav>
    </div>
  );
};
export default NavBar;
