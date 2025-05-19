import React from "react";
import "daisyui/dist/full.css";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { refreshHandlingFunction } from "../Routes/routes";

interface UserStructureBase {
  email: string;
  displayName: string;
  role?: string;
}

// explanation of this type: it's a union type that can be either
// { _id: string; uid?: never } or { uid: string; _id?: never }
type UserStructure = UserStructureBase &
  ({ _id: string; uid?: never } | { uid: string; _id?: never });

interface LoaderData {
  data: {
    allUsers: UserStructure[];
  };
}

function AdminPanel() {
  const loadedData = useLoaderData() as LoaderData; // Ensure the type matches LoaderData
  const allUsers: UserStructure[] = loadedData?.data?.allUsers || [];

  // Function for account deletion by id or uid (firebase)
  async function deleteUser(id: number, flag: string) {
    try {
      const response = await axios.post(
        "https://baraqah-departmental-store-server.onrender.com/adminUserDeletion",
        { userIdToDelete: id, flag },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      return response; // Return the response for potential further use
    } catch (error) {
      console.error("Error deleting user:", error);
      // Handle errors
      if (error?.response?.status === 403) {
        await refreshHandlingFunction(
          null,
          "component - AdminPanel.jsx ------- api - adminUserDeletion",
          true
        );
        // Reattempt deletion after refresh (consider adding a retry limit)
        return deleteUser(id, flag); // Retry deletion if token refresh succeeds
      }
      // Handle other potential errors here (e.g., network errors, server errors)
      // Consider displaying user-friendly error messages based on the error type
    }
  }

  // Confirmation prompt for user account deletion (improved structure)
  const deletionOfUserByAdmin = async (user) => {
    if (!user) {
      return; // Handle potential undefined user case
    }

    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        let userId;
        if (user?.uid) {
          userId = user.uid;
        } else if (user?._id) {
          userId = user._id;
        } else {
          console.error("User object missing required identifier (uid or _id)");
          return; // Handle missing identifier more gracefully
        }
        await deleteUser(userId, user?.uid ? "uid" : "_id");
      } catch (error) {
        console.error("Error deleting user:", error);
        // Handle errors as in deleteUser function
      }
    }
  };

  return (
    <div className="m-4">
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
              className={`btn btn-error ${
                user?.role === "admin" && "disabled"
              }`}
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
