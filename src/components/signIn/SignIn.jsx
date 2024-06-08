import React, { useContext, useState } from "react";

// firebase
import firebase from "firebase/compat/app";

// context
import { UserContext } from "../../context/userContext";

// react-router
import { Navigate, Link } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";

// react-helmet
import HelmetConsumer from "../../shared/helmetConsumer";

// images & icons
import signInBanner from "../../images/signin-banner.jpg";
import { FcGoogle } from "react-icons/fc";
import { BsEye, BsEyeSlash } from "react-icons/bs";

/**************************************************
 *
 * Sign In component
 *
 *************************************************/
const SignIn = () => {
  const context = useContext(UserContext);

  const provider = new firebase.auth.GoogleAuthProvider();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  const handleSignUp = () => {
    // firebase auth with email and pass
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        context.setUser({ email: res.user.email, uid: res.user.uid });
        toast.success("Login Successfull !", {
          duration: 4000,
        });
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/user-not-found": {
            toast.error("Invalid Email or password !");
            break;
          }

          case "auth/invalid-email": {
            toast.error("Invalid Email !");
            break;
          }
          case "auth/wrong-password": {
            toast.error("Password not matched !");
            break;
          }
          default:
            toast.error("Something went wrong !");
        }
      });
  };

  // handling Google SignIn firebase auth
  const handleGoogleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        context.setUser({ email: res.user.email, uid: res.user.uid });
        toast.success("Login Successfull !", {
          duration: 6000,
        });
      })
      .catch(() => {
        toast.error("Something went wrong!");
      });
  };

  // onClick of Login btn
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignUp();
    const inputs = document.querySelectorAll(
      "#LoggingEmailAddress, #loggingPassword"
    );
    inputs.forEach((input) => {
      input.value = "";
    });
  };

  // Password toggle handler
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  if (context.user?.uid) {
    return <Navigate to="/home" />;
  }
  return (
    <>
      <HelmetConsumer pageTitle={"Signin | yushot"} />
      <Toaster position="top-center" reverseOrder={false} />
      {/* signIn component here */}
      <div className="flex items-center h-full bg-[#888]">
        <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-xl shadow-xl lg:max-w-4xl">
          <div
            className="hidden bg-cover bg-center bg-no-repeat rounded-tl-xl lg:block lg:w-1/2"
            style={{
              backgroundImage: `url(${signInBanner})`,
            }}
          ></div>

          <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
            <p className="text-2xl font-semibold text-center text-gray-700">
              Welcome back!
            </p>
            <div>
              <a
                className="flex items-center justify-center mt-4 text-black transition-colors duration-300 transform border rounded-lg border-gray-400 hover:bg-gray-50 cursor-pointer opacity-70 hover:opacity-50"
                rel="noopener noreferrer"
                onClick={handleGoogleSignIn}
              >
                <div className="pl-4 py-2">
                  <FcGoogle size={"1.5rem"} />
                </div>
                <span className="w-5/6 pr-8 py-3 font-semibold text-center">
                  Log in with Google
                </span>
              </a>
            </div>

            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b border-gray-500 lg:w-1/4"></span>

              <p className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">
                or login with email
              </p>

              <span className="w-1/5 border-b border-gray-500 lg:w-1/4"></span>
            </div>

            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-semibold text-gray-700"
                htmlFor="LoggingEmailAddress"
              >
                Email Address
              </label>
              <input
                id="LoggingEmailAddress"
                className="block w-full px-4 py-2 text-gray-800 bg-white border border-gray-400 rounded-lg  focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mt-4">
              <div className="flex justify-between">
                <label
                  className="block mb-2 text-sm font-semibold text-gray-700"
                  htmlFor="loggingPassword"
                >
                  Password
                </label>
                <Link
                  to={"/forgotpassword"}
                  className="text-xs text-gray-500 hover:underline cursor-pointer"
                >
                  Forget Password?
                </Link>
              </div>
              <div className="flex relative">
                <input
                  id="loggingPassword"
                  className="block w-full px-4 py-2 text-gray-800 bg-white border border-gray-400  rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                  type={passwordShown ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span className="absolute top-3 right-3 cursor-pointer text-gray-700">
                  {passwordShown ? (
                    <BsEye size={20} onClick={togglePassword} />
                  ) : (
                    <BsEyeSlash size={20} onClick={togglePassword} />
                  )}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform rounded-lg border-rose-700 bg-[#FF0000] hover:text-white hover:bg-rose-600 hover:border-rose-600 focus:ring focus:ring-rose-500 focus:ring-opacity-50 active:bg-rose-600 active:border-rose-700"
                onClick={handleSubmit}
              >
                LOG IN
              </button>
            </div>

            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
              <Link
                to="/"
                className="text-xs text-gray-500 dark:text-gray-400 hover:underline font-semibold"
              >
                New Here{" "}
                <p className="text-blue-500 inline-block uppercase">
                  Create Account
                </p>
              </Link>

              <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
