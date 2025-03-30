import React from "react";
import TopTitle from "../AboutMe/Introduction/TopTitle/TopTitle";

const PoliticaPlata = () => {
  return (
    <section className="legal-page payment-policy">
      <TopTitle
        first="Politică de Plată"
        second="Shop & Academy Boutique Chic AGM SRL"
      />
      <article>
        <h2>Metode de Plată Acceptate</h2>
        <p>
          Acceptăm plata prin card de credit, PayPal, transfer bancar și alte
          metode specificate în timpul procesului de checkout.
        </p>
        <h2>Securitatea Tranzacțiilor</h2>
        <p>
          Toate tranzacțiile sunt procesate prin intermediul unor servicii
          securizate. Shop & Academy nu stochează informații sensibile despre
          carduri.
        </p>
        <h2>Confirmarea Comenzii</h2>
        <p>
          După finalizarea plății, veți primi un email de confirmare cu
          detaliile comenzii.
        </p>
        <h2>Politica de Refund</h2>
        <p>
          Pentru produsele eligibile, politica de returnare se aplică și
          tranzacțiilor efectuate prin aceste metode de plată.
        </p>
      </article>
    </section>
  );
};

export default PoliticaPlata;
