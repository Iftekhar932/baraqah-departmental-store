import { RouterProvider } from "react-router-dom";
import router from "./Routes/routes";

//https://baraqah-departmental-store-server.onrender.com/
//! set loading spinner
// ! solve both token dead, site not rendering problem

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
