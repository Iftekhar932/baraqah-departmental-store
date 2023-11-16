import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import axios from "axios";

import Products from "./components/Products";
import Home from "./components/Home";
// import CategoriesSlide from "./components/CategoriesSlide";
import SliderCategory from "./components/SliderCategory";
import UserLogin from "./components/UserLogin";
import UserRegister from "./components/UserRegister";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <SliderCategory />,
        loader: async () => {
          const response = await axios
            .get("http://localhost:3001/getAllProducts")
            .catch(function (err) {
              console.log(err);
            });
          return response;
        },
        children: [
          {
            path: `/products/:category`,
            element: <Products />,
            loader: async (req) => {
              const response = await axios
                .get(
                  `http://localhost:3001/getAllProducts/${req.params.category}`
                )
                .catch(function (err) {
                  console.log(err);
                });
              return response;
            },
          },
        ],
      },
    ],
  },
  {
    path: "/products",
    element: <Products />,
    loader: async () => {
      const response = await axios
        .get("http://localhost:3001/getAllProducts")
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
]);

function App() {
  return (
    <RouterProvider router={router}>
      <div className="App"></div>
    </RouterProvider>
  );
}

export default App;
