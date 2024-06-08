import React, { useState } from "react";

// firebase
import firebase from "firebase/compat/app";

// react-router
import { Link } from "react-router-dom";

// react-hot toast
import toast from "react-hot-toast";

import HelmetConsumer from "../../shared/helmetConsumer";

//images
import forgotPwdBanner from "../../images/forgot-password-banner.png";

/************************************************
 *
 * Forgot password component
 *
 ************************************************/

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [error, setError] = useState("");

  const input = document.querySelector("input");

  // email change at input
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setError("");
  };

  // handling reset password
  const handleResetPassword = (event) => {
    event.preventDefault();

    // checking if user exists in firebase auth
    firebase
      .auth()
      .fetchSignInMethodsForEmail(email)
      .then((signInMethods) => {
        if (signInMethods.length === 0) {
          toast.error("User does not exist !", {
            duration: 4000,
          });
          input.value = "";
          setError("User does not exist");
        } else {
          // sending reset email
          firebase
            .auth()
            .sendPasswordResetEmail(email)
            .then(() => {
              toast.success("Reset Password email sent !", {
                duration: 4000,
              });
              setResetEmailSent(true);
              setError("");
              input.value = "";
            })
            .catch((error) => {
              setError(error.message);
            });
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <>
      <HelmetConsumer pageTitle={"Forgot Password | YouTube app"} />
      <div className="flex items-center h-full bg-[#888]">
        <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-xl shadow-xl lg:max-w-4xl">
          <div
            className="hidden bg-[#131313] bg-cover bg-center bg-no-repeat rounded-tl-xl lg:block lg:w-1/2"
            style={{
              backgroundImage: `url(${forgotPwdBanner})`,
            }}
          ></div>

          <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
            <div className="px-8 mb-4 text-center">
              <h3 className="pt-4 mb-2 text-2xl">Forgot Your Password?</h3>
              <p className="mb-4 text-sm text-gray-700">
                We get it, stuff happens. Just enter your email address below
                and we'll send you a link to reset your password!
              </p>
            </div>
            <form
              className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
              onSubmit={handleResetPassword}
            >
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="forgotemail"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter Email Address..."
                />
              </div>
              <div className="mb-6 text-center">
                <button
                  className="w-full px-4 py-2 font-bold text-white bg-[#FF0000] rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Reset Password
                </button>
              </div>
              {resetEmailSent && (
                <p className="text-green-600 text-center text-sm">
                  An email has been sent to your account to reset your password.
                </p>
              )}
              {error && (
                <p className="text-red-500 text-center text-sm">{error}</p>
              )}
              <hr className="mb-6 border-t" />
              <div className="text-center">
                <Link
                  to="/"
                  className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                >
                  Create an Account!
                </Link>
              </div>
              <div className="text-center">
                <Link
                  to="/signin"
                  className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                >
                  Already have an account? Login!
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
