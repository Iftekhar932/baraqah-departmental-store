import { createBrowserRouter } from "react-router-dom";
import axios from "axios";

import Products from "../components/Products";
import Home from "../components/Home";
import SliderCategory from "../components/SliderCategory";
import UserLogin from "../components/UserLogin";
import UserRegister from "../components/UserRegister";
import AdminPanel from "../components/AdminPanel";
import AboutUs from "../components/AboutUs";
import CartView from "../components/CartView";
import Main from "../components/Main";
import ForgotPasswordForm from "../components/ForgotPasswordForm";

import ProductsError from "../components/ProductsError";
import ErrorComponent from "../components/ErrorComponent";

// items from localStorage
const accessToken = localStorage?.getItem("access_token");
const userEmailAccount = localStorage.getItem("userEmail"); // users whose accounts created with email sign up
const userRole = localStorage?.getItem("userEmail"); // users whose accounts created with email sign up

// function to call api of refreshToken
const refreshHandlingFunction = async () => {
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
  return response;
};

// promise to use localStorage in asynchronous way(used in "JWTExpiryHandlerFunction")
function getItemAsync(key) {
  return new Promise((resolve) => {
    const value = localStorage.getItem(key);
    resolve(value);
  });
}

// when jwt expires it'll invoke "refreshTokenHandlingFunction" above or it'll handle response
const JWTExpiryHandlerFunction = async (url) => {
  const token = await getItemAsync("access_token");

  const response = await axios
    .get(url, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch(async function (err) {
      console.log(
        "🚀 ~ file: routes.js:65 ~ JWTExpiryHandlerFunction ~ err:",
        err
      );
      if (err?.response?.status === 403) {
        return await refreshHandlingFunction();
      }
    });
  console.log("line 73", response);
  return response;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorComponent />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <ErrorComponent />,
        children: [
          {
            path: "/",
            element: <SliderCategory />,
            errorElement: <ProductsError />,
            loader: async () => {
              return await JWTExpiryHandlerFunction(
                "http://localhost:3001/getAllProducts"
              );
            },
            children: [
              {
                path: "/products/:category",
                element: <Products />,
                errorElement: <ErrorComponent />,
                loader: async (req) => {
                  return await JWTExpiryHandlerFunction(
                    `http://localhost:3001/getAllProductsCategoryWise/${req.params.category}`
                  );
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
          return await JWTExpiryHandlerFunction(
            "http://localhost:3001/getAllProducts"
          );
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
          return await JWTExpiryHandlerFunction(
            "http://localhost:3001/adminGetUsers"
          );
        },
        errorElement: <ErrorComponent />,
      },

      { path: "/forgotPassword", element: <ForgotPasswordForm /> },
      { path: "/about", element: <AboutUs /> },
      { path: "/viewCart", element: <CartView /> }, // axios api called in component file "axios.get()" that uses productsID to get a single product
    ],
  },
]);

export default router;
