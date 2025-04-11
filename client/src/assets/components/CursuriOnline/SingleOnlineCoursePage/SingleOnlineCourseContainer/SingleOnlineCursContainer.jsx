import React, { useState, useContext, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import apiFetch from "../../../../utils/apiFetch";
import { toast } from "react-toastify";
import { AuthContext } from "../../../../utils/AuthContext"; // Assicurati che il percorso sia corretto

const SingleOnlineCursContainer = ({ course }) => {
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [expandedSections, setExpandedSections] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { refreshCartItemCount } = useContext(AuthContext);

  // Imposta il prezzo di default non appena il course viene passato (e se prices esiste)
  useEffect(() => {
    if (course && course.prices && course.prices.length > 0 && !selectedPrice) {
      setSelectedPrice(course.prices[0]);
    }
  }, [course, selectedPrice]);

  // Gestione dell'aggiunta al carrello
  const handleAddToCart = async () => {
    if (!user) {
      navigate("/autentificare", { state: { from: location } });
      return;
    }

    if (!selectedPrice) {
      toast.error("Vă rugăm să selectați un preț.");
      return;
    }

    try {
      const response = await apiFetch.post("/cart", {
        courseId: course._id,
        selectedPrice,
        category: "online",
      });
      toast.success(response.data.msg || "Curs online adăugat în coș!");
      refreshCartItemCount();
    } catch (error) {
      console.error("Eroare la adăugarea în coș:", error);
      const errorMsg =
        error.response?.data?.msg || "A apărut o eroare la adăugarea în coș.";
      toast.error(errorMsg);
    }
  };

  // Gestione il cambio di prezzo
  const handlePriceChange = (e) => {
    const selected = course?.prices?.find((p) => p.value === e.target.value);
    setSelectedPrice(selected || null);
  };

  // Gestione dell'espansione delle sezioni
  const toggleExpand = (index) => {
    setExpandedSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // Se i dati del corso non sono disponibili, mostra un messaggio
  if (!course) return <div>Încărcare curs...</div>;

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

        {selectedPrice && (
          <p className="selected-price">Preț selectat: {selectedPrice.value}</p>
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
