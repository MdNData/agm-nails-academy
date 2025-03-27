import React from "react";
import { FaMapMarkerAlt, FaClock, FaPhone, FaEnvelope } from "react-icons/fa";

const ContactComponent = () => {
  const mapUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2878.2450746825436!2d28.634015315508517!3d44.20214487911085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40bae52a7c3c9731%3A0x5a9e6790a6cee6f7!2sStrada%20Farului%2019%2C%20Constan%C8%9Ba!5e0!3m2!1sen!2sro!4v1717019277468!5m2!1sen!2sro";

  return (
    <section className="contact-container">
      <div className="contact-header">
        <h1>Contactează-ne</h1>
        <p>Avem mereu timp pentru clienții noștri!</p>
      </div>

      <div className="contact-grid">
        <div className="contact-info">
          {/* <div className="info-card">
            <div className="icon-box">
              <FaMapMarkerAlt className="icon" />
            </div>
            <div>
              <h3>Locație</h3>
              <p>Str. Farului Nr. 19, Constanța</p>
              <small>Cod Poștal: 900000</small>
            </div>
          </div> */}

          <div className="info-card">
            <div className="icon-box">
              <FaClock className="icon" />
            </div>
            <div>
              <h3>Program</h3>
              <p>Luni - Duminică: 09:00 - 18:00</p>
              <div className="highlight-box">Non-stop</div>
            </div>
          </div>

          <div className="info-card">
            <div className="icon-box">
              <FaPhone className="icon" />
            </div>
            <div>
              <h3>Telefon</h3>
              <a href="tel:+40770541506" className="contact-link">
                +40 770 541 506
              </a>
            </div>
          </div>

          <div className="info-card">
            <div className="icon-box">
              <FaEnvelope className="icon" />
            </div>
            <div>
              <h3>Email</h3>
              <a href="mailto:agmirica1@gmail.com" className="contact-link">
                agmirica1@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* <div className="map-container">
          <div
            className="map-wrapper"
            onClick={() =>
              window.open("https://goo.gl/maps/9J9Z7QZ9Z9Z9Z9Z9A", "_blank")
            }
          >
            <iframe
              title="Google Maps"
              src={mapUrl}
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default ContactComponent;
