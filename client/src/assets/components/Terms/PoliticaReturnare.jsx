import React from "react";
import TopTitle from "../AboutMe/Introduction/TopTitle/TopTitle";

const PoliticaReturnare = () => {
  return (
    <section className="legal-page return-policy">
      <TopTitle
        first="Politică de Returnare"
        second="Shop & Academy Boutique Chic AGM SRL"
      />
      <article>
        <h2>Dreptul de Retragere</h2>
        <p>
          Conform legislației române, aveți dreptul să returnați produsele
          achiziționate în termen de 14 zile de la primire, fără a oferi un
          motiv.
        </p>
        <h2>Condiții de Returnare</h2>
        <p>
          Produsele trebuie să fie nefolosite, în ambalajul original și cu toate
          accesoriile.
        </p>
        <h2>Procedura de Returnare</h2>
        <p>
          Pentru returnare, vă rugăm să contactați serviciul de relații cu
          clienții la adresa de email [email de contact] sau la sediul nostru.
        </p>
        <h2>Rambursarea</h2>
        <p>
          După verificarea produselor returnate, rambursarea se va efectua în
          termen de 14 zile de la data confirmării returnării.
        </p>
      </article>
    </section>
  );
};

export default PoliticaReturnare;
