import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

// utilties
import { fetchDataFromApi } from "../../utils/api";

// context
import { Context } from "../../context/contextApi";

// react-helmet
import HelmetConsumer from "../../shared/helmetConsumer";

// components
import LeftNav from "../navbar/leftNav/LeftNav";
import SearchResultVideoCard from "./SearchResultVideoCard";

/**************************************************
 *
 * Search result component
 *
 *************************************************/

const SearchResult = () => {
  const [result, setResult] = useState();
  const { searchQuery } = useParams();
  const { setLoading } = useContext(Context);

  useEffect(() => {
    document.getElementById("root").classList.remove("custom-h");
    fetchSearchResults();
  }, [searchQuery]);

  const fetchSearchResults = () => {
    setLoading(true);
    fetchDataFromApi(`search/?q=${searchQuery}`).then((res) => {
      setResult(res?.contents);
      setLoading(false);
    });
  };

  return (
    <>
      <HelmetConsumer pageTitle={`Results for: ${searchQuery}`} />
      <div className="flex flex-row h-[calc(100%-56px)]">
        <LeftNav />
        <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
          <div className="grid grid-cols-1 gap-2 p-5">
            {result?.map((item) => {
              if (item?.type !== "video") return false;
              let video = item.video;
              return (
                <SearchResultVideoCard key={video.videoId} video={video} />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchResult;
