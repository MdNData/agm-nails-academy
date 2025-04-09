import { HiOutlineShoppingBag } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../../utils/AuthContext";

const CartButton = () => {
  const { cartItemCount } = useContext(AuthContext);

  return (
    <div className="cart-button">
      <Link to={"/cart"}>
        <HiOutlineShoppingBag />
        {cartItemCount > 0 && <div className="cart-count">{cartItemCount}</div>}
      </Link>
    </div>
  );
};

export default CartButton;
