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

// items from localStorage
const accessToken = localStorage?.getItem("access_token");
const userEmailAccount = localStorage?.getItem("userEmail"); // users whose accounts created with email sign up
const userRole = localStorage?.getItem("userEmail"); // users whose accounts created with email sign up

// remove every stored info of user if token or email is missing
if (accessToken || userEmailAccount == false) {
  localStorage?.removeItem("access_token");
  localStorage?.removeItem("userEmail");
  localStorage?.removeItem("role");
}

// catch block function for axios
const refreshHandlingFunction = async () => {
  if (Boolean(userEmailAccount)) {
    const response = await axios.post(
      "http://localhost:3001/refresh",
      {
        email: userEmailAccount,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(response?.data);
    localStorage.setItem("access_token", response?.data?.accessToken);
  }
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
          if (Boolean(userEmailAccount)) {
            const response = await axios
              .get("http://localhost:3001/getAllProducts", {
                withCredentials: true,
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              })
              .catch(async function (err) {
                console.log("🚀 ~ file: routes.js:54 ~ loader: ~ err:", err);
                if (err?.response?.status === 403) {
                  return refreshHandlingFunction();
                }
              });
            return response || [];
          }
        },
        children: [
          {
            path: `/products/:category`,
            element: <Products />,
            errorElement: <ErrorComponent />,
            loader: async (req) => {
              if (Boolean(userEmailAccount)) {
                const response = await axios
                  .get(
                    `http://localhost:3001/getAllProductsCategoryWise/${req.params.category}`,
                    {
                      withCredentials: true,
                      headers: {
                        Authorization: `Bearer ${accessToken}`,
                      },
                    }
                  )
                  .catch(async function (err) {
                    console.log(
                      "🚀 ~ file: routes.js:80 ~ loader: ~ err:",
                      err
                    );
                    /* LOGGING USER OUT EMAIL ACCOUNT USERS ONLY, NOT GOOGLE SIGN-IN */

                    if (err?.response?.status === 403) {
                      refreshHandlingFunction();
                    }
                  });
                return response || null;
              }
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
      if (Boolean(userEmailAccount)) {
        const response = await axios
          .get("http://localhost:3001/getAllProducts", {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .catch(async function (err) {
            console.log("🚀 ~ file: routes.js:108 ~ loader: ~ err:", err);
            /* LOGGING USER OUT EMAIL ACCOUNT USERS ONLY, NOT GOOGLE SIGN-IN */
            if (err?.response?.status === 403) {
              refreshHandlingFunction();
            }
          });
        return response || [];
      }
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
      if (Boolean(userEmailAccount)) {
        const response = await axios
          .get("http://localhost:3001/adminGetUsers", {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .catch(async function (err) {
            console.log("🚀 ~ file: routes.js:139 ~ loader: ~ err:", err);
            /* LOGGING USER OUT, EMAIL ACCOUNT USERS ONLY, NOT GOOGLE SIGN-IN */
            if (err?.response?.status === 403) {
              refreshHandlingFunction();
            }
          });
        return response;
      }
    },
    errorElement: <ErrorComponent />,
  },
  { path: "/about", element: <AboutUs /> },
  { path: "/viewCart", element: <CartView /> }, // axios api called in component file
]);

export default router;
