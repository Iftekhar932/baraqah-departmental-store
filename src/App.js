import { RouterProvider } from "react-router-dom";
import router from "./Routes/routes";

//http://localhost:3001/
//! set loading spinner
// ! solve both token dead, site not rendering problem

/* 
! both are calling data solve it
! it was supposed to renew my access_token
*/

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
