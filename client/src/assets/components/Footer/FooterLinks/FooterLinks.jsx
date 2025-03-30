import { Link } from "react-router-dom";
import imgSol from "../../../images/anpc-sol.webp";
import imgSal from "../../../images/anpc-sal.webp";

const FooterLinks = () => {
  return (
    <div className="footer-links">
      <div>
        <h3>Academy</h3>
        <Link to="/cursuri">Cursuri Fisice</Link>
        <Link to="/cursuri-online">Cursuri Online</Link>
        <Link to="/produse">Produse</Link>
        <Link to="/contact">Contact</Link>
        <a href="https://ec.europa.eu/consumers/odr" target="_blank">
          <img src={imgSol} alt="" />
        </a>
      </div>
      <div>
        <h3>Link-uri utile</h3>
        <Link to="/termeni">Termeni și condiții</Link>
        <Link to="/inscriere">Politică de înscriere</Link>
        <Link to="/retur">Politică de returnare</Link>
        <Link to="/plata">Politică de plată</Link>
        <Link to="/confidentialitate">Confidențialitate</Link>
        <a href="https://anpc.ro/ce-este-sal/" target="_blank">
          <img src={imgSal} alt="" />
        </a>
      </div>
    </div>
  );
};
export default FooterLinks;
