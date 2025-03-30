import React from "react";
import { useRouteLoaderData } from "react-router-dom";
import TopTitle from "../assets/components/AboutMe/Introduction/TopTitle/TopTitle";
import OnlineCoursesContainer from "../assets/components/CursuriOnline/OnlineCoursesContainer/OnlineCoursesContainer";

export const loader = async () => {
  const response = await fetch("/api/cursuri-online");
  if (!response.ok) {
    throw new Response("Nu s-au putut prelua cursurile online", {
      status: response.status,
    });
  }
  const data = await response.json();
  return data;
};

const OnlineCourses = () => {
  const courses = useRouteLoaderData("cursuri-online");
  return (
    <section className="cursuri-online">
      <header>
        <TopTitle first="Cursuri Online" second="Accesibile oriunde" />
      </header>
      <OnlineCoursesContainer courses={courses} />
    </section>
  );
};

export default OnlineCourses;
