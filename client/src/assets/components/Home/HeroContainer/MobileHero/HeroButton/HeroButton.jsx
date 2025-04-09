import { Link } from "react-router-dom";

const HeroButton = ({ text = "Înscrie-te la Curs", link = "/cursuri" }) => {
  return (
    <Link className="hero-button" to={link}>
      <button>{text}</button>
    </Link>
  );
};
export default HeroButton;
