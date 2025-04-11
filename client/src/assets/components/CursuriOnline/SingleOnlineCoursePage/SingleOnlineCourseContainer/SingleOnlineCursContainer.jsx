import React, { useState, useContext } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import apiFetch from "../../../../utils/apiFetch";
import { toast } from "react-toastify";
import { AuthContext } from "../../../../utils/AuthContext"; // Assicurati che il percorso sia corretto

const SingleOnlineCursContainer = ({ course }) => {
  // Controllo sull'esistenza del corso
  if (!course) return <div>Încărcare curs...</div>;

  // Stato per il prezzo selezionato e per le sezioni espanse
  const [selectedPrice, setSelectedPrice] = useState(course?.price || "");
  const [expandedSections, setExpandedSections] = useState([]);

  // Importa i dati utente dal contesto e i metodi di navigazione
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Handler per l'aggiunta del corso al carrello
  const handleAddToCart = async () => {
    // Se l'utente non è loggato, reindirizza alla pagina di login
    if (!user) {
      navigate("/autentificare", { state: { from: location } });
      return;
    }
    try {
      const response = await apiFetch.post("/cart", {
        courseId: course._id,
        selectedPrice,
        category: "online", // Imposta la categoria a "online" per i corsi online
      });
      toast.success(response.data.msg || "Curs online adăugat în coș!");
    } catch (error) {
      console.error("Eroare la adăugarea în coș:", error);
      const errorMsg =
        error.response?.data?.msg || "A apărut o eroare la adăugarea în coș.";
      toast.error(errorMsg);
    }
  };

  const toggleExpand = (index) => {
    setExpandedSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handlePriceChange = (e) => {
    setSelectedPrice(e.target.value);
  };

  return (
    <div className="single-curs-container">
      <img
        src={course.img || "/images/placeholder.jpg"}
        alt={course.title || "Course Image"}
      />

      <div className="curs-content">
        {course.duration && (
          <p className="duration">
            <strong>Durată:</strong> {course.duration}
          </p>
        )}

        <div className="price-selector">
          <label htmlFor="price">Alege prețul:</label>
          <select id="price" value={selectedPrice} onChange={handlePriceChange}>
            {course.price && (
              <option value={course.price}>{course.price}</option>
            )}
            {course.price2 && (
              <option value={course.price2}>{course.price2}</option>
            )}
          </select>
        </div>

        {selectedPrice && (
          <p className="selected-price">Preț selectat: {selectedPrice}</p>
        )}

        {course.elements?.length > 0 ? (
          <div className="elements">
            {course.elements.map((element, index) => (
              <div key={element.id || index} className="element-item">
                <div
                  className="element-header"
                  onClick={() => toggleExpand(index)}
                >
                  <h3>{element.title}</h3>
                  {expandedSections.includes(index) ? (
                    <FaChevronUp />
                  ) : (
                    <FaChevronDown />
                  )}
                </div>
                {expandedSections.includes(index) && (
                  <ul className="element-details">
                    {element.details?.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>Nu există informații disponibile momentan.</p>
        )}

        <div className="action-buttons">
          {course.isPurchased ? (
            <button className="btn btn-green">
              Continuă cursul ({course.progress || "0%"})
            </button>
          ) : (
            <>
              <button className="btn btn-primary" onClick={handleAddToCart}>
                Adaugă în coș
              </button>
                <Link className="btn btn-secondary" to="/cart">
                  Vezi coșul
                </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleOnlineCursContainer;
