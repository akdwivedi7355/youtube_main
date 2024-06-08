import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// context
import { AppContext } from "./context/contextApi";
import { UserContext } from "./context/userContext";

// components
import Header from "./components/navbar/Header";
import Feed from "./components/feed/Feed";
import SearchResult from "./components/searchResult/SearchResult";
import VideoDetails from "./components/videoDetails/VideoDetails";
import SignIn from "./components/signIn/SignIn";
import SignUp from "./components/signUp/SignUp";

// toast
import { Toaster } from "react-hot-toast";

// firebase
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// firebase init
import { firebaseConfig } from "./config/firebaseConfig";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";
firebase.initializeApp(firebaseConfig);

const App = () => {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Toaster position="top-center" reverseOrder={false} duration={4000} />
      <AppContext>
        <Router>
          <div className="flex flex-col h-full">
            {user ? <Header /> : ""}
            <Routes>
              <Route exact path="/" element={<SignUp />}></Route>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/home" exact element={<Feed />} />
              <Route
                path="/searchResult/:searchQuery"
                element={<SearchResult />}
              />
              <Route path="/video/:id" element={<VideoDetails />} />
            </Routes>
          </div>
        </Router>
      </AppContext>
    </UserContext.Provider>
  );
};

export default App;
