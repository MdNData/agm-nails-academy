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
import ProtectedRoute from "../assets/utils/ProtectedRoute";
import GuestRoute from "../assets/utils/GuestRoute";
import Cart from "./Cart";

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
        element: "cursuri online",
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
    ],
  },

  {
    path: "*",
    element: <Error />,
  },
]);
