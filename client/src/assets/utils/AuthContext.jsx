import React, { createContext, useState, useEffect } from "react";
import apiFetch from "./apiFetch.js";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartItemCount, setCartItemCount] = useState(null);

  const checkLogin = async () => {
    try {
      const response = await apiFetch.get("/access/verify");
      setUser(response.data.user);
      if (response.data.user) {
        const countResponse = await apiFetch.get("/cart/item-count");
        setCartItemCount(countResponse.data.itemCount);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await apiFetch.post("/access/logout");
      setUser(null);
    } catch (error) {
      console.error("Eroare la deconectare:", error);
    }
  };

  // Funzione per aggiornare il contatore del carrello
  const refreshCartItemCount = async () => {
    try {
      const response = await apiFetch.get("/cart/item-count");
      setCartItemCount(response.data.itemCount);
    } catch (error) {
      console.error("Erroare la actualizarea contorului de coș:", error);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        logout,
        cartItemCount,
        setCartItemCount,
        refreshCartItemCount, // rendiamo disponibile la funzione
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
