import React, { useState, useContext } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { Link, useNavigate, useLocation } from "react-router-dom";
import apiFetch from "../../../../utils/apiFetch";
import { toast } from "react-toastify";
import { AuthContext } from "../../../../utils/AuthContext"; // Importa il contesto

const SingleCursContainer = ({ course }) => {
  const [openDescription, setOpenDescription] = useState({});
  const [selectedPrice, setSelectedPrice] = useState(course.price);
  const { user } = useContext(AuthContext); // Stato dell'utente
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddToCart = async () => {
    // Se l'utente non è loggato, reindirizza alla pagina di login.
    if (!user) {
      navigate("/autentificare", { state: { from: location } });
      return;
    }

    // Se l'utente è loggato, procedi con l'aggiunta al carrello.
    try {
      const response = await apiFetch.post("/cart", {
        courseId: course._id,
        selectedPrice,
      });
      toast.success(response.data.msg || "Curs adăugat în coș!");
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
    setSelectedPrice(event.target.value);
  };

  if (!course || !course.elements || !Array.isArray(course.elements)) {
    return <p>Dettagli del corso non disponibili.</p>;
  }

  return (
    <article>
      <img src={course.img} alt={course.title} style={{ width: "100%" }} />
      {course.elements.map((data, index) => (
        <div key={index}>
          <h3 onClick={() => toggleDescription(index)}>
            {data.title}
            <span>
              {openDescription[index] ? (
                <MdKeyboardArrowUp />
              ) : (
                <MdKeyboardArrowDown />
              )}
            </span>
          </h3>
          {openDescription[index] && (
            <ul>
              {data.details &&
                data.details.map((description, i) => (
                  <li key={i}>
                    <span className="circle"></span>
                    {description}
                  </li>
                ))}
              {data.days &&
                data.days.map((day, j) => (
                  <div key={j}>
                    <h3 onClick={() => toggleDescription(index, j)}>
                      {day.title}
                      <span>
                        {openDescription[`${index}-${j}`] ? (
                          <MdKeyboardArrowUp />
                        ) : (
                          <MdKeyboardArrowDown />
                        )}
                      </span>
                    </h3>
                    {openDescription[`${index}-${j}`] && (
                      <ul>
                        {day.lista.map((lesson, k) => (
                          <li key={k}>
                            <span className="circle"></span>
                            {lesson}
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
      <section className="curs-prices">
        <div>
          <h3>Selectează opțiunea de preț:</h3>
          <label htmlFor="price1">
            <input
              type="radio"
              id="price1"
              name="price"
              value={course.price}
              checked={selectedPrice === course.price}
              onChange={handlePriceChange}
            />
            {course.price}
          </label>
          <label htmlFor="price2">
            <input
              type="radio"
              id="price2"
              name="price"
              value={course.price2}
              checked={selectedPrice === course.price2}
              onChange={handlePriceChange}
            />
            {course.price2}
          </label>
        </div>
      </section>
      <section className="buttons">
        <button onClick={handleAddToCart}>Adaugă în coș</button>
        <a
          href="https://api.whatsapp.com/send?phone=40770541506&text=Bun%C4%83%2C%20sunt%20interesat%C4%83%20la%20"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sau întreabă-mă pe WhatsApp
        </a>
        <Link to="/cart">Vezi coșul</Link>
      </section>
    </article>
  );
};

export default SingleCursContainer;
