import React, { useState, useContext } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { Link, useNavigate, useLocation } from "react-router-dom";
import apiFetch from "../../../../utils/apiFetch";
import { toast } from "react-toastify";
import { AuthContext } from "../../../../utils/AuthContext";

const SingleCursContainer = ({ course }) => {
  const [openDescription, setOpenDescription] = useState({});
  const [selectedPrice, setSelectedPrice] = useState(
    course?.prices?.[0] || null
  );
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { refreshCartItemCount } = useContext(AuthContext);

  const handleAddToCart = async () => {
    if (!user) {
      navigate("/autentificare", { state: { from: location } });
      return;
    }

    try {
      const response = await apiFetch.post("/cart", {
        courseId: course._id,
        selectedPrice,
        category: "physical",
      });
      toast.success(response.data.msg || "Curs adăugat în coș!");
      refreshCartItemCount();
    } catch (error) {
      console.error("Eroare la adăugarea în coș:", error);
      const errorMsg =
        error.response?.data?.msg || "A apărut o eroare la adăugarea în coș.";
      toast.error(errorMsg);
    }
  };

  const toggleDescription = (index, subIndex = null) => {
    setOpenDescription((prev) => {
      const newState = { ...prev };
      if (subIndex === null) {
        newState[index] = !prev[index];
      } else {
        newState[`${index}-${subIndex}`] = !prev[`${index}-${subIndex}`];
      }
      return newState;
    });
  };

  const handlePriceChange = (event) => {
    const selected = course.prices.find((p) => p.value === event.target.value);
    setSelectedPrice(selected || null);
  };

  if (!course || !Array.isArray(course.elements)) {
    return <p>Dettagli del corso non disponibili.</p>;
  }

  return (
    <article className="single-curs-container">
      <img src={course.img} alt={course.title} style={{ width: "100%" }} />

      <div className="curs-content">
        <div className="price-selector">
          <label htmlFor="price">Alege prețul:</label>
          <select
            id="price"
            value={selectedPrice?.value || ""}
            onChange={handlePriceChange}
          >
            {course.prices?.map((priceObj, index) => {
              const label = `${priceObj.value} RON - ${priceObj.days} zile - ${
                priceObj.accreditation ? "cu acreditare" : "fără acreditare"
              }`;

              return (
                <option key={index} value={priceObj.value}>
                  {label}
                </option>
              );
            })}
          </select>
        </div>

        {course.elements.map((data, index) => (
          <div key={index} className="element-item">
            <div
              className="element-header"
              onClick={() => toggleDescription(index)}
            >
              <h3>{data.title}</h3>
              {openDescription[index] ? (
                <MdKeyboardArrowUp />
              ) : (
                <MdKeyboardArrowDown />
              )}
            </div>

            {openDescription[index] && (
              <ul className="element-details">
                {data.details?.map((desc, i) => (
                  <li key={i}>
                    <span className="circle"></span> {desc}
                  </li>
                ))}

                {data.days?.map((day, j) => (
                  <div key={j}>
                    <div
                      className="element-sub-header"
                      onClick={() => toggleDescription(index, j)}
                    >
                      <h4>{day.title}</h4>
                      {openDescription[`${index}-${j}`] ? (
                        <MdKeyboardArrowUp />
                      ) : (
                        <MdKeyboardArrowDown />
                      )}
                    </div>

                    {openDescription[`${index}-${j}`] && (
                      <ul className="sub-element-details">
                        {day.lista?.map((lesson, k) => (
                          <li key={k}>
                            <span className="circle"></span> {lesson}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </ul>
            )}
          </div>
        ))}

        <div className="action-buttons">
          <button className="btn btn-primary" onClick={handleAddToCart}>
            Adaugă în coș
          </button>
          <a
            href="https://api.whatsapp.com/send?phone=40770541506&text=Bun%C4%83%2C%20sunt%20interesat%C4%83%20la%20"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            Sau întreabă-mă pe WhatsApp
          </a>
          <Link className="btn btn-secondary" to="/cart">
            Vezi coșul
          </Link>
        </div>
      </div>
    </article>
  );
};

export default SingleCursContainer;
