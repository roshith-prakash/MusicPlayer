import React from "react";
import { MdOutlineAccountCircle } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuth } from "../context/authContext";
import { auth } from "../firebase/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import toast from "react-hot-toast";

// Initialize Google Auth Provider
const provider = new GoogleAuthProvider();

const Account = () => {
  // Get the current user from firebase
  const { currentUser } = useAuth();

  // Handle Google Signup
  const handleGoogleSignup = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        toast.success("Signed in Successfully!");
      })
      .catch((error) => {
        setDisabled(false);
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        toast.error("Something went wrong!");
      });
  };

  // Handle Sign Out
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Signed out!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong!");
      });
  };

  return (
    // The popup button on the bottom left of the screen
    <div className="font-inter">
      <Popover>
        <PopoverTrigger>
          {/* Show user's image or an account icon */}
          <button className=" bg-bggrey bg-opacity-50 p-1 text-white rounded-full">
            {!currentUser ? (
              <MdOutlineAccountCircle className="h-9 w-9" />
            ) : currentUser?.photoURL ? (
              <img
                src={currentUser?.photoURL}
                className="h-9 w-9 rounded-full"
              />
            ) : (
              <MdOutlineAccountCircle className="h-9 w-9" />
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-fit rounded ml-5 mb-2 p-0 bg-white text-black">
          {/* If user is logged in, Show name & sign out button */}
          {currentUser ? (
            <div>
              <p className="px-2 py-3 text-lg font-medium">
                {currentUser?.displayName
                  ? currentUser?.displayName
                  : "Guest User"}
              </p>
              <hr />
              <button
                onClick={handleLogout}
                className="w-full h-full font-medium  p-3 flex justify-center gap-x-1 items-center"
              >
                Sign Out
              </button>
            </div>
          ) : (
            // If user is not logged in, show sign in button
            <button
              onClick={handleGoogleSignup}
              className="w-full h-full  p-3 flex gap-x-1 justify-center items-center"
            >
              Sign in <FcGoogle className="text-lg" />
            </button>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Account;
