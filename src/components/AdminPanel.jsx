import "daisyui/dist/full.css";
import { useLoaderData } from "react-router-dom";

function AdminPanel() {
  const loadedData = useLoaderData();
  const allUsers = loadedData.data.allUsers;

  const deletionOfUserByAdmin = (userId) => {
    const confirmation = window.prompt(
      "Are you sure you want to delete this user? type 'DELETE' "
    );
    if (confirmation === "DELETE".toLocaleLowerCase()) return "ok";
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
            <span>
              Role:
              {user?.role ? user?.role : "user"}
            </span>

            <button
              className="btn btn-danger"
              onClick={() => deletionOfUserByAdmin(user?._id || user?.uid)}
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
deleteUser('userUid');



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
