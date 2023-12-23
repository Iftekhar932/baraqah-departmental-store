import { RouterProvider } from "react-router-dom";
import router from "./Routes/routes";

/* 
! add deletion function for admin (TEST WITH GOOGLE ACCOUNTS)
! add refreshToken feature for google
! add auto logout feature for google if somehow refreshToken is not regenerated 
! header has "baraqah" written twice in large screen
! add footer
*/

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
