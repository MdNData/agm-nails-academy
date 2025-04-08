import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const SingleOnlineCursContainer = ({ course }) => {
  // Aggiungi controllo sull'esistenza dell'oggetto course
  if (!course) return <div>Încărcare curs...</div>;

  // Modifica lo stato iniziale con valori di fallback
  const [selectedPrice, setSelectedPrice] = useState(course?.price || "");
  const [expandedSections, setExpandedSections] = useState([]);

  const toggleExpand = (index) => {
    setExpandedSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="single-curs-container">
      <img
        src={course.img || "/images/placeholder.jpg"}
        alt={course.title || "Course Image"}
      />

      <div className="curs-content">
        {/* Aggiungi controllo sulla durata */}
        {course.duration && (
          <p className="duration">
            <strong>Durată:</strong> {course.duration}
          </p>
        )}

        {/* Modifica il price selector con controlli di sicurezza */}
        <div className="price-selector">
          <label htmlFor="price">Alege prețul:</label>
          <select
            id="price"
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
          >
            {course.price && (
              <option value={course.price}>{course.price}</option>
            )}
            {course.price2 && (
              <option value={course.price2}>{course.price2}</option>
            )}
          </select>
        </div>

        {/* Aggiungi condizione per il prezzo selezionato */}
        {selectedPrice && (
          <p className="selected-price">Preț selectat: {selectedPrice}</p>
        )}

        {/* Modifica il rendering degli elementi con controlli aggiuntivi */}
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

        {/* Modifica i pulsanti con controlli aggiuntivi */}
        <div className="action-buttons">
          {course.isPurchased ? (
            <button className="btn btn-green">
              Continuă cursul ({course.progress || "0%"})
            </button>
          ) : (
            <>
              <button className="btn btn-primary">
                Achiziționează cursul - {selectedPrice}
              </button>
              <button className="btn btn-secondary">Adaugă în coș</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleOnlineCursContainer;
