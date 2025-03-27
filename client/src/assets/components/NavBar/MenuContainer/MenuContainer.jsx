import React, { useState } from "react";
import Menu from "./Menu/Menu";
import useDetectScreenSize from "../../../hooks/useDetectScreenSize";
import MenuBtn from "./MenuBtn/MenuBtn";
import AccessButton from "../AccessButton/AccessButton";
import CartButton from "../CartButton/CartButton";
import Logo from "../Logo/Logo";

const MenuContainer = ({ isMenuOpen = () => {}, setIsMenuOpen = () => {} }) => {
  const { width, height } = useDetectScreenSize();
  return (
    <div className="access-menu-container">
      <Logo isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <CartButton />
      <AccessButton width={width} />
      {width < 800 ? (
        <MenuBtn isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      ) : null}
      <Menu
        isMenuOpen={width < 800 ? isMenuOpen : true}
        setIsMenuOpen={setIsMenuOpen}
      />
    </div>
  );
};
export default MenuContainer;
