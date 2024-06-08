import React, { useContext, useState } from "react";

// firebase
import firebase from "firebase/compat/app";

// context
import { UserContext } from "../../context/userContext";

// react router & toast
import { Navigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

// react-helmet
import HelmetConsumer from "../../shared/helmetConsumer";

// images & icons
import signUpBanner from "../../images/signup-banner.jpg";
import { FcGoogle } from "react-icons/fc";
import { BsEye, BsEyeSlash } from "react-icons/bs";

/**************************************************
 *
 * Sign UP component
 *
 *************************************************/
const SignUp = () => {
  const context = useContext(UserContext);

  const provider = new firebase.auth.GoogleAuthProvider();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  const handleSignUp = () => {
    // firebase auth with email and pass
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        context.setUser({ email: res.user.email, uid: res.user.uid });
        toast.success("Account Created Successfully !");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use": {
            toast.error("Email already registered !");
            break;
          }

          case "auth/invalid-email": {
            toast.error("Invalid Email !");
            break;
          }

          case "auth/weak-password": {
            toast.error("Password should be atleast 6 characters long !");
            break;
          }
          default:
            break;
        }
      });
  };

  // handling Google signin firebase auth
  const handleGoogleSignUp = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        context.setUser({ email: res.user.email, uid: res.user.uid });
        toast.success("Account Created Successfully !");
      })
      .catch(() => {
        toast.error("Something went wrong!");
      });
  };

  // onClick of SignUp btn
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignUp();
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
      <HelmetConsumer pageTitle={"Signup |  yushot"} />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex items-center h-full bg-[#888]">
        <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-xl shadow-4xl lg:max-w-4xl">
          <div
            className="hidden bg-cover bg-center rounded-tl-xl lg:block lg:w-1/2"
            style={{
              backgroundImage: `url(${signUpBanner})`,
            }}
          ></div>

          <div className="w-full px-6 py-6 md:px-8 lg:w-1/2">
            <p className="text-xl text-center text-gray-700 font-semibold">
              Sign up here to watch videos for FREE.
            </p>

            <div>
              <a
                className="flex items-center justify-center mt-4 text-black transition-colors duration-300 transform border border-gray-400 rounded-lg hover:bg-gray-50 cursor-pointer opacity-70 hover:opacity-50"
                rel="noopener noreferrer"
                onClick={handleGoogleSignUp}
              >
                <div className="pl-4 py-2">
                  <FcGoogle size={"1.5rem"} />
                </div>
                <span className="w-5/6 pr-8 py-3 font-semibold text-center">
                  Sign up with Google
                </span>
              </a>
            </div>

            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b border-gray-500 lg:w-1/4"></span>

              <p className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">
                or signup with email
              </p>

              <span className="w-1/5 border-b border-gray-500 lg:w-1/4"></span>
            </div>

            <div className="mt-4">
              <label
                className="block mb-2 text-sm text-gray-800 font-semibold"
                htmlFor="LoggingEmailAddress"
              >
                Email Address
              </label>
              <input
                id="LoggingEmailAddress"
                className="block w-full px-4 py-2 text-gray-800 bg-white border border-gray-400 rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <div className="flex justify-between">
                <label
                  className="block mb-2 text-sm font-semibold text-gray-800"
                  htmlFor="loggingPassword"
                >
                  Password
                </label>
              </div>
              <div className="flex relative">
                <input
                  id="loggingPassword"
                  className="block w-full px-4 py-2 text-gray-800 bg-white border border-gray-400 rounded-lg focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                  type={passwordShown ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                className="w-full px-6 py-3 text-sm font-medium uppercase tracking-wid transition-colors duration-300 transform rounded-lg border-rose-700 bg-[#FF0000] text-white hover:text-white hover:bg-rose-500 hover:border-rose-600 focus:ring focus:ring-rose-500 focus:ring-opacity-50 active:bg-rose-600 active:border-rose-700"
                onClick={handleSubmit}
              >
                Create Account
              </button>
            </div>

            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b border-gray-500 md:w-1/8"></span>

              <Link
                to="/signin"
                className="text-xs text-gray-500 uppercase hover:underline"
              >
                have an account{"  "}
                <p className="text-blue-500 inline-block uppercase">
                  Login here
                </p>
              </Link>

              <span className="w-1/5 border-b border-gray-500 md:w-1/4"></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
