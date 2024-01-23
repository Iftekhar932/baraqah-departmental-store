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

/*
 * function to call api of refreshToken, setting new token in localStorage and then re-invoke *    "jwtExpiryFunction" & the outcome/response that
 * is returned from that function is finally
 * returned from this function - only if access_token is expired this functions is used
 */
//  this function is imported in "CartView.jsx", "SliderCategory.jsx" and "Product.jsx"  component

export const refreshHandlingFunction = async (
  url,
  flag,
  alreadyFetchedFlag
) => {
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
    await setItemAsync("access_token", response?.data?.accessToken);

    /* 
     "alreadyFetchedFlag" is set to "true" when ARGUMENT IS SENT FROM OTHER COMPONENTS
     where this function is invoked/called. In this case, "JWTExpiryHandlerFunction" 
     this function is not needed to be invoked in this file as it is invoked in the component file. (preventing it to call api twice)
     */
    if (alreadyFetchedFlag === true) {
      return;
    } else {
      return await JWTExpiryHandlerFunction(url);
    }
  } catch (err) {
    console.log(
      "✨ 🌟  refreshHandlingFunction  err 57:",
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

/* when jwt expires it'll invoke "refreshTokenHandlingFunction" above or it'll handle API response - when access_token expires,
------------------------------------------------------------------------------------------------
NOTE: if "refreshTokenHandlingFunction" is used after a token is expired  the final response will be returned from the place "jwtExpiryHandlingFunction" is invoked and returned, which is in the try-catch block of "refreshTokenHandlingFunction". (This'll only happen once after the renewal of accessToken )
*/
//  this function is imported in "CartView.jsx", "SliderCategory.jsx" and "Product.jsx"  component
export async function JWTExpiryHandlerFunction(url, flag) {
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
        err?.response,
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
            loader: async () => {
              return JWTExpiryHandlerFunction(
                "http://localhost:3001/getAllProducts",
                "SliderCategory.jsx - API getAllProducts"
              );
            },
            errorElement: <ProductsError />,

            children: [
              {
                path: "/products/:category",
                element: <Products />,
                errorElement: <ProductsError />,
                loader: async (req) => {
                  return await JWTExpiryHandlerFunction(
                    `http://localhost:3001/getAllProductsCategoryWise/${req.params.category}`,
                    "Products.jsx || API - getAllProductsCategoryWise"
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
      },
      {
        path: "/userLogin",
        element: <UserLogin />, // this component has api in it's own file
        errorElement: <ErrorComponent />,
      },
      {
        path: "/userRegister",
        element: <UserRegister />, // this component has api in it's own file
        errorElement: <ErrorComponent />,
      },
      {
        path: "/adminOnly",
        element: <AdminPanel />, // this component has an api in it's own file for user deletion
        loader: async () => {
          return await JWTExpiryHandlerFunction(
            "http://localhost:3001/adminGetUsers",
            "component - AdminPanel --- API adminGetUsers"
          );
        },
        errorElement: <ErrorComponent />,
      },

      { path: "/forgotPassword", element: <ForgotPasswordForm /> }, // this component ha an api in it's own file for password reset
      { path: "/about", element: <AboutUs /> },
      { path: "/viewCart", element: <CartView /> }, // axios api called in component file "axios.get()" that uses productsID to get a single product
    ],
  },
]);

export default router;
