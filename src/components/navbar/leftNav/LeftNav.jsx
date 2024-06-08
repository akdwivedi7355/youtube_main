import React, { useContext } from "react";

// react-router
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

// components
import LeftNavMenuItem from "./LeftNavMenuItem";

// utilities
import { categories } from "../../../utils/constants";

// context
import { Context } from "../../../context/contextApi";
import { UserContext } from "../../../context/userContext";

const LeftNav = () => {
  const { selectedCategory, setSelectedCategory } = useContext(Context);

  const userContext = useContext(UserContext);

  const navigate = useNavigate();

  const clickHandler = (name, type) => {
    switch (type) {
      case "category":
        return setSelectedCategory(name);
      case "home":
        return setSelectedCategory(name);
      case "menu":
        return false;
      case "logout":
        return setSelectedCategory(name);
      default:
        break;
    }
  };

  return (
    <div
      className={`md:block w-[240px] overflow-y-auto h-full py-4 bg-black absolute md:relative z-999 transition-all`}
    >
      <div className="flex px-5 flex-col">
        {categories.map((item) => {
          return (
            <React.Fragment key={item.name}>
              <LeftNavMenuItem
                text={item.type === "home" ? "Home" : item.name}
                icon={item.icon}
                action={
                  item.type === "logout"
                    ? () => {
                        userContext.setUser(null);

                        toast.success("Logout Successfull !");
                        navigate("/signin");
                      }
                    : () => {
                        clickHandler(item.name, item.type);
                        navigate("/home");
                      }
                }
                className={`${
                  selectedCategory === item.name ? "bg-white/[0.15]" : ""
                }`}
              />
              {item.divider && <hr className="my-5 border-white/[0.2]" />}
            </React.Fragment>
          );
        })}
        <hr className="my-4 border-white/[0.2]" />
      </div>
    </div>
  );
};

export default LeftNav;
