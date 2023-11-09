import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Cards from "./components/Cards";
import Home from "./components/Home";

const router = createBrowserRouter([{ path: "/home", element: <Home /> }]);

function App() {
  return (
    <div className="App">
      <Header />
      {/* <Cards /> */}
    </div>
  );
}

export default App;
