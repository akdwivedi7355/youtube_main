import React, { useContext, useEffect } from "react";

// react-router-dom
import { Navigate } from "react-router-dom";

import HelmetConsumer from "../../shared/helmetConsumer";

// context
import { Context } from "../../context/contextApi";
import { UserContext } from "../../context/userContext";

// components
import LeftNav from "../navbar/leftNav/LeftNav";
import VideoCard from "../videoDetails/VideoCard";
import RateLimitError from "../error/RateLimitError";

/*********************************************
 *
 * Feed component here
 *
 ********************************************/

const Feed = () => {
  const userContext = useContext(UserContext);
  const { loading, searchResults } = useContext(Context);

  useEffect(() => {
    document.getElementById("root").classList.remove("custom-h");
  }, []);

  // putting pages behind login page
  if (!userContext.user?.uid) {
    return <Navigate to="/signin" />;
  }

  return (
    <>
      <HelmetConsumer pageTitle={"Home | Yushot"} />
      <div className="flex flex-row h-[calc(100%-56px)]">
        <div className="hidden md:block">
          <LeftNav />
        </div>
        <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
            {!loading ? (
              searchResults.map((item) => {
                if (item.type !== "video") return false;
                return (
                  <VideoCard key={item?.video?.videoId} video={item?.video} />
                );
              })
            ) : (
              <>
                <RateLimitError />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Feed;
