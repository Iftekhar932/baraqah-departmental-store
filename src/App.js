import { RouterProvider } from "react-router-dom";
import router from "./Routes/routes";

/* 
! user self account deletion feature 
! try adding blob download feature
*/

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
