import { HiOutlineShoppingBag } from "react-icons/hi";
import { Link } from "react-router-dom";

const CartButton = () => {
  return (
    <div className="cart-button">
      <Link to={"/cart"}>
        <HiOutlineShoppingBag />
      </Link>
    </div>
  );
};
export default CartButton;
