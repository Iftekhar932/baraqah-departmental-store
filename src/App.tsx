import { RouterProvider } from "react-router-dom";
import router from "./Routes/routes";
import { useEffect } from "react";

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
