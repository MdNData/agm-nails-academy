import React from "react";
import { useLoaderData, useParams } from "react-router-dom";
import TopTitle from "../../AboutMe/Introduction/TopTitle/TopTitle";
import SingleCursContainer from "./SingleCursContainer/SingleCursContainer";

export const loader = async ({ params }) => {
  const { id } = params;
  const response = await fetch(`/api/cursuri/${id}`);
  if (!response.ok) {
    throw new Error("Errore nel caricamento del corso.");
  }
  const course = await response.json();
  return course; 
};

const SingleCursPage = () => {
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
      <SingleCursContainer course={course} />
    </section>
  );
};

export default SingleCursPage;
