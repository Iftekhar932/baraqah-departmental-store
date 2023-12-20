import { createBrowserRouter } from "react-router-dom";
import axios from "axios";

// components
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

// error components
import ProductsError from "../components/ProductsError";
import ErrorComponent from "../components/ErrorComponent";

// items from localStorage
/* const accessToken = localStorage?.getItem("access_token");
const userEmailAccount = localStorage.getItem("userEmail"); // users whose accounts created with email sign up */

// used "Promise" to use localStorage in asynchronous way(used in "JWTExpiryHandlerFunction")
function getItemAsync(key) {
  return new Promise((resolve) => {
    const value = localStorage.getItem(key);
    resolve(value);
  });
}

async function refreshAsync(key) {}

// * function to call api of refreshToken
const refreshHandlingFunction = async (url) => {
  const accessToken = await getItemAsync("access_token");
  const userEmailAccount = await getItemAsync("userEmail");
  try {
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
    // replacing the old token with the new one in localStorage
    localStorage.setItem("access_token", response?.data?.accessToken);
    await JWTExpiryHandlerFunction(url);
    // return response; // ! see if it causes any problems
  } catch (err) {
    console.log(err);
  }
};

//* when jwt expires it'll invoke "refreshTokenHandlingFunction" above or it'll handle response
async function JWTExpiryHandlerFunction(url) {
  const accessToken = await getItemAsync("access_token");
  if (!accessToken) {
    return;
  }

  const response = await axios
    .get(url, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .catch(async function (err) {
      console.log(
        "🚀 ~ file: routes.js:71 ~ JWTExpiryHandlerFunction ~ err:",
        err.response,
        err.response.status
      );
      if (err?.response?.status === 403) {
        return await refreshHandlingFunction(url);
      }
    });

  // console.log("line 84", response);
  console.log("line 84");
  return response;
}

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
                errorElement: <ProductsError />,
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
        errorElement: <ErrorComponent />,
      },
      {
        path: "/userRegister",
        element: <UserRegister />,
        errorElement: <ErrorComponent />,
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
