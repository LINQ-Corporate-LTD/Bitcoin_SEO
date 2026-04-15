import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../../src/assets/css/video.css";
import { useApiData } from "../../src/common/ApiContext";

const arrowIcon =
  "https://www.desalination-resource-recovery.com/images/icons/up-arrow.png";

const VideoSection = () => {
  const navigate = useNavigate();
  const isClient = typeof window !== "undefined";

  // Create a memoized client-only navigation handler
  const goTo = (path) => {
    if (isClient && path) {
      navigate(path);
    }
  };

  const {
    homeVideoSettings,
    eventDetails,
    eventGeneralSettings,
    themeSettings,
  } = useApiData();

  return (
    <div className="home-banner-container custom-style-header">
      <div className="videoContainer">
        <div>
          <div className="overlay"></div>
          {homeVideoSettings?.videoLinkwebm && (
            <video
              className="video"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={homeVideoSettings.videoReplaceImage}
            >
              <source
                src={homeVideoSettings.videoLinkwebm}
                type="video/webm"
              />
              <source
                src={homeVideoSettings.videoLinkmp4}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </div>

      <div className="innerContainer custom-style-header-innerContainer">
        <div className="upper custom-style-header-upper">
          <div className="graphic custom-style-header-graphic">
            <div
              className="text custom-style-header-text"
              style={{
                "--header-image": `url(${homeVideoSettings?.eventDetailBackImage})`,
              }}
            >
              <div>
                <h1 dangerouslySetInnerHTML={{
                  __html: themeSettings?.headerContent
                }}>
                </h1>
              </div>
              <p className="HeaderTextLg">
                {eventDetails?.eventDate} | {eventDetails?.eventLocation}
              </p>
              <p className="HeaderTextSm">
                {eventDetails?.eventDate}
                <br />
                {eventDetails?.eventLocation}
              </p>
            </div>
          </div>
        </div>

        <div className="lower">
          <div className="lowerContainer">
            <div className="buttonContainer">
              <div className="button" onClick={() => goTo("/agenda")}>
                <h4>
                  view program
                  <img
                    src={arrowIcon}
                    alt="arrow icon"
                    width={15}
                    loading="lazy"
                  />
                </h4>
                <p>Discover the highlights of the event</p>
              </div>

              <div className="button" onClick={() => goTo("/contact-us")}>
                <h4>
                  connect with us
                  <img
                    src={arrowIcon}
                    alt="arrow icon"
                    width={15}
                    loading="lazy"
                  />
                </h4>
                <p>Get your questions answered by our team</p>
              </div>

              <div className="button" onClick={() => goTo("/sponsors")}>
                <h4>
                  become a partner
                  <img
                    src={arrowIcon}
                    alt="arrow icon"
                    width={15}
                    loading="lazy"
                  />
                </h4>
                <p>Join as a sponsor and reserve your booth</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;

