import { RouterProvider } from "react-router-dom";
import router from "./Routes/routes";
import Header from "./components/Header";

/* 
! why isn't header rendering in other pages? 
! add deletion function for admin (TEST WITH GOOGLE ACCOUNTS)
! slider not responsive in mobile
*/

function App() {
  return (
    <RouterProvider router={router}>
      <Header />
    </RouterProvider>
  );
}

export default App;
