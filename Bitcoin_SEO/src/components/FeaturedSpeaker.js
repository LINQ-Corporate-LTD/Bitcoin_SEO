import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/css/FeaturedSpeaker.css";

const leftArrowIcon =
  "https://www.desalination-resource-recovery.com/images/icons/icon-arrow-left.png";
const rightArrowIcon =
  "https://www.desalination-resource-recovery.com/images/icons/icon-arrow-right.png";

const FeaturedSpeaker = ({ title }) => {
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  const [speakerList, setSprakerList] = useState([]);
  useEffect(() => {
    callSpeakerListApi();
  }, []);
  const callSpeakerListApi = () => {
    const requestOptions = {
      method: "GET",
    };
    fetch(`https://harsh7541.pythonanywhere.com/admin1/eventspeakers`, requestOptions)
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
          setSprakerList(data["eventSpeakersList"]);
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

  // Custom Arrow Components
  const CustomPrevArrow = ({ onClick }) => (
    <a
      onClick={onClick}
      className="flex items-center justify-center m-0 p-0 w-max bg-transparent border-none cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 z-10"
      aria-label="Previous speakers"
      style={{ left: "-50px" }}
    >
      <img
        src="https://www.desalination-resource-recovery.com/images/icons/icon-arrow-left.png"
        alt="left arrow icon"
        loading="lazy"
        width="20"
        height="20"
      />
    </a>
  );

  const CustomNextArrow = ({ onClick }) => (
    <a
      onClick={onClick}
      className="flex items-center justify-center m-0 p-0 w-max bg-transparent border-none cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 z-10"
      aria-label="Next speakers"
      style={{ right: "-50px" }}
    >
      <img
        src="https://www.desalination-resource-recovery.com/images/icons/icon-arrow-right.png"
        alt="right arrow icon"
        loading="lazy"
        width="20"
        height="20"
      />
    </a>
  );

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1620,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1230,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 440,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleClick = (member) => {
    const speakerName = member.eventSpeakerName
      .toLowerCase()
      .replace(/\s+/g, "-");
    navigate(`/speakerprofile/${speakerName}`, { state: member }); // ✅ Pass member object in route state
  };

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <article
      className="SpeakersSection_speakerSection__UNPkB"
      style={{
        backgroundColor: "#f1f1f1ff",
        padding: windowWidth > 940 ? "100px 0px" : "",
        paddingBottom: windowWidth < 940 ? "22px" : "",
      }}
    >
      <h1>{!title ? "MEET OUR FEATURED SPEAKERS" : title} </h1>
      <div className="SpeakersSection_speakersSliderContainer__sW0Qj speaker-slick">
        <button onClick={() => sliderRef.current.slickPrev()}>
          <img
            src={leftArrowIcon}
            alt="left arrow icon"
            loading="lazy"
            width="20"
            height="20"
          />
        </button>
        <div>
          <Slider ref={sliderRef} {...settings}>
            {speakerList?.map((member) => (
              <div
                className="SpeakersSection_speakerImageContainer__dwWJ1"
                onClick={() => handleClick(member)}
              >
                <img
                  src={
                    member.eventSpeakerFeaturedPageImage || "/placeholder.svg"
                  }
                  alt={member.eventSpeakerName}
                  loading="lazy"
                  width="200"
                  height="200"
                ></img>
                <div className="SpeakersSection_text__FLalV">
                  <p>{member.eventSpeakerName}</p>
                  <p>{member.eventSpeakerCompany}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <button onClick={() => sliderRef.current.slickNext()}>
          <img
            src={rightArrowIcon}
            alt="right arrow icon"
            loading="lazy"
            width="20"
            height="20"
          />
        </button>
      </div>
    </article>
    // <section className="flex flex-col items-center justify-center mx-auto w-full min-h-[300px] bg-transparent">
    //   <div className="w-full">
    //     <div className="mx-auto mt-12 w-full max-w-[1450px] px-16">
    //       <div className="h-auto m-0 max-h-[280px] w-full">
    //         <Slider ref={sliderRef} {...settings}>
    //           {speakerList?.map((member) => (
    //             <div key={member.id} className="team-slide">
    //               <div
    //                 className="team-member"
    //                 style={{ cursor: "pointer" }}
    //                 onClick={() => handleClick(member)}
    //               >
    //                 <img
    //                   src={member.eventSpeakerFeaturedPageImage || "/placeholder.svg"}
    //                   alt={member.eventSpeakerName}
    //                   className="member-image"
    //                 />
    //                 <div className="member-info">
    //                   <p>{member.eventSpeakerName}</p>
    //                   <p>{member.eventSpeakerCompany}</p>
    //                 </div>
    //               </div>
    //             </div>
    //           ))}
    //         </Slider>
    //       </div>
    //     </div>
    //   </div>

    //   <style jsx global>{`
    //     .slick-dots {
    //       bottom: -50px;
    //     }

    //     .slick-dots li button:before {
    //       font-size: 12px;
    //       color: #ccc;
    //     }

    //     .slick-dots li.slick-active button:before {
    //       color: #666;
    //     }

    //     .slick-track {
    //       display: flex;
    //       align-items: center;
    //     }

    //     .slick-slide {
    //       height: auto;
    //     }

    //     .slick-slide > div {
    //       height: 100%;
    //     }

    //     .slick-list {
    //       overflow: hidden;
    //     }

    //     .team-slide {
    //       padding: 0 10px;
    //     }

    //     .team-member {
    //       position: relative;
    //       background: linear-gradient(
    //         0deg,
    //         #00000059 17%,
    //         hsla(0, 0%, 72%, 0.099) 70.76%,
    //         #fff0
    //       );
    //       border-radius: 8px;
    //       overflow: hidden;
    //       box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    //       transition: transform 0.3s ease;
    //     }

    //     .member-image {
    //       width: 100%;
    //       height: 230px;
    //       object-fit: cover;
    //       display: block;
    //     }

    //     .member-info {
    //       position: absolute;
    //       bottom: 0;
    //       left: 0;
    //       right: 0;
    //       background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
    //       color: white;
    //       padding: 30px 15px 15px;
    //       text-align: left;
    //     }

    //     .member-name {
    //       color: #fff;
    //       font-size: 16px;
    //       font-weight: 800;
    //       letter-spacing: 0.2px;
    //       line-height: 18px;
    //       margin: 0;
    //       padding: 0;
    //       text-shadow: 1px 3px 3px #0000004d;
    //       text-transform: capitalize;
    //       white-space: normal;
    //     }

    //     .member-title {
    //       font-size: 14px;
    //       margin: 0;
    //       opacity: 0.9;
    //       line-height: 1.3;
    //     }

    //     .member-subtitle {
    //       font-size: 13px;
    //       margin: 2px 0 0 0;
    //       opacity: 0.8;
    //       line-height: 1.2;
    //     }
    //   `}</style>
    // </section>
  );
};

export default FeaturedSpeaker;
