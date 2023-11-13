import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import axios from "axios";

import Cards from "./components/Cards";
import Home from "./components/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
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
    ],
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
