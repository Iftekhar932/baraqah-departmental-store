import "daisyui/dist/full.css";
import { useLoaderData } from "react-router-dom";

function AdminPanel() {
  const loadedData = useLoaderData();
  const allUsers = loadedData.data.firebaseAccounts;
  console.log("🚀 ~ file: AdminPanel.jsx:7 ~ AdminPanel ~ allUsers:", allUsers);

  return (
    <div className="w-4/5 mx-auto">
      {allUsers.map((user) => {
        console.log(user?.id || user?.uid);
        return (
          <p key={user?._id || user?.uid}>{user?.email || user?.displayName}</p>
        );
      })}
    </div>
  );
}

export default AdminPanel;
