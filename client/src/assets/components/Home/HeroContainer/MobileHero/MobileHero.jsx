import HeroButton from "./HeroButton/HeroButton";
import { FiArrowDown } from "react-icons/fi";

const MobileHero = ({ width }) => {
  return (
    <section className={width < 800 ? "mobile-hero" : "left-hero"}>
      <h1>Devino Expert în Manichiură</h1>
      <p>
        Transformă-ți pasiunea într-o carieră de succes urmărind cursurile mele
        profesionale de manichiură în Constanța
      </p>
      <HeroButton />
    </section>
  );
};
export default MobileHero;
