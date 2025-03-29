import { NavLink } from "react-router-dom";
import logo from "../../../images/favicon.png";

const Logo = ({ isMenuOpen = () => {}, setIsMenuOpen = () => {} }) => {
  return (
    <div className="logo" title="AGMNails Home">
      <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
        <img
          src={logo}
          alt="Reprezentarea frumuseții și eleganței acoperite cu sclipici."
        />
        <span>
          Shop & Academy
        </span>
      </NavLink>
      
    </div>
  );
};
export default Logo;
