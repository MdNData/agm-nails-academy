import { Link } from "react-router-dom";

const LeftHero = () => {
  return (
    <section className="left-hero">
      <h1>Devino Expert în Manichiură</h1>
      <p>
        Transformă-ți pasiunea într-o carieră de succes urmărind cursurile mele
        profesionale de manichiură în Constanța
      </p>
      <Link to="/cursuri">Înscrie-te la Curs</Link>
    </section>
  );
};
export default LeftHero;
