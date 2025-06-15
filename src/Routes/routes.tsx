import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import axios from "axios";

// components
import Products from "../components/Products";
import Home from "../components/Home";
import UserLogin from "../components/UserLogin";
import UserRegister from "../components/UserRegister";
import AdminPanel from "../components/AdminPanel";
import AboutUs from "../components/AboutUs";
import CartView from "../components/CartView";
import Main from "../components/Main";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
// import SliderCategory from "../components/SliderCategory";

// error components
import ProductsError from "../components/ProductsError";

// lazy loading component
const SliderCategory = lazy(() => import("../components/SliderCategory"));

/*
PURPOSE OF "refreshHandlingFunction":
 * refresh accessToken, set new token in localStorage, and then re-invoke "jwtExpiryFunction" while returning the result of invoked function
 * returned from this function - only if access_token is expired this functions is used
 */

//  this function is imported in "CartView.tsx", "Product.tsx","AdminPanel.tsx"  component
export const refreshHandlingFunction = async (
  url: string | null,
  compName: string = "", // this compName parameter is used to identify the component name to locate in which components this function is used
  alreadyFetchedFlag: boolean = false //
) => {
  const accessToken = await getItemAsync("access_token");
  const userEmailAccount = await getItemAsync("userEmail");

  try {
    const response = await axios.post(
      "https://baraqah-departmental-store-server.onrender.com/refresh",
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
     where this function is invoked/called to prevent the function from being called again in this file
     */
    if (alreadyFetchedFlag === true) {
      return;
    } else {
      return await JWTExpiryHandlerFunction(url); // retrying the original request after refreshing accessToken
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

/*
  PURPOSE OF "JWTExpiryHandlerFunction":
  calls any API that requires "access_token" to be sent in the header,
  it checks if "access_token" is present in localStorage, if not it calls "refreshHandlingFunction" to refresh the token,
 */
//  this function is imported in "CartView.jsx", "SliderCategory.jsx" and "Product.jsx"  component,
/* export async function JWTExpiryHandlerFunction(
  url: string,
  compName: string = ""
) {
  // compName parameter is used to identify the component name to locate in which components this function is used

  let accessToken = await getItemAsync("access_token");

  if (!accessToken) {
    const refreshSuccess = await refreshHandlingFunction(url, compName, true);
    if (!refreshSuccess) {
      localStorage.clear();
      return;
    }
    accessToken = await getItemAsync("access_token");
    if (!accessToken) {
      localStorage.clear();
      return;
    }
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
        compName
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
} */

export async function JWTExpiryHandlerFunction(
  url: string,
  compName: string = ""
) {
  let accessToken = await getItemAsync("access_token");

  // Try to refresh if no access token
  if (!accessToken) {
    const refreshSuccess = await refreshHandlingFunction(url, compName, true);
    if (refreshSuccess) {
      accessToken = await getItemAsync("access_token");
    }
    if (!accessToken) {
      return;
    }
  }

  try {
    const response = await axios.get(url, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (err: any) {
    // Only try refresh if error is 401/403 (token expired/invalid)
    if (err?.response?.status === 401 || err?.response?.status === 403) {
      const refreshSuccess = await refreshHandlingFunction(url, compName, true);
      if (refreshSuccess) {
        accessToken = await getItemAsync("access_token");
        if (accessToken) {
          // Retry the request once
          return axios.get(url, {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
        }
      }
      return;
    }
    // throw err;
  }
}

// used "Promise" to use localStorage in asynchronous way(used in "JWTExpiryHandlerFunction" * "refreshHandlingFunction")
function getItemAsync(key: string) {
  return new Promise((resolve) => {
    const value = localStorage.getItem(key);
    resolve(value);
  });
}
// used "Promise" to use localStorage in asynchronous way(used in "JWTExpiryHandlerFunction")
function setItemAsync(key: string, value: string) {
  return new Promise((resolve) => {
    const task = localStorage.setItem(key, value);
    resolve(task);
  });
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ProductsError />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <ProductsError />,
        children: [
          {
            path: "/",
            element: <SliderCategory />,

            errorElement: <ProductsError />,

            children: [
              {
                path: "/products/:category",
                element: <Products />,
                errorElement: <ProductsError />,
                loader: async (req) => {
                  return await JWTExpiryHandlerFunction(
                    `https://baraqah-departmental-store-server.onrender.com/getAllProductsCategoryWise/${req.params.category}`,
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
        errorElement: <ProductsError />,
      },
      {
        path: "/userLogin",
        element: <UserLogin />, // this component has api in it's own file
        errorElement: <ProductsError />,
      },
      {
        path: "/userRegister",
        element: <UserRegister />, // this component has api in it's own file
        errorElement: <ProductsError />,
      },
      {
        path: "/adminOnly",
        element: <AdminPanel />, // this component has an api in it's own file for user deletion
        loader: async () => {
          return await JWTExpiryHandlerFunction(
            "https://baraqah-departmental-store-server.onrender.com/adminGetUsers",
            "component - AdminPanel --- API adminGetUsers"
          );
        },
        errorElement: <ProductsError />,
      },

      { path: "/forgotPassword", element: <ForgotPasswordForm /> }, // this component ha an api in it's own file for password reset
      { path: "/about", element: <AboutUs /> },
      { path: "/viewCart", element: <CartView /> }, // axios api called in component file "axios.get()" that uses productsID to get a single product
    ],
  },
]);

export default router;
