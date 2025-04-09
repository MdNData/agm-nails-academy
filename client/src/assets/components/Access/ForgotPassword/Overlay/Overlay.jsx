import React from "react";
import { Link } from "react-router-dom";
import HeroButton from "../../../Home/HeroContainer/MobileHero/HeroButton/HeroButton";

const Overlay = ({ msg }) => {
  return (
    <section className="overlay-forgot-password">
      <div>
        <h2>Cerere trimisa cu success!</h2>
        <p>{msg}</p>
        <HeroButton text="Intoarcete la login" link="/autentificare" />
      </div>
    </section>
  );
};

export default Overlay;
