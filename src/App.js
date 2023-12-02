import { RouterProvider } from "react-router-dom";
import router from "./Routes/routes";
import Header from "./components/Header";

/* 
? how to set cookies? i have but isn't in browser but in postman
? why isn't header rendering in other pages? 
? cookies working only for mozilla firefox
todo: while logged in with email use setUser to display user email, use api to fetch email logged in user data

*/

function App() {
  return (
    <RouterProvider router={router}>
      <Header />
    </RouterProvider>
  );
}

export default App;
