import "daisyui/dist/full.css";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import React from "react";

function AdminPanel() {
  const loadedData = useLoaderData();
  const allUsers = loadedData?.data?.allUsers;

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
    <div className="h-screen">
      <div className="gap-2 flex flex-wrap justify-center">
        {allUsers?.map((user) => (
          <div
            key={user?._id || user?.uid}
            className="md:w-1/2 lg:w-1/3 p-2 border rounded flex flex-col justify-center items-center"
          >
            <span className="mb-2 text-center">
              {user?.email || user?.displayName}
            </span>
            <span className="text-center mb-2">
              Role: {user?.role ? user?.role : "user"}
            </span>
            <button
              className="btn btn-error "
              onClick={() => deletionOfUserByAdmin(user)}
              disabled={user?.role === "admin"}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
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
