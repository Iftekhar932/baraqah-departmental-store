import {
  RouterProvider,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import router from "./Routes/routes";
import Header from "./components/Header";
import Main from "./components/Main";
import AboutUs from "./components/AboutUs";

/* 
! add deletion function for admin (TEST WITH GOOGLE ACCOUNTS)
! slider not responsive in mobile (RECHECK IT I SOLVED IT THOUGH)
! need to add forgot password feature for express authentication
! add refreshToken feature for google
*/

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
