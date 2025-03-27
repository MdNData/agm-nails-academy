import { Link } from "react-router-dom";

const HeroButton = ({text="Înscrie-te la Curs"}) => {
  return (
    <Link className="hero-button" to={'/cursuri'}>
      <button>{text}</button>
    </Link>
  );
};
export default HeroButton;
