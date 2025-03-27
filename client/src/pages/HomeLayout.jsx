import { Outlet } from "react-router-dom";
import ScrollToTop from "../assets/utils/ScrollToTop";
import NavBar from "../assets/components/NavBar/NavBar";
import Footer from "../assets/components/Footer/Footer";

const HomeLayout = () => {
  return (
    <ScrollToTop>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </ScrollToTop>
  );
};
export default HomeLayout;
