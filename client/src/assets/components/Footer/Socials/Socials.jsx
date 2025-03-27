import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";

const Socials = () => {
  return (
    <div className="footer-socials">
      <a href="https://www.facebook.com/gabriela.chic.agm" target="_blank">
        <FaFacebookF />
      </a>
      <a
        href="https://www.instagram.com/gabriela_agm_naileducator"
        target="_blank"
      >
        <FaInstagram />
      </a>
      <a href="https://www.tiktok.com/@agm.nailtrainer" target="_blank">
        <FaTiktok />
      </a>

      <a
        href="https://api.whatsapp.com/send?phone=40770541506&text=Bun%C4%83%2C%20sunt%20interesat%C4%83%20la%20"
        target="_blank"
      >
        <FaWhatsapp />
      </a>
    </div>
  );
};
export default Socials;
