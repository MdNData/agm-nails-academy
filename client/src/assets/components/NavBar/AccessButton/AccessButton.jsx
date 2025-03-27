import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { AuthContext } from "../../../utils/AuthContext";

const AccessButton = ({ width }) => {
  const { user } = useContext(AuthContext);
  const destination = user ? "/cont" : "/autentificare";

  return (
    <div className="auth-button">
      <Link to={destination}>
        <FiUser />
        {width > 799 ? <span>Contul Meu</span> : ""}
      </Link>
    </div>
  );
};

export default AccessButton;
