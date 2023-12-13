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
! why isn't header rendering in other pages? 
! add deletion function for admin (TEST WITH GOOGLE ACCOUNTS)
! slider not responsive in mobile
! need to add forgot password feature
! add refreshtoken feature for goolgle
*/

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

/* function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </Router>
  );
} */

export default App;
