import { createBrowserRouter } from "react-router-dom";
import axios from "axios";

import Products from "../components/Products";
import Home from "../components/Home";
// import CategoriesSlide from "../components/CategoriesSlide";
// import Header from "../components/Header";
import SliderCategory from "../components/SliderCategory";
import UserLogin from "../components/UserLogin";
import UserRegister from "../components/UserRegister";
import AdminPanel from "../components/AdminPanel";
import ErrorComponent from "../components/ErrorComponent";
import UserProfile from "../components/UserProfile";
import AboutUs from "../components/AboutUs";
import CartView from "../components/CartView";

// solve http method
const refreshHandlingFunction = async () => {
  const response = await axios.post(
    "http://localhost:3001/refresh",
    {
      email: localStorage.getItem("userEmail"),
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }
  );
  console.log(response.data.accessToken, "HELLO");
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorComponent />,
    children: [
      {
        path: "/",
        element: <SliderCategory />,
        errorElement: <ErrorComponent />,
        loader: async () => {
          const response = await axios
            .get("http://localhost:3001/getAllProducts", {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
            })
            .then((response) => {
              return response;
            })
            .catch(async function (err) {
              console.log("not logged in", err?.response);
              if (err?.response?.status === 403) {
                refreshHandlingFunction();
              }
              localStorage.removeItem("userEmail");
            });
          return response || [];
        },
        children: [
          {
            path: `/products/:category`,
            element: <Products />,
            errorElement: <ErrorComponent />,
            loader: async (req) => {
              const response = await axios
                .get(
                  `http://localhost:3001/getAllProductsCategoryWise/${req.params.category}`,
                  {
                    withCredentials: true,
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem(
                        "access_token"
                      )}`,
                    },
                  }
                )
                .then((response) => {
                  return response;
                })
                .catch(async function (err) {
                  console.log(err.response.status);
                  /* LOGGING USER OUT EMAIL ACCOUNT USERS ONLY, NOT GOOGLE SIGN-IN */

                  if (err?.response?.status === 403) {
                    refreshHandlingFunction();
                  }
                  localStorage.removeItem("userEmail");
                });
              return response || null;
            },
          },
        ],
      },
    ],
  },

  {
    path: "/products",
    element: <Products />,
    errorElement: <ErrorComponent />,
    loader: async () => {
      const response = await axios
        .get("http://localhost:3001/getAllProducts", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then((response) => {
          return response;
        })
        .catch(async function (err) {
          console.log(err.response.status);
          /* LOGGING USER OUT EMAIL ACCOUNT USERS ONLY, NOT GOOGLE SIGN-IN */
          if (err?.response?.status === 403) {
            refreshHandlingFunction();
            localStorage.removeItem("userEmail");
          }
        });
      return response;
    },
  },
  {
    path: "/userLogin",
    element: <UserLogin />,
  },
  {
    path: "/userRegister",
    element: <UserRegister />,
  },
  {
    path: "/adminOnly",
    element: <AdminPanel />,
    loader: async () => {
      const response = await axios
        .get("http://localhost:3001/adminGetUsers", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .catch(async function (err) {
          console.log(err.response.status);
          window.alert("You are logged out now!");
          /* LOGGING USER OUT, EMAIL ACCOUNT USERS ONLY, NOT GOOGLE SIGN-IN */
          if (err?.response?.status === 403) {
          }
          localStorage.removeItem("userEmail");
        });
      return response;
    },
    errorElement: <ErrorComponent />,
  },
  { path: "/about", element: <AboutUs /> },
  { path: "/viewCart", element: <CartView /> }, // axios api call in component file
]);

export default router;
