import React from "react";
import { Link } from "react-router-dom";
import { BsBagPlus } from "react-icons/bs";

const CursContainer = ({ courses }) => {
  if (!courses || courses.length === 0) {
    return <p>Nu sunt cursuri disponibile.</p>;
  }

  return (
    <section className="curs-container">
      {courses.map((course) => (
        <article key={course._id || course.id}>
          <img src={course.img} alt={course.title} />
          <div className="titles">
            <h2>{course.title}</h2>
            {course.secondTitle && <h3>{course.secondTitle}</h3>}
            {course.thirdTitle && <h3>{course.thirdTitle}</h3>}
          </div>
          <div className="price-container">
            <p className="price">{"Nou"}</p>
            {course.price2 && <p className="price">{course.price2}</p>}
          </div>
          <Link to={`/cursuri/curs/${course._id || course.id}`}>
            Vezi mai multe informații
          </Link>
        </article>
      ))}
    </section>
  );
};

export default CursContainer;
