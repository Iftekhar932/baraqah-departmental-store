import { RouterProvider } from "react-router-dom";
import router from "./Routes/routes";

/* 
? how to set cookies? i have but isn't in browser but in postman
? why isn't header rendering in other pages? 

todo: set cart feature, 
todo: admin can see user accounts list
*/

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
