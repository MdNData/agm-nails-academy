// Cursuri.jsx
import React from "react";
import { useRouteLoaderData } from "react-router-dom";
import TopTitle from "../assets/components/AboutMe/Introduction/TopTitle/TopTitle";
import CursContainer from "../assets/components/Cursuri/CursContainer/CursContainer";

export const loader = async () => {
  const response = await fetch("/api/cursuri");
  if (!response.ok) {
    throw new Response("Nu s-au putut prelua cursurile", {
      status: response.status,
    });
  }
  const data = await response.json();
  return data;
};

const Cursuri = () => {
  const courses = useRouteLoaderData("cursuri");
  return (
    <section className="cursuri">
      <header>
        <TopTitle
          first="Cursuri Fisice"
          second="In Constanța"
          secondHidden={false}
        />
      </header>
      <CursContainer courses={courses} />
    </section>
  );
};

export default Cursuri;
