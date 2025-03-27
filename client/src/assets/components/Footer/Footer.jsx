import Credits from "./Credits/Credits";
import FooterContact from "./FooterContact/FooterContact";
import FooterHeader from "./FooterHeader/FooterHeader";
import FooterLinks from "./FooterLinks/FooterLinks";
import Socials from "./Socials/Socials";

const Footer = () => {
  return (
    <footer>
      <FooterHeader />
      <Socials />
      <FooterLinks />
      <FooterContact />
      <Credits />
    </footer>
  );
};
export default Footer;
