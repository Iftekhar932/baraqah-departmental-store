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

// * function to call api of refreshToken, setting new token in localStorage and then re-invoke "jwtExpiryFunction" & the outcome/response that is returned from that function is finally "return" returned from this function - happens only if access_token is expired
//  this function is imported in "CartView.jsx" and "Product.jsx" component */
export const refreshHandlingFunction = async (url, flag, separateFlag) => {
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

    console.log(
      "🚀 ~ file: routes.js:40 ~ refreshHandlingFunction ~ response:",
      response
    );
    // replacing the old token with the new one in localStorage
    await setItemAsync("access_token", response?.data?.accessToken);
    // "separateFlag" is set to "true" when argument is sent from the components where this function is invoked/called
    if (separateFlag === true) {
      console.log(
        "🚀 ~ file: routes.js:47 ~ refreshHandlingFunction ~ separateFlag:",
        flag
      );
      return;
    } else return await JWTExpiryHandlerFunction(url);
  } catch (err) {
    console.log(
      "✨ 🌟  refreshHandlingFunction  err 47:",
      err?.response,
      err?.response?.status,
      err?.response?.data?.refreshTokenExpiry
    );
    if (err?.response?.data?.refreshTokenExpiry == true) {
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userProducts");
      localStorage.removeItem("access_token");
      localStorage.removeItem("role");
    }
  }
};

//* when jwt expires it'll invoke "refreshTokenHandlingFunction" above or it'll handle response - when access_token expires the "return" keyword is returning response and returned again to the refreshHandlingFunction
async function JWTExpiryHandlerFunction(url, flag) {
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
        "🚀 ~ file: routes.js:82 ~ JWTExpiryHandlerFunction ~ err:",
        // err?.response,
        err?.response?.status,
        err?.response?.data,
        err?.data?.refreshTokenExpiry,
        flag
      );

      if (err?.data?.refreshTokenExpiry == true) {
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userProducts");
        localStorage.removeItem("access_token");
        localStorage.removeItem("role");
      }

      if (err?.response?.status === 403) {
        return await refreshHandlingFunction(url);
      }
    });
  console.log(
    "🚀 ~ file: routes.js:105 ~ JWTExpiryHandlerFunction ~ response:",
    response,
    flag
  );

  console.log("line 110", response, flag);
  return response;
}

// used "Promise" to use localStorage in asynchronous way(used in "JWTExpiryHandlerFunction" * "refreshHandlingFunction")
function getItemAsync(key) {
  return new Promise((resolve) => {
    const value = localStorage.getItem(key);
    resolve(value);
  });
}
// used "Promise" to use localStorage in asynchronous way(used in "JWTExpiryHandlerFunction")
function setItemAsync(key, value) {
  return new Promise((resolve) => {
    const task = localStorage.setItem(key, value);
    resolve(task);
  });
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
                "http://localhost:3001/getAllProducts",
                "component - sliderCategory --- API - getAllProducts"
              );
            },
            children: [
              {
                path: "/products/:category",
                element: <Products />,
                errorElement: <ProductsError />,
                loader: async (req) => {
                  return await JWTExpiryHandlerFunction(
                    `http://localhost:3001/getAllProductsCategoryWise/${req.params.category}`,
                    "component - products ---API - getAllProductsCategoryWise"
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
            "http://localhost:3001/getAllProducts",
            "component - (separate route in header) Products --- API getAllProducts (separately used for header)"
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
            "http://localhost:3001/adminGetUsers",
            "component - AdminPanel --- API adminGetUsers"
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
