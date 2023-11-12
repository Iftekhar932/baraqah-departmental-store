import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Cards from "./components/Cards";
import Home from "./components/Home";
import Hero from "./components/Hero";

import axios from "axios";

const router = createBrowserRouter([
  { path: "/home", element: <Home /> },
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
      <div className="App">
        <Header />
        <Hero />
      </div>
    </RouterProvider>
  );
}

export default App;
