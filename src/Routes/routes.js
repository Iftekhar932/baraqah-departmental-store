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
            .catch(async function (err) {
              // !ATTENTION , i was removing email from localStorage, many other features are dependent on that,now i have to find out if i can first send the email to server then remove the email from localStorage during logout or jwt expiry
              // !ATTENTION , i was removing email from localStorage, many other features are dependent on that,now i have to find out if i can first send the email to server then remove the email from localStorage during logout or jwt expiry
              // !ATTENTION , i was removing email from localStorage, many other features are dependent on that,now i have to find out if i can first send the email to server then remove the email from localStorage during logout or jwt expiry
              // !ATTENTION , i was removing email from localStorage, many other features are dependent on that,now i have to find out if i can first send the email to server then remove the email from localStorage during logout or jwt expiry
              console.log(localStorage.getItem("userEmail"));
              console.log("not logged in", err?.response);
              if (err?.response?.status === 403) {
                await axios.post(
                  "http://localhost:3001/refresh",
                  {
                    email: localStorage.getItem("userEmail"),
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem(
                        "access_token"
                      )}`,
                    },
                  }
                );
              }
            });
          return response || null;
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
                .catch(function (err) {
                  console.log(err.response.status);
                  /* LOGGING USER OUT EMAIL ACCOUNT USERS ONLY, NOT GOOGLE SIGN-IN */

                  if (err.response.status == 403)
                    localStorage.setItem("access_token", null);
                  // localStorage.removeItem("userEmail");
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
        .catch(function (err) {
          console.log(err.response.status);
          /* LOGGING USER OUT EMAIL ACCOUNT USERS ONLY, NOT GOOGLE SIGN-IN */
          if (err.response.status == 403)
            localStorage.setItem("access_token", null);
          // localStorage.removeItem("userEmail");
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
        .catch(function (err) {
          console.log(err.response.status);
          window.alert("You are logged out now!");
          /* LOGGING USER OUT, EMAIL ACCOUNT USERS ONLY, NOT GOOGLE SIGN-IN */
          if (err.response.status == 403)
            localStorage.setItem("access_token", null);
          // localStorage.removeItem("userEmail");
        });
      return response;
    },
    errorElement: <ErrorComponent />,
  },
  {
    path: "/userProfile",
    element: <UserProfile />,
    loader: async () => {
      const response = await axios
        .get("http://localhost:3001/getAllUsers")
        .catch(function (err) {
          console.log(err.response.status);
          /* LOGGING USER OUT EMAIL ACCOUNT USERS ONLY, NOT GOOGLE SIGN-IN */

          if (err.response.status == 403)
            localStorage.setItem("access_token", null);
          // localStorage.removeItem("userEmail");
        });
      return response || [];
    },
  },
  { path: "/about", element: <AboutUs /> },
  { path: "/viewCart", element: <CartView /> }, // axios api call in component file
]);

export default router;
