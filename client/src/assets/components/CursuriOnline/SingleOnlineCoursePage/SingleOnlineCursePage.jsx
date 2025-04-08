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
  const course = await response.json();
  return course.data;
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
