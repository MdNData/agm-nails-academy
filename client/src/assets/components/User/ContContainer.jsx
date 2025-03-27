import React from "react";

const ContContainer = ({
  formData,
  editingSection,
  handleChange,
  handleSubmit,
  handleCancel,
  loading,
  startEditing,
  handleLogout,
}) => {
  return (
    <div className="account-sections">
      {/* Sezione Dati Cont */}
      <section className="account-section">
        <div className="section-header">
          <h3>Informații Cont</h3>
          {editingSection !== "account" && (
            <button
              className="edit-btn"
              onClick={() => startEditing("account")}
            >
              Editează
            </button>
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Adresă Email</label>
            {editingSection === "account" ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            ) : (
              <div className="info-value">{formData.email}</div>
            )}
          </div>

          <div className="form-group">
            <label>Nume complet</label>
            {editingSection === "account" ? (
              <input
                type="text"
                name="nume"
                value={formData.nume}
                onChange={handleChange}
              />
            ) : (
              <div className="info-value">{formData.nume}</div>
            )}
          </div>

          <div className="form-group">
            <label>Telefon</label>
            {editingSection === "account" ? (
              <input
                type="text"
                name="telefon"
                value={formData.telefon}
                onChange={handleChange}
              />
            ) : (
              <div className="info-value">{formData.telefon}</div>
            )}
          </div>

          {editingSection === "account" && (
            <div className="form-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={handleCancel}
                disabled={loading}
              >
                Anulează
              </button>
              <button type="submit" className="save-btn" disabled={loading}>
                {loading ? "Salvare..." : "Salvează"}
              </button>
            </div>
          )}
        </form>
      </section>

      {/* Sezione Adresă Facturare */}
      <section className="account-section">
        <div className="section-header">
          <h3>Adresă Facturare</h3>
          {editingSection !== "billing" && (
            <button
              className="edit-btn"
              onClick={() => startEditing("billing")}
            >
              Editează
            </button>
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Adresă</label>
            {editingSection === "billing" ? (
              <textarea
                name="adresa"
                value={formData.adresa}
                onChange={handleChange}
                rows="3"
              />
            ) : (
              <div className="info-value">
                {formData.adresa || "Nicio adresă introdusă"}
              </div>
            )}
          </div>

          {editingSection === "billing" && (
            <div className="form-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={handleCancel}
                disabled={loading}
              >
                Anulează
              </button>
              <button type="submit" className="save-btn" disabled={loading}>
                {loading ? "Salvare..." : "Salvează"}
              </button>
            </div>
          )}
        </form>
      </section>

      {/* Alte sezioni */}
      <section className="account-section">
        <div className="section-header">
          <h3>Istoric Facturi</h3>
        </div>
        <div className="placeholder-section">
          ⏳ Momentan nu există facturi emise
        </div>
      </section>

      <section className="account-section">
        <div className="section-header">
          <h3>Cursuri Active</h3>
        </div>
        <div className="placeholder-section">
          🎓 Nu sunteți înscris în niciun curs momentan
        </div>
      </section>

      <button className="logout-btn" onClick={handleLogout}>
        Deconectare
      </button>
    </div>
  );
};

export default ContContainer;
