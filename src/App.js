import { RouterProvider } from "react-router-dom";
import router from "./Routes/routes";

// todo: use "https://baraqah-departmental-store-server.onrender.com" this api
// ?http://localhost:3001/

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
