import { RouterProvider } from "react-router-dom";
import router from "./Routes/routes";

/* 
! add deletion function for admin (TEST WITH GOOGLE ACCOUNTS)
! add refreshToken feature for google
! logout function in header for google sign in firebase
! add auto logout feature for google if somehow refreshToken is not regenerated 
! *** try using animate on scoll or something like that ****
! *** NEW ISSUE ****
! DOESN'T RENDER WHEN APP STARTS AND USER IS LOGGED IN WITH NO ALIVE TOKEN
! SEE IF CHANGING THE NAME OF THE FIREBASEADMIN FILE WORKS
*/

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
