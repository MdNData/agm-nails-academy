import HeroButton from "../HeroContainer/MobileHero/HeroButton/HeroButton";

const CourseSession = () => {
  return (
    <section className="course-session">
      <h2>Următoarea Sesiune de Curs Începe în Curând</h2>
      <p>
        Locuri limitate! Înscrie-te acum pentru a-ți asigura participarea la cel
        mai complet curs de manichiură din Constanța.
      </p>
      <ul>
        <li>
          <span></span>
          Tehnici moderne de manichiură
        </li>
        <li>
          <span></span>
          Practică intensivă pe modele reale
        </li>
        <li>
          <span></span>
          Kit profesional inclus
        </li>
        <li>
          <span></span>
          Suport post-curs
        </li>
      </ul>
      <HeroButton text="Detalii și Înscriere" />
    </section>
  );
};
export default CourseSession;
