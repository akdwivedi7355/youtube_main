import React, { useState } from "react";

// react-icons
import { IoCloseOutline } from "react-icons/io5";
import { BiLoaderAlt } from "react-icons/bi";

/******************************************
 *
 * Video modal component
 *
 *****************************************/
const VideoModal = (props) => {
  const [videoLoading, setVideoLoading] = useState(true);

  const spinner = () => {
    setVideoLoading(!videoLoading);
  };
  return (
    <>
      <section className="fixed top-12 left-0 w-full h-full opacity-100 bg-navModalOpenBg backdrop-blur-sm transition-opacity duration-300 ease-out z-100 animate-videoModal">
        <div className="flex justify-center items-center h-screen">
          <div className="bg-transparent text-right h-auto w-full rounded-2xl mx-4 shadow-navModalOpenShadow  text-black md:w-[800px] md:mx-16 sm:h-[500px]">
            <IoCloseOutline
              className="inline-flex relative bottom-12 w-8 h-8 p-0 rounded-full bg-white cursor-pointer"
              arial-label="Close modal"
              onClick={props.handleModal}
            />
            <div className="bottom-0 flex relative sm:bottom-9">
              {videoLoading ? (
                <div className="fixed top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 text-[#FF0000] text-6xl">
                  <BiLoaderAlt className="animate-spin" />
                </div>
              ) : null}
              <iframe
                className="w-full h-60 sm:h-[500px] z-100 rounded-3xl md:w-screen"
                onLoad={spinner}
                loading="lazy"
                width="800"
                height="500"
                src="https://www.youtube.com/embed/qop9iV3RnQY"
                title="YouTube Clone with Auth Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VideoModal;
