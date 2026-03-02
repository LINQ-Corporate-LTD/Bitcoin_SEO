import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
import CountSection from "./CountSection";
import ForumSection from "./ForumSection";
import HomeSpeakerSlider from "./HomeSpeakerSlider";
import IndustryTrend from "./IndustryTrend";
import KeyTopics from "./KeyTopics";
import LatestNews from "./LatestNews";
import LogoCarousel from "./LogoCarousel";
import Navbar from "./Navbar";
import PastAttandessSection from "./PastAttandessSection";
import RelatedEventsSection from "./RelatedEventsSection";
import TestimonialCarousel from "./TestimonialCarousel";
import VideoSection from "./VideoSection";
import Sponsors1 from "../../src/assets/images/Sponsor/1.jpg";
import Sponsors2 from "../../src/assets/images/Sponsor/2.png";
import Sponsors3 from "../../src/assets/images/Sponsor/3.png";
import Sponsors4 from "../../src/assets/images/Sponsor/4.png";
import Sponsors5 from "../../src/assets/images/Sponsor/5.png";
import Sponsors6 from "../../src/assets/images/Sponsor/6.png";
import "../../src/assets/css/home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const leftArrowIcon =
  "https://www.desalination-resource-recovery.com/images/icons/icon-arrow-left.png";
const rightArrowIcon =
  "https://www.desalination-resource-recovery.com/images/icons/icon-arrow-right.png";

// const sponsorImg = [Sponsors1, Sponsors2, Sponsors3, Sponsors4, Sponsors5, Sponsors6]

function chunkArray(array, size) {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  );
}

function padToFill(array, totalItems) {
  const result = [...array];
  let i = 0;
  while (result.length < totalItems) {
    result.push(array[i % array.length]); // repeat to fill blank slots
    i++;
  }
  return result;
}

const Home = () => {
  const sliderRef = useRef(null);

  const navigate = useNavigate();

  const [sponsorList, setSponsorList] = useState([]);
  console.log("sponsorList: ", sponsorList);

  useEffect(() => {
    callSponsorListApi();
  }, []);

  const callSponsorListApi = () => {
    const requestOptions = {
      method: "GET",
    };
    fetch(`https://harsh7541.pythonanywhere.com/admin1/eventsponsors`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (
          data &&
          (data.detail === "The Token is expired" ||
            data.message === "Invalid token")
        ) {
          navigate("/logout");
        }
        if (data && data.status) {
          setSponsorList(data["eventSponsors"]);
        } else {
          toast.error(data?.message);
        }
      })
      .catch((error) => {
        setTimeout(() => {
          toast.error("There was an error, Please try again later.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }, 1000);
      });
  };

  const [settings, setSettings] = useState({});
  const [chunkedSponsors, setChunkedSponsors] = useState([]);

  let arrowDisplay = "none";

  useEffect(() => {
    const updateSettings = () => {
      const width = window.innerWidth;
      let itemsPerSlide = 6;
      let gridColumns = 3;
      let gridRows = 2;

      if (width <= 640) {
        itemsPerSlide = 2;
        gridColumns = 2;
        gridRows = 1;
      } else if (width <= 1230) {
        itemsPerSlide = 4;
        gridColumns = 2;
        gridRows = 2;
      }

      const autoplayOn = width <= 1230;
      const sponsorImg = sponsorList.map((sponsor) => sponsor);
      console.log("sponsorImg: ", sponsorImg);
      const totalSlides = Math.ceil(sponsorImg.length / itemsPerSlide);
      const totalNeeded = totalSlides * itemsPerSlide;
      const padded = padToFill(sponsorImg, totalNeeded);
      const chunked = chunkArray(padded, itemsPerSlide);

      const hasEnoughSlides = sponsorImg.length > itemsPerSlide;

      arrowDisplay = hasEnoughSlides ? "block" : "none";

      if (width <= 850) {
        arrowDisplay = "none";
      }

      setSettings({
        dots: false,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: autoplayOn,
        autoplaySpeed: 3000,
        infinite: autoplayOn && hasEnoughSlides,
      });

      setChunkedSponsors(
        chunked.map((group, idx) => ({
          id: idx,
          items: group,
          gridColumns,
          gridRows,
        }))
      );
    };

    updateSettings();
    window.addEventListener("resize", updateSettings);
    return () => window.removeEventListener("resize", updateSettings);
  }, [sponsorList]);

  return (
    <>
      <Navbar />
      <article className="HomeScreen_wholeContainer__oE8Au">
        <VideoSection />
        <HomeSpeakerSlider />
        <ForumSection />
        <KeyTopics />
        <CountSection />
        <LogoCarousel />
        <LatestNews />
        <TestimonialCarousel />
        <PastAttandessSection />
        <div className="SponsorCards_container__o3uWn">
          <div className="SponsorCards_AttendeesContainer__PLZ7L">
            <h2>OUR SPONSORS</h2>
            <div>
              <img
                src={leftArrowIcon}
                alt="left arrow icon"
                loading="lazy"
                width="16"
                onClick={() => sliderRef.current.slickPrev()}
                style={{ display: arrowDisplay }}
              />
              <div className="SponsorCards_cardContainerOuter__yj9ca operatorSlider">
                <div>
                  <Slider ref={sliderRef} {...settings}>
                    {chunkedSponsors.map((group) => (
                      // <div key={group.id}>
                      <div
                        key={group.id}
                        className="SponsorCards_cardContainerInner__BPPEL"
                      >
                        {group.items.map((item, i) => {
                          const handleClick = () => {
                            if (item?.sponsorType !== "Dummy") {
                              const sponsorName = item?.sponsorComapnyName
                                .toLowerCase()
                                .replace(/[^a-z0-9\s-]/g, "") // remove special characters
                                .replace(/\s+/g, "-") // replace spaces with hyphens
                                .replace(/-+/g, "-"); // collapse multiple hyphens

                              navigate(`/sponsor/${sponsorName}`, {
                                state: item, // pass full sponsor data to description page
                              });
                            }
                          };

                          return (
                            <div
                              key={i}
                              className={`SponsorCards_card__8eNkT ${
                                item?.sponsorType !== "Dummy" ? "clickable" : ""
                              }`}
                              onClick={
                                item?.sponsorType !== "Dummy"
                                  ? handleClick
                                  : undefined
                              }
                              style={{
                                cursor:
                                  item?.sponsorType !== "Dummy"
                                    ? "pointer"
                                    : "default",
                              }}
                            >
                              <img
                                src={item?.sponsorComapnyLogo}
                                alt={`Sponsor ${i + 1}`}
                              />
                              {item?.sponsorType !== "Dummy" && (
                                <div className="SponsorCards_overlay__7MT16">
                                  <h4>{item?.sponsorComapnyName}</h4>
                                  <h4>{item?.sponsorType} Sponsor</h4>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      // </div>
                    ))}
                  </Slider>
                </div>
              </div>
              <img
                src={rightArrowIcon}
                alt="right arrow icon"
                loading="lazy"
                width="16"
                onClick={() => sliderRef.current.slickNext()}
                style={{ display: arrowDisplay }}
              />
            </div>
          </div>
        </div>
        <IndustryTrend />
        <RelatedEventsSection />
      </article>
      <Footer />
    </>
  );
};
export default Home;
