import { RouterProvider } from "react-router-dom";
import router from "./Routes/routes";
import Header from "./components/Header";

/* 
? how to set cookies? i have but isn't setting in browsers except mozilla and also sets in postman
! why isn't header rendering in other pages? 
! add deletion function for admin (TEST WITH GOOGLE ACCOUNTS)
*/

function App() {
  return (
    <RouterProvider router={router}>
      <Header />
    </RouterProvider>
  );
}

export default App;
