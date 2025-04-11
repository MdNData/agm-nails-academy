import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CartComponent = ({ cart, onRemove, onUpdateAddress, initialAddress }) => {
  const parsePrice = (priceStr) => {
    if (priceStr === "Gratis" || priceStr === "") return 0;
    const cleanedPrice = priceStr
      .replace(/\./g, "")
      .replace(",", ".")
      .replace(/[^0-9.]/g, "");
    return parseFloat(cleanedPrice) || 0;
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

  // Raggruppa gli item per categoria (utilizzando il campo item.category)
  const groupedItems = cart.items.reduce((acc, item) => {
    const cat = item.category; // "physical", "online", "product"
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  // Calcola il totale per ciascuna categoria e il totale complessivo
  const categoryTotals = {};
  let overallTotal = 0;

  Object.keys(groupedItems).forEach((category) => {
    const subtotal = groupedItems[category].reduce((sum, item) => {
      const price =
        item.selectedPrice === "Gratis" ? 0 : parsePrice(item.selectedPrice);
      return sum + price;
    }, 0);

    categoryTotals[category] = subtotal;
    overallTotal += subtotal;
  });
  
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
          {Object.entries(groupedItems).map(([category, items]) => {
            let categoryTitle = "";
            switch (category) {
              case "physical":
                categoryTitle = "Cursuri Fizice";
                break;
              case "online":
                categoryTitle = "Cursuri Online";
                break;
              case "product":
                categoryTitle = "Produse";
                break;
              default:
                categoryTitle = category;
            }
            return (
              <div key={category} className="cart-category-group">
                <h3>{categoryTitle}</h3>
                <ul className="modern-cart-items">
                  {items.map((item) => (
                    <li key={item._id} className="modern-cart-item">
                      <div className="modern-item-info">
                        {/* Usa item.itemRef con optional chaining */}
                        <img
                          src={item.itemRef?.img || "/images/placeholder.jpg"}
                          alt={
                            item.itemRef?.title || "Detalii curs indisponibile"
                          }
                        />
                        <div className="modern-item-details">
                          <h4>{item.itemRef?.title || "Titlu necunoscut"}</h4>
                          <p>
                            Preț:{" "}
                            {item.selectedPrice === "Gratis"
                              ? "0"
                              : item.selectedPrice}{" "}
                            RON
                          </p>
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
                <p className="category-total">
                  Total {categoryTitle}:{" "}
                  <strong>{formatPrice(categoryTotals[category])} RON</strong>
                </p>
              </div>
            );
          })}

          <div className="modern-cart-summary">
            <div className="modern-summary-header">
              <h3>Rezumat Comandă</h3>
            </div>
            <p className="modern-total-sum">
              Total General: <strong>{formatPrice(overallTotal)} RON</strong>
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
