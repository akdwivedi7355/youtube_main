import React, { useContext, useState, useEffect } from "react";

// firebase
import firebase from "firebase/compat/app";

// react-hot toast
import toast, { Toaster } from "react-hot-toast";

// react router
import { Link, useLocation, useNavigate } from "react-router-dom";

// context
import { Context } from "../../context/contextApi";
import { UserContext } from "../../context/userContext";

// components
import Loader from "../../shared/loader";
import LeftNav from "./leftNav/LeftNav";

// images & react - icons
import ytLogo from "../../images/yt-logo.png";
import ytLogoMobile from "../../images/yt-logo-mobile.png";
import { SlMenu } from "react-icons/sl";
import { IoIosSearch } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { ImSwitch } from "react-icons/im";
import { CgClose } from "react-icons/cg";

/******************************************************
 *
 * Header component here
 *
 ******************************************************/
const Header = () => {
  const { loading } = useContext(Context);

  const { user, setUser } = useContext(UserContext);

  const [searchQuery, setSearchQuery] = useState("");

  const [isLeftNavOpen, setIsLeftNavOpen] = useState(false);

  const navigate = useNavigate();

  const { pathname } = useLocation();

  const pageName = pathname?.split("/")?.filter(Boolean)?.[0];

  /******************************************
   * search query handler
   *****************************************/
  const searchQueryHandler = (event) => {
    if (
      (event?.key === "Enter" || event === "searchButton") &&
      searchQuery?.length > 0
    ) {
      navigate(`/searchResult/${searchQuery}`);
    }
  };

  /*****************************************
   * Checking for user photoURL
   ****************************************/
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        // If the user has a profile image, update the user's profile with the image URL
        if (user.providerData[0].providerId === "google.com" && user.photoURL) {
          user
            .updateProfile({
              photoURL: user.photoURL,
            })
            .then(() => {
              console.log("profile updated with profile image URL");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      } else {
        setUser(null);
      }
    });
  }, []);

  /*******************************************
   * Getting initials for user's email to
   * be displayed as default profile image
   *******************************************/
  const getInitials = (email) => {
    if (!email) return "";
    const nameArray = email.split(" ");
    if (nameArray.length === 1) {
      return nameArray[0].charAt(0).toUpperCase();
    }
    return (
      nameArray[0].charAt(0).toUpperCase() +
      nameArray[nameArray.length - 1].charAt(0).toUpperCase()
    );
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} duration={4000} />
      <div className="sticky top-0 z-10 flex flex-row items-center justify-between h-14 px-2 md:px-5 bg-black">
        {loading && <Loader />}
        <div className="flex h-5 items-center">
          {pageName !== "video" && (
            <div
              className="flex md:hidden md:mr-6 cursor-pointer items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]"
              onClick={() => setIsLeftNavOpen(!isLeftNavOpen)}
            >
              <div
                className={`w-[240px] h-full bg-black fixed left-0 top-12 transition-all duration-300 ${
                  isLeftNavOpen ? "translate-x-0" : "-translate-x-[240px]"
                }`}
              >
                <LeftNav />
              </div>
              {isLeftNavOpen ? (
                <CgClose className="text-white text-xl" />
              ) : (
                <SlMenu className="text-white text-xl" />
              )}
            </div>
          )}
          <Link to="/home" className="flex h-5 items-center">
            <img
              className="h-full hidden dark:md:block"
              src={ytLogo}
              alt="Youtube-logo"
            />
            <img
              className="h-full md:hidden"
              src={ytLogoMobile}
              alt="Youtube-mobile-logo"
            />
          </Link>
        </div>
        <div className="group flex items-center">
          <div className="flex h-8 md:h-10 md:ml-10 md:pl-5 border border-[#303030] rounded-l-3xl group-focus-within:border-blue-500 md:group-focus-within:ml-5 md:group-focus-within:pl-0">
            <div className="w-10 items-center justify-center hidden group-focus-within:md:flex">
              <IoIosSearch className="text-white text-xl" />
            </div>
            <input
              type="text"
              className="bg-transparent outline-none text-white pr-5 pl-5 md:pl-0 w-44 md:group-focus-within:pl-0 md:w-64 lg:w-[500px]"
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
              placeholder="Search"
              value={searchQuery}
            />
          </div>
          <button
            className="w-[40px] md:w-[60px] h-8 md:h-10 flex items-center justify-center border border-l-0 border-[#303030] rounded-r-3xl bg-white/[0.1]"
            onClick={() => searchQueryHandler("searchButton")}
          >
            <IoIosSearch className="text-white text-xl" />
          </button>
        </div>
        <div className="flex items-center">
          <div className="hidden md:flex">
            <div className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]">
              <RiVideoAddLine className="text-white text-xl cursor-pointer" />
            </div>
            <div className="flex items-center justify-center ml-2 h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]">
              <Link
                to="/signin"
                onClick={() => {
                  setUser(null);
                  toast.success("Logout Successfull !");
                }}
              >
                <ImSwitch
                  className="text-white text-xl cursor-pointer"
                  title="Log Out"
                />
              </Link>
            </div>
          </div>
          <div className="flex h-8 w-8 overflow-hidden rounded-full md:ml-4">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile"
                title="Your Profile image"
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: " 100%",
                  backgroundColor: `#${Math.floor(
                    Math.random() * 16777215
                  ).toString(16)}`,
                  textAlign: "center",
                  borderRadius: "50%",
                  color: "#fff",
                  fontSize: "20px",
                }}
                title="Profile image"
              >
                {getInitials(user.email)}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
