import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import axios from "axios";

import Products from "./components/Products";
import Home from "./components/Home";
import CategoriesSlide from "./components/CategoriesSlide";
import SliderCategory from "./components/SliderCategory";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      // *👇👇👇👇 CHANGE IT MAKE IT PROPER, IT WAS DEMO
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
      },
      /*   {
        path: "/",
        element: <CategoriesSlide />,
        loader: async () => {
          const response = await axios
            .get("http://localhost:3001/getAllProducts")
            .catch(function (err) {
              console.log(err);
            });
          return response;
        },
      }, */
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
]);

function App() {
  return (
    <RouterProvider router={router}>
      <div className="App"></div>
    </RouterProvider>
  );
}

export default App;
