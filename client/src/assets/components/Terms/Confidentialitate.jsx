import React from "react";
import TopTitle from "../AboutMe/Introduction/TopTitle/TopTitle";

const Confidentialitate = () => {
  return (
    <section className="legal-page privacy-policy">
      <TopTitle
        first="Politica de Confidențialitate"
        second="Shop & Academy Boutique Chic AGM SRL"
      />
      <article>
        <h2>Colectarea Datelor</h2>
        <p>
          Colectăm date personale esențiale (nume, email, adresă etc.) pentru a
          procesa comenzile, a vă oferi servicii și a vă comunica informații
          relevante.
        </p>
        <h2>Utilizarea Datelor</h2>
        <p>
          Datele colectate sunt folosite exclusiv în scopuri administrative și
          pentru îmbunătățirea serviciilor oferite. Toate datele sunt tratate
          conform Regulamentului General privind Protecția Datelor (GDPR).
        </p>
        <h2>Securitatea Datelor</h2>
        <p>
          Implementăm măsuri tehnice și organizatorice adecvate pentru a proteja
          datele personale împotriva accesului neautorizat, pierderii sau
          distrugerii.
        </p>
        <h2>Drepturile Utilizatorilor</h2>
        <p>
          Aveți dreptul de a accesa, rectifica sau șterge datele dvs. personale.
          Pentru a exercita aceste drepturi, vă rugăm să ne contactați la [email
          de contact].
        </p>
        <h2>Modificări</h2>
        <p>
          Ne rezervăm dreptul de a modifica această politică de
          confidențialitate. Orice modificare va fi publicată pe site.
        </p>
      </article>
    </section>
  );
};

export default Confidentialitate;
