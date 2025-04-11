import React from "react";
import { useLoaderData, useParams } from "react-router-dom";
import TopTitle from "../../AboutMe/Introduction/TopTitle/TopTitle";
import SingleOnlineCursContainer from "./SingleOnlineCourseContainer/SingleOnlineCursContainer";

export const loader = async ({ params }) => {
  const { id } = params;
  const response = await fetch(`/api/cursuri-online/${id}`);

  if (!response.ok) {
    throw new Error("Errore nel caricamento del corso online.");
  }

  const courses = await response.json(); // Dato che la risposta è un array
  const course = courses.data; // Accedi al primo elemento dell'array

  return course; // Restituisci l'oggetto del corso
};

const SingleOnlineCursPage = () => {
  const course = useLoaderData();

  return (
    <section className="single-curs-page">
      <TopTitle
        first={course.title}
        second={course.secondTitle || ""}
        secondHidden={!course.secondTitle}
        third={course.thirdTitle || ""}
        thirdHidden={!course.thirdTitle}
      />
      <SingleOnlineCursContainer course={course} />
    </section>
  );
};

export default SingleOnlineCursPage;
