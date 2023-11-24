import { RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import router from "./Routes/routes";
import Header from "./components/Header";

/* 
todo: how to set cookies?
todo: why isn't header rendering in other pages?
*/

function App() {
  return (
    <RouterProvider router={router}>
      <Header />
    </RouterProvider>
  );
}

export default App;
