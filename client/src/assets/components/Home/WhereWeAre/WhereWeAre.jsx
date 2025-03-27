import { FiMapPin } from "react-icons/fi";
import { Link } from "react-router-dom";

const WhereWeAre = () => {
  return (
    <section className="where-we-are">
      <div>
        <h2>
          <FiMapPin />
          Ne Găsești în Constanța
        </h2>
        <p>Str. Farului Nr. 19, Constanța</p>
        <p>Program: Luni - Duminica: 09:00 - 18:00</p>

        <Link to="/contact">Vezi harta și detalii de contact →</Link>
      </div>
    </section>
  );
};
export default WhereWeAre;
