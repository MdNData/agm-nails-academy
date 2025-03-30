import React from "react";
import TopTitle from "../AboutMe/Introduction/TopTitle/TopTitle";

const PoliticaInscriere = () => {
  return (
    <section className="legal-page enrollment-policy">
      <TopTitle
        first="Politică de Înscriere"
        second="Shop & Academy Boutique Chic AGM SRL"
      />
      <article>
        <h2>Înregistrare și Crearea Contului</h2>
        <p>
          Pentru a beneficia de serviciile noastre, este necesar să vă
          înregistrați pe site și să furnizați informații exacte și complete.
          Datele dvs. sunt utilizate exclusiv în scopuri administrative și
          pentru comunicarea cu dvs.
        </p>
        <h2>Securitatea Contului</h2>
        <p>
          Vă rugăm să păstrați confidențialitatea datelor de autentificare. Shop
          & Academy nu va fi responsabilă pentru accesul neautorizat la contul
          dvs.
        </p>
        <h2>Modificări</h2>
        <p>
          Ne rezervăm dreptul de a modifica această politică de înscriere, iar
          orice modificare va fi publicată pe site.
        </p>
      </article>
    </section>
  );
};

export default PoliticaInscriere;
