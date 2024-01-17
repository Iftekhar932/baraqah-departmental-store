import { RouterProvider } from "react-router-dom";
import router from "./Routes/routes";
//https://baraqah-departmental-store-server.onrender.com/
function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
