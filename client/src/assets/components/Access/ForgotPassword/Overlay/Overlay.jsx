import React from "react";
import { Link } from "react-router-dom";
import HeroButton from "../../../Home/HeroContainer/MobileHero/HeroButton/HeroButton";

const Overlay = ({ type = "success", msg }) => {
  return (
    <section className="overlay-forgot-password">
      <div>
        {type === "success" ? (
          <>
            <h2>Cerere trimisă cu succes!</h2>
            <p>{msg}</p>
            <HeroButton text="Întoarce-te la login" link="/autentificare" />
          </>
        ) : (
          <>
            <h2>Eroare la resetarea parolei</h2>
            <p>{msg}</p>
            <HeroButton text="Încearcă din nou" link="/forgot-password" />
          </>
        )}
      </div>
    </section>
  );
};

export default Overlay;
