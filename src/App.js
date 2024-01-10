import { RouterProvider } from "react-router-dom";
import router from "./Routes/routes";

/* 
! *** try using animate on scroll or something like that ****
! *** NEW ISSUE ****
! DOESN'T RENDER WHEN APP STARTS AND USER IS LOGGED IN WITH NO ALIVE TOKEN
*/

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
