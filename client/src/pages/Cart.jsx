import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiFetch from "../assets/utils/apiFetch";
import CartComponent from "../assets/components/Cart/CartComponent";
import { toast } from "react-toastify";
import cart_img from "../assets/images/empty-cart-3.png";

const Cart = () => {
  const [cart, setCart] = useState({ items: [] });
  const [userAddress, setUserAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCart = async () => {
    try {
      const response = await apiFetch.get("/cart");
      // Assicurati che il backend ritorni la struttura { cart: { items: [...] } }
      setCart(response.data?.cart || { items: [] });
    } catch (err) {
      console.error("Eroare la obținerea coșului:", err);
      setError("A apărut o eroare la obținerea coșului.");
      toast.error("A apărut o eroare la încărcarea coșului.");
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await apiFetch.get("/users/me");
      setUserAddress(response.data?.user?.adresa || "");
    } catch (error) {
      console.error("Eroare la obținerea datelor utilizatorului:", error);
      toast.error("A apărut o eroare la încărcarea datelor utilizatorului.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([fetchCart(), fetchUserData()]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleRemoveItem = async (itemId) => {
    try {
      await apiFetch.delete(`/cart/${itemId}`);
      await fetchCart();
      toast.success("Cursul a fost eliminat din coș!");
    } catch (error) {
      console.error("Eroare la eliminarea cursului din coș:", error);
      toast.error("A apărut o eroare la eliminarea cursului.");
    }
  };

  const updateBillingAddress = async (newAddress) => {
    try {
      await apiFetch.put("/users/me", { adresa: newAddress });
      setUserAddress(newAddress);
      toast.success("Adresa de facturare actualizată cu succes!");
      return true;
    } catch (error) {
      console.error("Eroare la actualizarea adresei de facturare:", error);
      toast.error("Eroare la actualizarea adresei de facturare.");
      return false;
    }
  };

  if (loading) {
    return (
      <div className="cart-loading">
        <div className="spinner"></div>
        <p>Se încarcă coșul tău...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cart-error">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          Încearcă din nou
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      {cart.items.length === 0 ? (
        <div className="modern-empty-cart">
          <img src={cart_img} alt="Coș gol" className="modern-empty-cart-img" />
          <h2>Coșul tău este gol</h2>
          <p>Începe să adaugi cursuri pentru a-ți îmbunătăți abilitățile!</p>
          <Link to="/cursuri" className="modern-empty-cart-btn">
            Explorează cursurile disponibile
          </Link>
        </div>
      ) : (
        <CartComponent
          cart={cart}
          onRemove={handleRemoveItem}
          onUpdateAddress={updateBillingAddress}
          initialAddress={userAddress}
        />
      )}
    </div>
  );
};

export default Cart;
