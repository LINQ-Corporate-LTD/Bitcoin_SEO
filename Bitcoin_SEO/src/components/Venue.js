import { useState, useEffect, useRef } from "react";
import img1 from "../assets/images/VenueGallery/1747979445814.jpg";
import img2 from "../assets/images/VenueGallery/1747979452318.jpg";
import img3 from "../assets/images/VenueGallery/1747979457233.jpg";
import img4 from "../assets/images/VenueGallery/1747979462165.jpg";
import img5 from "../assets/images/VenueGallery/1747979468189.jpg";
import img6 from "../assets/images/VenueGallery/1747979489675.png";

import Navbar from "./Navbar";
import SubscribeForm from "./SubscribeForm";
import Footer from "../Footer";
import LogoCarousel from "./LogoCarousel";
import { useNavigate } from "react-router-dom";
import "./../assets/css/venue.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";

const bgImage =
  "https://www.frac-sand-conference.com/static/media/venue-image.ad9c328038bb8cdfb219.png";
const locationIcon =
  "https://www.desalination-resource-recovery.com/images/icons/pin.png";
const phoneIcon =
  "https://www.desalination-resource-recovery.com/images/icons/icon-phone.png";
const webIcon =
  "https://www.desalination-resource-recovery.com/images/icons/icon-web.png";

