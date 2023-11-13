import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import axios from "axios";

import Cards from "./components/Products";
import Home from "./components/Home";
import CategoriesSlide from "./components/CategoriesSlide";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      // *👇👇👇👇 CHANGE IT MAKE IT PROPER, IT WAS DEMO
      {
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
      },
    ],
  },

  {
    path: "/products",
    element: <Cards />,
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
