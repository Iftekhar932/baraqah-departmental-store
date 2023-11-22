import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";

import Products from "./components/Products";
import Home from "./components/Home";
// import CategoriesSlide from "./components/CategoriesSlide";
import SliderCategory from "./components/SliderCategory";
import UserLogin from "./components/UserLogin";
import UserRegister from "./components/UserRegister";
import AdminPanel from "./components/AdminPanel";
import ErrorComponent from "./components/ErrorComponent";
import Header from "./components/Header";

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
            .catch(function (err) {
              console.log(err, "NO JWT TOKEN");
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
                  console.log(err);
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
          console.log(err);
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
  { path: "/adminOnly", element: <AdminPanel /> },
]);

function App() {
  return (
    <RouterProvider router={router}>
      <Header />
    </RouterProvider>
  );
}

export default App;
