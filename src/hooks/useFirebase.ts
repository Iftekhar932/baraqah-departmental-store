import { useEffect, useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { app } from "../Firebase/firebase.init";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const googleProvider = new GoogleAuthProvider();

const useFirebase = () => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false); // for loadingSpinner
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const { uid, email } = result.user;

      const response = await axios.post(
        "https://baraqah-departmental-store-server.onrender.com/jsonWebAccessToken",
        { uid, email, role: "user" } // Preset role for google sign in
      );

      if (response.status === 200) {
        const { accessToken } = response.data;
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("role", "user"); // Preset role for google sign in
        setUser(result.user);
        navigate("/");
      } else {
        console.log(response.data, "login failed");
      }
    } catch (error) {
      console.error("Error during Google sign in:", error);
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("access_token");
      setUser(null);
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return unsubscribe;
  }, [auth]);

  return { user, signInWithGoogle, logOut, loading, setLoading };
};

export default useFirebase;
