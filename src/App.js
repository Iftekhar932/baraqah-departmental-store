import { RouterProvider } from "react-router-dom";
import router from "./Routes/routes";

/* 
! add deletion function for admin (TEST WITH GOOGLE ACCOUNTS)
! add refreshToken feature for google
*/

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
