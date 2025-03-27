import React, { useState, useEffect, useContext } from "react";
import apiFetch from "../assets/utils/apiFetch";
import { AuthContext } from "../assets/utils/AuthContext";
import TopTitle from "../assets/components/AboutMe/Introduction/TopTitle/TopTitle";
import ContContainer from "../assets/components/User/ContContainer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cont = () => {
  const { user, setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    nume: "",
    telefon: "",
    adresa: "",
  });
  const [initialFormData, setInitialFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [sectionInitialData, setSectionInitialData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiFetch.get("/users/me");
        if (response.data?.user) {
          setUser(response.data.user);
        }
      } catch (error) {
        toast.error("Error loading user data");
        console.error(error);
      }
    };
    fetchUserData();
  }, [setUser]);

  useEffect(() => {
    if (user) {
      const newData = {
        email: user.email || "",
        nume: user.nume || "",
        telefon: user.telefon || "",
        adresa: user.adresa || "",
      };
      setFormData(newData);
      setInitialFormData(newData);
    }
  }, [user]);

  const startEditing = (section) => {
    const dataToSave = {};
    switch (section) {
      case "account":
        dataToSave.email = formData.email;
        dataToSave.nume = formData.nume;
        dataToSave.telefon = formData.telefon;
        break;
      case "billing":
        dataToSave.adresa = formData.adresa;
        break;
    }
    setSectionInitialData(dataToSave);
    setEditingSection(section);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await apiFetch.put("/users/me", formData);
      if (response.data?.user) {
        setUser(response.data.user);
        toast.success("Date actualizate cu succes!");
        setEditingSection(null);
      }
    } catch (error) {
      toast.error("Eroare la actualizare");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData((prev) => ({ ...prev, ...sectionInitialData }));
    setEditingSection(null);
  };

  

  const handleLogout = async () => {
    try {
      await apiFetch.post("/access/logout");
      setUser(null);
      toast.success("Te-ai deconectat cu succes!");
      navigate("/login");
    } catch (error) {
      toast.error("Eroare la deconectare");
      console.error(error);
    }
  };

  return (
    <section className="cont-container">
      <TopTitle
        first="Contul Meu"
        second="💫 Bine ai revenit în contul tău! 💫"
      />
      <ContContainer
        formData={formData}
        editingSection={editingSection}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        loading={loading}
        startEditing={startEditing}
        handleLogout={handleLogout}
      />
    </section>
  );
};

export default Cont;
