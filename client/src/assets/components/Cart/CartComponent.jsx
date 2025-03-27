import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CartComponent = ({ cart, onRemove, onUpdateAddress, initialAddress }) => {
  const parsePrice = (priceStr) => {
    return parseFloat(priceStr.replace(/\./g, "").replace(",", "."));
  };

  const formatPrice = (price) => {
    return price.toLocaleString("ro-RO", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [billingAddress, setBillingAddress] = useState(initialAddress);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressInput, setAddressInput] = useState(initialAddress);

  useEffect(() => {
    setBillingAddress(initialAddress);
    setAddressInput(initialAddress);
  }, [initialAddress]);

  const totalSum = cart.items.reduce(
    (sum, item) => sum + parsePrice(item.selectedPrice),
    0
  );

  const handleAddressSave = async () => {
    await onUpdateAddress(addressInput);
    setBillingAddress(addressInput);
    setIsEditingAddress(false);
  };

  return (
    <div className="modern-cart-container">
      <h2 className="modern-cart-title">Coșul Tău</h2>

      {cart.items.length === 0 ? (
        <div className="modern-empty-cart">
          <img
            src="/images/empty-cart.svg"
            alt="Carrello Vuoto"
            className="modern-empty-cart-img"
          />
          <p>
            Coșul tău este gol! Descoperă cursurile noastre și investește în
            dezvoltarea ta profesională.
          </p>
          <Link to="/cursuri" className="modern-empty-cart-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
            Explorează Cursuri
          </Link>
        </div>
      ) : (
        <>
          <ul className="modern-cart-items">
            {cart.items.map((item) => (
              <li key={item._id} className="modern-cart-item">
                <div className="modern-item-info">
                  <img src={item.course.img} alt={item.course.title} />
                  <div className="modern-item-details">
                    <h3>{item.course.title}</h3>
                    <p>Preț: {item.selectedPrice} RON</p>
                  </div>
                </div>
                <button
                  className="modern-remove-btn"
                  onClick={() => onRemove(item._id)}
                >
                  Elimină
                </button>
              </li>
            ))}
          </ul>

          <div className="modern-cart-summary">
            <div className="modern-summary-header">
              <h3>Rezumat Comandă</h3>
            </div>
            <p className="modern-total-sum">
              Total: <strong>{formatPrice(totalSum)} RON</strong>
            </p>

            <div className="modern-form-group modern-billing-address">
              <label>Adresa de Facturare</label>
              {isEditingAddress ? (
                <div className="modern-address-edit">
                  <input
                    type="text"
                    value={addressInput}
                    onChange={(e) => setAddressInput(e.target.value)}
                  />
                  <div className="modern-form-actions">
                    <button
                      className="modern-save-btn"
                      onClick={handleAddressSave}
                    >
                      Salvează
                    </button>
                    <button
                      className="modern-cancel-btn"
                      onClick={() => setIsEditingAddress(false)}
                    >
                      Anulează
                    </button>
                  </div>
                </div>
              ) : (
                <div className="modern-address-display">
                  <div className="modern-info-value">{billingAddress}</div>
                  <div className="modern-form-actions">
                    <button
                      className="modern-edit-btn"
                      onClick={() => setIsEditingAddress(true)}
                    >
                      Modifică
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="modern-form-group modern-payment-method">
              <label>Metoda de Plată</label>
              <div className="modern-payment-options">
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="credit_card"
                    checked={paymentMethod === "credit_card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Card de Credit
                </label>
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={paymentMethod === "paypal"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  PayPal
                </label>
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank_transfer"
                    checked={paymentMethod === "bank_transfer"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Transfer Bancar
                </label>
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="revolut"
                    checked={paymentMethod === "revolut"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Revolut
                </label>
              </div>
            </div>

            <button className="modern-checkout-btn">Continuă la Plată</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartComponent;
