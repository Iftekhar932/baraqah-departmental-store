import "daisyui/dist/full.css";
import axios from "axios";
import { useLoaderData } from "react-router-dom";

function AdminPanel() {
  const loadedData = useLoaderData();
  const allUsers = loadedData.data.allUsers;

  // account deletion by id or uid(firebase)
  async function deleteUser(id, flag) {
    try {
      const response = await axios.post(
        "http://localhost:3001/adminUserDeletion",
        {
          userIdToDelete: id,
          flag,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error deleting user:", error.response);
    }
  }

  const deletionOfUserByAdmin = (user) => {
    try {
      if (user?.uid) {
        if (window.confirm("Are you sure you want to delete this user?"))
          return deleteUser(user.uid, "uid");
      }

      if (user?._id) {
        if (window.confirm("Are you sure you want to delete this user?")) {
          deleteUser(user._id, "_id");
        }
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: AdminPanel.jsx:28 ~ deletionOfUserByAdmin ~ error:",
        error
      );
    }
  };

  return (
    <div className="p-4">
      {allUsers.map((user) => {
        return (
          <p
            key={user?._id || user?.uid}
            className="mx-auto my-2 border rounded grid place-items-center grid-cols-3"
          >
            <span>Email: {user?.email || user?.displayName}</span>
            {<span>Role: {user?.role ? user?.role : "user"}</span>}

            <button
              className="btn btn-danger"
              onClick={() => deletionOfUserByAdmin(user)}
              disabled={user?.role == "admin"}
            >
              Delete
            </button>
          </p>
        );
      })}
    </div>
  );
}

export default AdminPanel;

/* 
async function updateUser(uid) {
  try {
    const userRecord = await admin.auth().updateUser(uid, {
      displayName: 'New Display Name',
    });

    console.log('Successfully updated user:', userRecord.uid);
  } catch (error) {
    console.error('Error updating user:', error);
  }
}

// Call the function with the user's UID
updateUser('userUid');

*/
