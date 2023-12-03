import "daisyui/dist/full.css";
import { useLoaderData } from "react-router-dom";

function AdminPanel() {
  const loadedData = useLoaderData();
  const allUsers = loadedData.data.allUsers;

  async function deleteUser(id, flag) {
    try {
      if (flag == "uid") {
        await admin.auth().deleteUser(id);
        console.log("Successfully deleted user");
      }

      if (flag == "_id") {
        // console.log(id)

        console.log("Successfully deleted user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }

  const deletionOfUserByAdmin = (user) => {
    try {
      if (user?.uid) {
        const confirmation = window.prompt(
          "Are you sure you want to delete this user? type 'DELETE' "
        );
        if (confirmation === "DELETE".toLocaleLowerCase())
          return deleteUser(user.uid, "uid");
      }

      if (user?._id) {
        if (window.confirm("Are you sure you want to delete this user")) {
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
              onClick={
                () => deletionOfUserByAdmin(user)
                // deletionOfUserByAdmin(`${user?._id} _id` || `${user?.uid} uid`)
              }
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
async function deleteUser(uid) {
  try {
    await admin.auth().deleteUser(uid);
    console.log('Successfully deleted user');
  } catch (error) {
    console.error('Error deleting user:', error);
  }
}

// Call the function with the user's UID



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
