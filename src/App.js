import { RouterProvider } from "react-router-dom";
import router from "./Routes/routes";
import Header from "./components/Header";

/* 
? how to set cookies? i have but isn't working in browser but works in postman
? why isn't header rendering in other pages? 
? cookies working only for mozilla firefox
todo: add refreshToken
todo: TEST WITH GOOGLE ACCOUNT USERS
*/

function App() {
  return (
    <RouterProvider router={router}>
      <Header />
    </RouterProvider>
  );
}

export default App;