const Venue = () => {
  const navigate = useNavigate();
  const [venueData, setVenueData] = useState([]);
  const [venueGalleryData, setVenueGalleryData] = useState([]);
  const [venuePlace, setVenuePlace] = useState("");
  const [venueDescription, setVenueDescription] = useState("");
  const [venueWebsiteLink, setVenueWebsiteLink] = useState("");
  const [venueWebAddress, setVenueWebAddress] = useState("");
  const [venueGalleryImg1, setVenueGalleryImg1] = useState("");
  const [venueGalleryImg2, setvenueGalleryImg2] = useState("");
  const [venueGalleryImg3, setvenueGalleryImg3] = useState("");
  const [venueGalleryImg4, setvenueGalleryImg4] = useState("");
  const [venueGalleryImg5, setvenueGalleryImg5] = useState("");
  const [venueGalleryImg6, setvenueGalleryImg6] = useState("");
  const [venueLocation, setVenueLocation] = useState("");
  const [venueContact, setVenueContact] = useState("");
  const [venueMapLink, setVenueMapLink] = useState("");
  const contactSectionRef = useRef(null);
  useEffect(() => {
    callVenueContentListApi();
    callVenueGalleryListApi();
    // eslint-disable-next-line
  }, []);

  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const callVenueContentListApi = () => {
    const requestOptions = {
      method: "GET",
    };
    fetch(`https://harsh7541.pythonanywhere.com/admin1/getvenuedata`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (
          data &&
          (data.detail === "The Token is expired" ||
            data.message === "Invalid token")
        ) {
          localStorage.clear();
          navigate("/logout");
        }
        if (data && data.status) {
          setVenueData(data["venuePageStaticData"]);
          // setTotalCount(data?.paginationDetails?.count);
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
  const callVenueGalleryListApi = () => {
    const requestOptions = {
      method: "GET",
    };
    fetch(`https://harsh7541.pythonanywhere.com/admin1/venuegalleryimages`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (
          data &&
          (data.detail === "The Token is expired" ||
            data.message === "Invalid token")
        ) {
          localStorage.clear();
          navigate("/logout");
        }
        if (data && data.status) {
          setVenueGalleryData(data["venueGalleryImages"]);
          // setTotalCount(data?.paginationDetails?.count);
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

  const cleanHtml = (html) => {
    if (!html) return "";

    // Remove outer quotes and unescape HTML
    let cleaned = html.replace(/^"(.*)"$/, "$1");

    // Unescape quotes
    cleaned = cleaned.replace(/\\"/g, '"');

    // Ensure all external links have proper attributes
    cleaned = cleaned.replace(
      /<a\s+href=["']([^"']+)["'][^>]*>/gi,
      (match, url) => {
        // Check if URL is external (starts with http/https)
        if (url.startsWith("http://") || url.startsWith("https://")) {
          return `<a href="${url}" target="_blank" rel="noopener noreferrer">`;
        }
        return match;
      }
    );

    return cleaned;
  };

  const getCleanUrl = (htmlString) => {
    // Remove <p> tags and any other HTML tags
    return htmlString.replace(/<\/?[^>]+(>|$)/g, "").trim();
  };

  useEffect(() => {
    if (venueData.length > 0) {
      setVenuePlace(venueData[0]?.venueFirstSectionFirstTitle);
      setVenueDescription(
        venueData[0]?.venueFirstSectionDescription?.replace(/^"(.*)"$/, "$1")
      );
      setVenueWebsiteLink(
        venueData[0]?.venueAddressLink.replace(/^"(.*)"$/, "$1")
      );
      setVenueLocation(venueData[0]?.venueLocation.replace(/^"(.*)"$/, "$1"));
      setVenueContact(venueData[0]?.venueContact.replace(/^"(.*)"$/, "$1"));
      setVenueMapLink(venueData[0]?.venueMapLink.replace(/^"(.*)"$/, "$1"));
      setVenueWebAddress(
        venueData[0]?.venueWebsiteAddress.replace(/^"(.*)"$/, "$1")
      );
    }
    if (venueGalleryData?.length > 0) {
      setVenueGalleryImg1(venueGalleryData[0].gallerySectionOneBigImage);
      setvenueGalleryImg2(venueGalleryData[0].gallerySectionOneSmallImage);
      setvenueGalleryImg3(venueGalleryData[0].gallerySectionTwoBigImage);
      setvenueGalleryImg4(venueGalleryData[0].gallerySectionTwoSmallImage);
      setvenueGalleryImg5(venueGalleryData[0].gallerySectionThreeBigImage);
      setvenueGalleryImg6(venueGalleryData[0].gallerySectionThreeSmallImage);
    }
    // eslint-disable-next-line
  }, [venueData, venueGalleryData]);

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

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    setTimeout(() => {
      const element = document.querySelector(hash);
      if (!element) return;

      const headerHeight = 120;
      const elementTop = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementTop - headerHeight;

      window.scrollTo({
        top: Math.max(offsetPosition, 0),
        behavior: "smooth",
      });
    }, 100);
  }, []);

  const imgArr = [
    venueGalleryImg1,
    venueGalleryImg2,
    venueGalleryImg3,
    venueGalleryImg4,
    venueGalleryImg5,
    venueGalleryImg6,
  ];

  const scrollToContact = () => {
    if (contactSectionRef.current) {
      const navbarHeight = 120;
      const elementPosition = contactSectionRef.current.offsetTop;
      const offsetPosition = elementPosition - navbarHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <Navbar forceScrolled />
      <div style={{ opacity: 1 }}>
        <div style={{ marginTop: windowWidth > 1024 ? "120px" : "" }}>
          <article className="Venue_container__Lol8U">
            <div className="DetailsContainer_wholeContainer__385Iv">
              <div className="DetailsContainer_container__JrWjX">
                <div
                  className="DetailsContainer_imageContainer__ncJwH"
                  style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: "cover",
                  }}
                ></div>
                <div className="DetailsContainer_textVenueContainer__XnUJF">
                  <h1>Venue</h1>
                  <div className="DetailsContainer_innerContent__6NQGR">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: cleanHtml(venueDescription),
                      }}
                    ></div>
                  </div>
                  <button onClick={scrollToContact}>MORE INFORMATION</button>
                </div>
              </div>
            </div>
            <div id="gallery">
              <div className="LightBox_fluid__uvDPj">
                <div className="LightBox_container__pMpod">
                  <div className="LightBox_images__L7242">
                    <h2>Venue Gallery</h2>
                    <div className="LightBox_top__L68+7">
                      <img
                        src={venueGalleryImg1}
                        alt="Gallery Img"
                        onClick={() => setLightboxIndex(0)}
                      ></img>
                      <img
                        src={venueGalleryImg2}
                        alt="Gallery Img"
                        onClick={() => setLightboxIndex(1)}
                      ></img>
                    </div>
                    <div className="LightBox_middle__k7r70">
                      <img
                        src={venueGalleryImg3}
                        alt="Gallery Img"
                        onClick={() => setLightboxIndex(2)}
                      ></img>
                      <img
                        src={venueGalleryImg4}
                        alt="Gallery Img"
                        onClick={() => setLightboxIndex(3)}
                      ></img>
                    </div>
                    <div className="LightBox_bottom__x1J0A">
                      <img
                        src={venueGalleryImg5}
                        alt="Gallery Img"
                        onClick={() => setLightboxIndex(4)}
                      ></img>
                      <img
                        src={venueGalleryImg6}
                        alt="Gallery Img"
                        onClick={() => setLightboxIndex(5)}
                      ></img>
                    </div>
                  </div>
                </div>
                <Lightbox
                  open={lightboxIndex >= 0}
                  index={lightboxIndex}
                  close={() => setLightboxIndex(-1)}
                  slides={imgArr.map((src) => ({ src }))}
                  plugins={[Fullscreen]}
                  animation={{ fade: true, swipe: false }}
                  styles={{
                    container: { backgroundColor: "#292929d5" },
                    button: { backgroundColor: "#4d4d4d9a" },
                  }}
                  on={{
                    click: ({ target }) => {
                      if (target.classList.contains("yarl__container")) {
                        setLightboxIndex(-1);
                      }
                    },
                    view: ({ index }) => {
                      setLightboxIndex(index);
                    },
                  }}
                  render={{
                    slide: ({ slide, rect }) => (
                      <>
                        <div
                          style={{
                            position: "absolute",
                            top: "10px",
                            left: "10px",
                            padding: "5px 10px",
                            backgroundColor: "rgba(0, 0, 0, 0)",
                            color: "#fff",
                            fontSize: "14px",
                            borderRadius: "4px",
                            zIndex: 1000,
                          }}
                        >
                          {lightboxIndex + 1} / {imgArr.length}
                        </div>
                        <img
                          src={slide.src}
                          style={{
                            maxWidth: rect.width,
                            maxHeight: rect.height,
                            display: "block",
                            margin: "0 auto",
                          }}
                          alt=""
                        />
                      </>
                    ),
                  }}
                />
              </div>
            </div>
            <div className="Venue_contact__jdZNn" ref={contactSectionRef} style={{
              transition: 'margin-top 0.3s ease'
            }}>
              <h2>Contact the venue</h2>
              <div className="Venue_cardsContainer__U8T+R">
                <div>
                  <h5>Location</h5>
                  <p>
                    <img
                      src={locationIcon}
                      alt="location icon"
                      style={{ width: "14px" }}
                    ></img>
                    <a href={getCleanUrl(venueMapLink)}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: cleanHtml(venueLocation),
                        }}
                      ></div>
                    </a>
                  </p>
                </div>
                <div>
                  <h5>Contact</h5>
                  <p style={{ marginTop: "auto" }}>
                    <img src={phoneIcon} alt="phone icon"></img>
                    <a
                      href="tel:+97142281111"
                      dangerouslySetInnerHTML={{
                        __html: cleanHtml(venueContact),
                      }}
                    ></a>
                  </p>
                  <p>
                    <img src={webIcon} alt="web icon"></img>
                    <p style={{ marginLeft: "5px" }}>
                      <p>
                        <a
                          href={getCleanUrl(venueWebsiteLink)}
                          dangerouslySetInnerHTML={{
                            __html: cleanHtml(venueWebsiteLink),
                          }}
                        ></a>
                      </p>
                    </p>
                  </p>
                </div>
              </div>
              <a
                target="_blank"
                href={getCleanUrl(venueMapLink)}
                rel="noopener noreferrer"
              >
                Take me there
              </a>
            </div>
            <LogoCarousel />
            <SubscribeForm />
          </article>
        </div>
      </div>

      <Footer />
    </>
  );
};
export default Venue;
