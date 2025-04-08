import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "./HomeLayout";
import Home from "./Home";
import Cursuri from "./Cursuri";
import Servicii from "./Servicii";
import Produse from "./Produse";
import Contact from "./Contact";
import Autentificare from "./Autentificare";
import Inregistrare from "./Inregistrare";
import Error from "./Error";
import Cont from "./Cont";
import AboutMe from "./AboutMe";
import Shop from "./Shop";
import SingleCursPage from "../assets/components/Cursuri/SingleCursPage/SingleCursPage";
import { action as registerAction } from "./Inregistrare";
import { loader as courseLoader } from "./Cursuri";
import { loader as singleCourseLoader } from "../assets/components/Cursuri/SingleCursPage/SingleCursPage";
import { action as loginAction } from "./Autentificare";
import { loader as onlineCourseLoader } from "./CursuriOnline";
import { loader as onlineSingleCourseLoader } from "../assets/components/CursuriOnline/SingleOnlineCoursePage/SingleOnlineCursePage";
import ProtectedRoute from "../assets/utils/ProtectedRoute";
import GuestRoute from "../assets/utils/GuestRoute";
import Cart from "./Cart";
import CursuriOnline from "./CursuriOnline";
import Termeni from "../assets/components/Terms/Termeni";
import PoliticaInscriere from "../assets/components/Terms/PoliticaInscriere";
import PoliticaReturnare from "../assets/components/Terms/PoliticaReturnare";
import PoliticaPlata from "../assets/components/Terms/PoliticaPlata";
import Confidentialitate from "../assets/components/Terms/Confidentialitate";
import SingleOnlineCursePage from "../assets/components/CursuriOnline/SingleOnlineCoursePage/SingleOnlineCursePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "cursuri",
        id: "cursuri",
        loader: courseLoader,
        children: [
          {
            index: true,
            element: <Cursuri />,
          },
          {
            path: "curs/:id",
            element: <SingleCursPage />,
            loader: singleCourseLoader,
          },
        ],
      },
      {
        path: "cursuri-online",
        id: "cursuri-online",
        loader: onlineCourseLoader,
        children: [
          {
            index: true,
            element: <CursuriOnline />,
          },
          {
            path: "curs/:id",
            element: <SingleOnlineCursePage />,
            loader: onlineSingleCourseLoader,
          },
        ],
      },
      {
        path: "servicii",
        element: <Servicii />,
      },
      {
        path: "produse",
        element: <Produse />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "autentificare",
        element: (
          <GuestRoute>
            <Autentificare />
          </GuestRoute>
        ),
        action: loginAction,
      },
      {
        path: "register",
        element: (
          <GuestRoute>
            <Inregistrare />
          </GuestRoute>
        ),
        action: registerAction,
      },
      {
        path: "cont",
        element: (
          <ProtectedRoute>
            <Cont />
          </ProtectedRoute>
        ),
      },
      {
        path: "about-me",
        element: <AboutMe />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "termeni",
        element: <Termeni />,
      },
      {
        path: "inscriere",
        element: <PoliticaInscriere />,
      },
      {
        path: "retur",
        element: <PoliticaReturnare />,
      },
      {
        path: "plata",
        element: <PoliticaPlata />,
      },
      {
        path: "confidentialitate",
        element: <Confidentialitate />,
      },
    ],
  },

  {
    path: "*",
    element: <Error />,
  },
]);
