import { createBrowserRouter, RouterProvider } from "react-router-dom";
import router from "./Routes/routes";

/* 
todo: how to set cookies?
todo: why isn't header rendering in other pages?
*/

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
