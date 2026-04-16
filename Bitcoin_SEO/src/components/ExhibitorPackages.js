import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../src/assets/css/ExhibitorPackages.css";
import Sponsors7 from "../../src/assets/images/Sponsor/sponsor-image (1).png";
import Navbar from "./Navbar";
import LogoCarousel from "./LogoCarousel";
import SubscribeForm from "./SubscribeForm";
import Footer from "../Footer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../src/assets/css/logoslider.css";
import Testimonials3 from "../../src/assets/images/testominal/testominal.webp";
import Testimonials4 from "../../src/assets/images/testominal/testominal2.webp";
import Testimonials5 from "../../src/assets/images/testominal/testominal3.webp";
import Testimonials6 from "../../src/assets/images/testominal/testominal4.webp";
import partner1 from "../../src/assets/images/partners/partner1.png";
import partner2 from "../../src/assets/images/partners/partner2.png";
import partner3 from "../../src/assets/images/partners/partner3.png";
import partner4 from "../../src/assets/images/partners/partner4.png";
import partner5 from "../../src/assets/images/partners/partner5.png";
import partner6 from "../../src/assets/images/partners/partner6.png";
import partner7 from "../../src/assets/images/partners/partner7.png";
import partner8 from "../../src/assets/images/partners/partner8.png";
import partner9 from "../../src/assets/images/partners/partner9.png";
import partner10 from "../../src/assets/images/partners/partner10.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TestimonialCarousel from "./TestimonialCarousel";
import { Helmet } from "react-helmet-async";
import { useApiData } from "../common/ApiContext";

const leftArrowIcon =
  "https://www.desalination-resource-recovery.com/images/icons/icon-arrow-left.png";
const rightArrowIcon =
  "https://www.desalination-resource-recovery.com/images/icons/icon-arrow-right.png";

const emailIcon =
  "https://www.desalination-resource-recovery.com/images/icons/msg.png";
const phoneIcon =
  "https://www.desalination-resource-recovery.com/images/icons/phone-call.png";
const tickImg =
  "https://www.desalination-resource-recovery.com/images/icons/tick.png";

const arrowUp =
  "https://www.desalination-resource-recovery.com/images/icons/accordion-arrow-up.png";
const arrowDown =
  "https://www.desalination-resource-recovery.com/images/icons/accordion-arrow-down.png";

const logos = [
  partner1,
  partner2,
  partner3,
  partner4,
  partner5,
  partner6,
  partner7,
  partner8,
  partner9,
  partner10,
];

const ExhibitorPackages = () => {
  const navigate = useNavigate();
  const [silverActiveTab, setSilverActiveTab] = useState(false);
  const [goldActiveTab, setGoldActiveTab] = useState(false);
  const [platinumActiveTab, setPlatinumActiveTab] = useState(false);

  const [sponsorPackageList, setSponsorPackageList] = useState([]);
  const [sponsorPageData, setSponsorPageData] = useState([]);
  const [mediaPageHelpersList, setMediaPageHelpersList] = useState([]);
  const [paraDes, setParaDes] = useState("");
  const [logoList, setLogoList] = useState([]);

  useEffect(() => {
    callLogoListApi();
    // eslint-disable-next-line
  }, []);

  const callLogoListApi = () => {
    const requestOptions = {
      method: "GET",
    };
    fetch(`https://harsh7541.pythonanywhere.com/admin1/homepagecompanieslogo`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.status) {
          setLogoList(data["homePageCompaniesList"]);
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

  const silverToggleBox = () => {
    setSilverActiveTab((prev) => !prev);
  };

  const goldToggleBox = () => {
    setGoldActiveTab((prev) => !prev);
  };

  const platinumToggleBox = () => {
    setPlatinumActiveTab((prev) => !prev);
  };

  useEffect(() => {
    callSponsorPackageListApi();
    callSponsorPageDataApi();
    callMediaHelperListApi();
    // eslint-disable-next-line
  }, []);

  const exhibitorPackageSectionRef = useRef(null);

  const scrollToExhibitPackage = () => {
    if (exhibitorPackageSectionRef.current) {
      const navbarHeight = 0;
      const elementPosition = exhibitorPackageSectionRef.current.offsetTop;
      const offsetPosition = elementPosition - navbarHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
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

  const callMediaHelperListApi = () => {
    const requestOptions = {
      method: "GET",
    };
    fetch(`https://harsh7541.pythonanywhere.com/admin1/mediapagehelpers`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.status) {
          setMediaPageHelpersList(data["mediaPageHelpers"]);
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

  const callSponsorPackageListApi = () => {
    const requestOptions = {
      method: "GET",
    };
    fetch(`https://harsh7541.pythonanywhere.com/admin1/sponsorpackages`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.status) {
          setSponsorPackageList(data["sponsorPackageTypes"]);
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

  const callSponsorPageDataApi = () => {
    const requestOptions = {
      method: "GET",
    };
    fetch(`https://harsh7541.pythonanywhere.com/admin1/getsponsorpagedata`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.status) {
          setSponsorPageData(data["sponsorPageStaticData"]);
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

  useEffect(() => {
    if (sponsorPageData?.length > 0) {
      setParaDes(
        sponsorPageData[0]?.introParaDescription?.replace(/^"(.*)"$/, "$1")
      );
    }
    // eslint-disable-next-line
  }, [sponsorPageData]);

  const sliderRef = useRef(null);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1180,
        settings: { slidesToShow: 5 },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 799,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 599,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 420,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const sponsorPackages = [
    {
      title: "Lanyard Sponsor",
      price: "USD 1750",
      description:
        "Your logo on every lanyard creating constant brand presence all around the venue.",
    },
    {
      title: "Name Badge Sponsor",
      price: "USD 1450",
      description:
        "Place your brand front and center on every attendee badge for high visibility.",
    },
    {
      title: "Exclusive Email Blast",
      price: "USD 1750",
      description:
        "Send your message directly to delegates with exclusive exposure.",
    },
    {
      title: "Pull-up Banner Placement",
      price: "USD 750",
      description:
        "Get seen in high-traffic zones with bold, upright branding.",
    },
    {
      title: "Drinks Reception Sponsor",
      price: "USD 1450",
      description:
        "Toast to your brand during the most social part of the event.",
    },
    {
      title: "Luncheon Sponsor",
      price: "USD 1250",
      description:
        "Feature your brand alongside the buffet everyone looks forward to.",
    },
    {
      title: "Break Sponsor",
      price: "USD 500",
      description: "Be the name they see when they grab coffee or snack.",
    },
    {
      title: "Raffle Draw Sponsor",
      price: "USD 950",
      description: "Create buzz and get noticed while attendees win prizes.",
    },
    {
      title: "Delegate Pack Sponsor",
      price: "USD 1250",
      description:
        "Stay top of mind with your logo on materials everyone receives.",
    },
    {
      title: "Insertion in Delegate Packs",
      price: "USD 750",
      description: "Put your flyer, promo or gift directly into every hands.",
    },
    {
      title: "Placement on Seats",
      price: "USD 950",
      description: "Your brand gets noticed before the session even begins.",
    },
    {
      title: "Larger Logo on Website",
      price: "USD 500",
      description:
        "Stand out online with a bigger, more prominent logo placement.",
    },
  ];

  const testimonialImage = [
    Testimonials3,
    Testimonials4,
    Testimonials5,
    Testimonials6,
  ];

  const testimonials = [
    {
      name: "Cor Merks",
      company: "Ramboll",
      quote: "Very on-topic approach. Excellent networking opportunities.",
    },
    {
      name: "Kelbij star",
      company: "Deltares",
      quote: "I met new parties that were active in this sector.",
    },
    {
      name: "Steve Kaye",
      company: "UKWIR",
      quote:
        "It was a great showcase of cutting-edge technologies, with chances to network globally.",
    },
    {
      name: "Matthijs Stel",
      company: "Evides",
      quote:
        "It offered ideas for applying new technologies across the entire water industry value chain.",
    },
    {
      name: "Przemysław Zakościelny",
      company: "vonRoll Infratec (services) AG",
      quote:
        "It was an excellent opportunity to explore solutions and participate in meaningful discussions.",
    },
    {
      name: "David Hurley",
      company: "AVK UK",
      quote:
        "It proved fantastic for sharing knowledge and discovering innovative products.",
    },
  ];

  const allowedRow1and3Indexes = [0, 3]; // Testimonials3 & Testimonials6
  const allowedRow2Indexes = [1, 2]; // Testimonials4 & Testimonials5

  const [index13, setIndex13] = useState(0); // For row 1 and 3
  const [row2Left, setRow2Left] = useState(0);
  const [row2Right, setRow2Right] = useState(1);

  useEffect(() => {
    // Row 1 and 3 update every 5s
    const interval13 = setInterval(() => {
      setIndex13((prev) => (prev + 1) % allowedRow1and3Indexes.length);
    }, 5000);

    // Row 2 starts after 5s, then updates every 8s
    const timeout2 = setTimeout(() => {
      const updateRow2 = () => {
        let left = Math.floor(Math.random() * allowedRow2Indexes.length);
        let right;
        do {
          right = Math.floor(Math.random() * allowedRow2Indexes.length);
        } while (right === left); // Ensure different images

        setRow2Left(left);
        setRow2Right(right);
      };

      updateRow2(); // Initial update at 5s

      const interval2 = setInterval(updateRow2, 8000); // Every 8s after that

      // Cleanup interval2 only
      const cleanup = () => clearInterval(interval2);
      window.addEventListener("beforeunload", cleanup);
      return cleanup;
    }, 5000);

    // Cleanup both timers
    return () => {
      clearInterval(interval13);
      clearTimeout(timeout2);
    };
  }, []);

  const row1Index = allowedRow1and3Indexes[index13];
  const row3Index =
    allowedRow1and3Indexes[(index13 + 1) % allowedRow1and3Indexes.length];

  const row1 = testimonials[row1Index];
  const row3 = testimonials[row3Index];
  const row2 = testimonials[allowedRow2Indexes[row2Left]];

  const row1Image = testimonialImage[row1Index];
  const row2ImageLeft = testimonialImage[allowedRow2Indexes[row2Left]];
  const row2ImageRight = testimonialImage[allowedRow2Indexes[row2Right]];
  const row3Image = testimonialImage[row3Index];

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  const {
    homeVideoSettings,
    eventDetails,
    eventGeneralSettings,
    themeSettings,
  } = useApiData();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth <= 991) {
        setSilverActiveTab(true);
        setGoldActiveTab(false);
        setPlatinumActiveTab(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderPrice = (cardPrice) => {
    const position = eventGeneralSettings?.currencyPosition;
    const symbol = eventGeneralSettings?.currencySymbol;
    const price = cardPrice;

    if (position === "Top-Left") {
      return (
        <>
          <sup>{symbol}</sup>
          {price}
        </>
      );
    }

    if (position === "Top-Right") {
      return (
        <>
          {price}
          <sup>{symbol}</sup>
        </>
      );
    }

    if (position === "Bottom-Left") {
      return (
        <>
          <sup style={{ verticalAlign: "sub", marginTop: "18px" }}>{symbol}</sup>
          {price}
        </>
      );
    }

    if (position === "Bottom-Right") {
      return (
        <>
          {price}
          <sup style={{ verticalAlign: "sub", marginTop: "18px" }}>{symbol}</sup>
        </>
      );
    }

    // fallback
    return (
      <>
        <sup>{symbol}</sup>
        {price}
      </>
    );
  };

  const seoTitle = `Bitcoin Innovation & Market Evolution 2026 | Sponsor Plans`;
  const seoDesc = "Explore sponsorship, booths and branding add-ons to boost visibility with decision-makers at Bitcoin Innovation & Market Evolution 2026.";

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDesc} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDesc} />
        <link rel="canonical" href="https://www.bitcoin-innovation-market-evolution.online/sponsor-packages" />
      </Helmet>
      <Navbar forceScrolled />
      <div style={{ opacity: 1 }}>
        <div style={{ marginTop: windowWidth > 1024 ? "120px" : "" }}>
          <article className="SponsorLanding_container__bsWcn">
            <div className="DetailsContainer_wholeContainer__385Iv">
              <div className="DetailsContainer_container__JrWjX">
                <div
                  className="DetailsContainer_imageContainer__ncJwH"
                  style={{
                    backgroundImage: `url(https://www.desalination-resource-recovery.com/images/sponsor-landing.png)`,
                    backgroundSize: "cover",
                  }}
                ></div>
                <div className="DetailsContainer_textContainer__D8Ukb">
                  <h1>
                    Exhibit your services at Bitcoin Innovation & Market Evolution
                    2026
                  </h1>
                  <div className="DetailsContainer_innerContent__6NQGR">
                    <div>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: cleanHtml(paraDes),
                        }}
                      ></p>
                    </div>
                  </div>
                  <button onClick={scrollToExhibitPackage}>SPONSOR NOW</button>
                </div>
              </div>
            </div>
            <div className="SponsorLanding_packagesCotainer__QBljc" ref={exhibitorPackageSectionRef} style={{
              transition: 'margin-top 0.3s ease'
            }}>
              <div>
                <h2>exhibitor packages</h2>
                <p>
                  A cost-effective path to helping you get your message out to
                  existing or new target clients.
                </p>
                <div className="SponsorLanding_packageTableContainer__C2Yxs">
                  <table>
                    <thead>
                      <tr>
                        <th></th>
                        <th>{sponsorPackageList[0]?.sponsorPackageType}</th>
                        <th>{sponsorPackageList[1]?.sponsorPackageType}</th>
                        <th>{sponsorPackageList[2]?.sponsorPackageType}</th>
                      </tr>
                      <tr>
                        <th>Benefits</th>
                        <th>
                          <h2>
                            {/* <sup>USD</sup>
                            {sponsorPackageList[0]?.sponsorPackagePrice} */}
                            {renderPrice(sponsorPackageList[0]?.sponsorPackagePrice)}
                          </h2>
                          <h3>
                            {/* <sup>USD</sup>
                            {sponsorPackageList[0]?.sponsorPackageCuttingPrice} */}
                            {renderPrice(sponsorPackageList[0]?.sponsorPackageCuttingPrice)}
                          </h3>
                        </th>
                        <th>
                          <h2>
                            {/* <sup>USD</sup>
                            {sponsorPackageList[1]?.sponsorPackagePrice} */}
                            {renderPrice(sponsorPackageList[1]?.sponsorPackagePrice)}
                          </h2>
                          <h3>
                            {/* <sup>USD</sup>
                            {sponsorPackageList[1]?.sponsorPackageCuttingPrice} */}
                            {renderPrice(sponsorPackageList[1]?.sponsorPackageCuttingPrice)}
                          </h3>
                        </th>
                        <th>
                          <h2>
                            {/* <sup>USD</sup>
                            {sponsorPackageList[2]?.sponsorPackagePrice} */}
                            {renderPrice(sponsorPackageList[2]?.sponsorPackagePrice)}
                          </h2>
                          <h3>
                            {/* <sup>USD</sup>
                            {sponsorPackageList[2]?.sponsorPackageCuttingPrice} */}
                            {renderPrice(sponsorPackageList[2]?.sponsorPackageCuttingPrice)}
                          </h3>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <span>Premium Delegate Passes</span>
                        </td>
                        <td>
                          <div>{sponsorPackageList[0]?.delegatePassQty}</div>
                        </td>
                        <td>
                          <div>{sponsorPackageList[1]?.delegatePassQty}</div>
                        </td>
                        <td>
                          <div>{sponsorPackageList[2]?.delegatePassQty}</div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>
                            Full access to all conference activities
                            <i>Including drinks reception, post-event presentations viewer</i>
                          </span>
                        </td>
                        <td>
                          <div>
                            <img src={tickImg} alt=""></img>
                          </div>
                        </td>
                        <td>
                          <div>
                            <img src={tickImg} alt=""></img>
                          </div>
                        </td>
                        <td>
                          <div>
                            <img src={tickImg} alt=""></img>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>
                            Your Logo on Conference Website
                            <i>which attracts thousands of unique visitors</i>
                          </span>
                        </td>
                        <td>
                          <div>
                            <img src={tickImg} alt=""></img>
                          </div>
                        </td>
                        <td>
                          <div>
                            <img src={tickImg} alt=""></img>
                          </div>
                        </td>
                        <td>
                          <div>
                            <img src={tickImg} alt=""></img>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>
                            Exhibit Space
                            <i>Includes draped table (approx. 6ft), 2 chairs</i>
                          </span>
                        </td>
                        <td>
                          <div>{sponsorPackageList[0]?.exhibitSpace}</div>
                        </td>
                        <td>
                          <div>{sponsorPackageList[1]?.exhibitSpace}</div>
                        </td>
                        <td>
                          <div>{sponsorPackageList[2]?.exhibitSpace}</div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>Invite Colleagues or Guests at a Discount</span>
                        </td>
                        <td>
                          <div>{sponsorPackageList[0]?.inviteDiscount}</div>
                        </td>
                        <td>
                          <div>{sponsorPackageList[1]?.inviteDiscount}</div>
                        </td>
                        <td>
                          <div>{sponsorPackageList[2]?.inviteDiscount}</div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>
                            Sponsorship level branding on event days
                            <br></br>
                            <i>Logo on signage and holding slides</i>
                          </span>
                        </td>
                        <td>
                          <div>
                            <span>-</span>
                          </div>
                        </td>
                        <td>
                          <div>
                            <img src={tickImg} alt=""></img>
                          </div>
                        </td>
                        <td>
                          <div>
                            <img src={tickImg} alt=""></img>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>Your Logo on Delegate Packs</span>
                        </td>
                        <td>
                          <div>
                            <span>-</span>
                          </div>
                        </td>
                        <td>
                          <div>
                            <img src={tickImg} alt=""></img>
                          </div>
                        </td>
                        <td>
                          <div>
                            <img src={tickImg} alt=""></img>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>
                            Literature Distribution in Delegate Packs
                            <br></br>
                            <i>(materials supplied by you)</i>
                          </span>
                        </td>
                        <td>
                          <div>
                            <span>-</span>
                          </div>
                        </td>
                        <td>
                          <div>
                            <img src={tickImg} alt=""></img>
                          </div>
                        </td>
                        <td>
                          <div>
                            <img src={tickImg} alt=""></img>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>
                            Speaking Slot: 30-minute presentation
                            <i>(subject to editorial approval)</i>
                          </span>
                        </td>
                        <td>
                          <div>
                            <span>-</span>
                          </div>
                        </td>
                        <td>
                          <div>
                            <span>-</span>
                          </div>
                        </td>
                        <td>
                          <div>
                            <img src={tickImg} alt=""></img>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>
                            Conference Chair: Opportunity to Chair the Conference
                            <i>(full scripts will be provided to assist)</i>
                          </span>
                        </td>
                        <td>
                          <div>
                            <span>-</span>
                          </div>
                        </td>
                        <td>
                          <div>
                            <span>-</span>
                          </div>
                        </td>
                        <td>
                          <div>
                            <img src={tickImg} alt=""></img>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>Press Release Email Blast Announcement as Sponsor</span>
                        </td>
                        <td>
                          <div>
                            <span>-</span>
                          </div>
                        </td>
                        <td>
                          <div>
                            <span>-</span>
                          </div>
                        </td>
                        <td>
                          <div>
                            <img src={tickImg} alt=""></img>
                          </div>
                        </td>
                      </tr>
                      <tr></tr>
                      <tr>
                        <td></td>
                        <td>
                          <button onClick={() =>
                            navigate("/sponsor-booking", {
                              state: { selectedPackage: sponsorPackageList[0] },
                            })
                          }>Book your booth</button>
                        </td>
                        <td>
                          <button onClick={() =>
                            navigate("/sponsor-booking", {
                              state: { selectedPackage: sponsorPackageList[1] },
                            })
                          }>Book your booth</button>
                        </td>
                        <td>
                          <button onClick={() =>
                            navigate("/sponsor-booking", {
                              state: { selectedPackage: sponsorPackageList[2] },
                            })
                          }>Book your booth</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="SponsorLanding_packageCardContainer__m+YQm">
                  <div className="SponsorLanding_card__HxPS8" onClick={silverToggleBox}>
                    <h4 style={{ borderBottomLeftRadius: silverActiveTab ? "0px" : "", borderBottomRightRadius: silverActiveTab ? "0px" : "" }}>
                      {sponsorPackageList[0]?.sponsorPackageType}
                      <img src={silverActiveTab ? arrowUp : arrowDown}></img>
                    </h4>
                    {silverActiveTab && (
                      <div className="SponsorLanding_body__rHcET">
                        <div className="SponsorLanding_pricing__l1LD7">
                          <h2>
                            <sup>USD</sup>
                            {sponsorPackageList[0]?.sponsorPackagePrice}
                          </h2>
                          <h3>
                            <sup>USD</sup>
                            {sponsorPackageList[0]?.sponsorPackageCuttingPrice}
                          </h3>
                        </div>
                        <h2>Benefits</h2>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>Premium Delegate Passes</p>
                          <span>{sponsorPackageList[0]?.delegatePassQty}</span>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>
                            Full access to all conference activities
                            <span>Including drinks reception, post-event presentations viewer</span>
                          </p>
                          <img src={tickImg} alt=""></img>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>
                            Your Logo on Conference Website
                            <span>which attracts thousands of unique visitors</span>
                          </p>
                          <img src={tickImg} alt=""></img>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>
                            Exhibit Space
                            <span>Includes draped table (approx. 6ft), 2 chairs</span>
                          </p>
                          <span>{sponsorPackageList[0]?.exhibitSpace}</span>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>Invite Colleagues or Guests at a Discount</p>
                          <span>{sponsorPackageList[0]?.inviteDiscount}</span>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>
                            Sponsorship level branding on event days
                            <span>Logo on signage and holding slides</span>
                          </p>
                          <span>–</span>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>Your Logo on Delegate Packs</p>
                          <span>–</span>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>
                            Literature Distribution in Delegate Packs
                            <span>(materials supplied by you)</span>
                          </p>
                          <span>–</span>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>
                            Speaking Slot: 30-minute presentation
                            <span>(subject to editorial approval)</span>
                          </p>
                          <span>–</span>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>
                            Conference Chair: Opportunity to Chair the Conference
                            <span>(full scripts will be provided to assist)</span>
                          </p>
                          <span>–</span>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>Press Release Email Blast Announcement as Sponsor</p>
                          <span>–</span>
                        </div>
                        <div className="SponsorLanding_btn__QNo2m">
                          <button onClick={() =>
                            navigate("/sponsor-booking", {
                              state: { selectedPackage: sponsorPackageList[0] },
                            })
                          }>book your booth</button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="SponsorLanding_card__HxPS8" onClick={goldToggleBox}>
                    <h4 style={{ backgroundColor: "#f5ae32", borderBottomLeftRadius: silverActiveTab ? "0px" : "", borderBottomRightRadius: silverActiveTab ? "0px" : "" }}>
                      {sponsorPackageList[1]?.sponsorPackageType}
                      <img src={goldActiveTab ? arrowUp : arrowDown}></img>
                    </h4>
                    {goldActiveTab && (
                      <div className="SponsorLanding_body__rHcET">
                        <div className="SponsorLanding_pricing__l1LD7">
                          <h2>
                            <sup>USD</sup>
                            {sponsorPackageList[1]?.sponsorPackagePrice}
                          </h2>
                          <h3>
                            <sup>USD</sup>
                            {sponsorPackageList[1]?.sponsorPackageCuttingPrice}
                          </h3>
                        </div>
                        <h2>Benefits</h2>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>Premium Delegate Passes</p>
                          <span>{sponsorPackageList[1]?.delegatePassQty}</span>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>
                            Full access to all conference activities
                            <span>Including drinks reception, post-event presentations viewer</span>
                          </p>
                          <img src={tickImg} alt=""></img>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>
                            Your Logo on Conference Website
                            <span>which attracts thousands of unique visitors</span>
                          </p>
                          <img src={tickImg} alt=""></img>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>
                            Exhibit Space
                            <span>Includes draped table (approx. 6ft), 2 chairs</span>
                          </p>
                          <span>{sponsorPackageList[1]?.exhibitSpace}</span>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>Invite Colleagues or Guests at a Discount</p>
                          <span>{sponsorPackageList[1]?.inviteDiscount}</span>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>
                            Sponsorship level branding on event days
                            <span>Logo on signage and holding slides</span>
                          </p>
                          <img src={tickImg} alt=""></img>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>Your Logo on Delegate Packs</p>
                          <img src={tickImg} alt=""></img>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>
                            Literature Distribution in Delegate Packs
                            <span>(materials supplied by you)</span>
                          </p>
                          <img src={tickImg} alt=""></img>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>
                            Speaking Slot: 30-minute presentation
                            <span>(subject to editorial approval)</span>
                          </p>
                          <span>–</span>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>
                            Conference Chair: Opportunity to Chair the Conference
                            <span>(full scripts will be provided to assist)</span>
                          </p>
                          <span>–</span>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>Press Release Email Blast Announcement as Sponsor</p>
                          <span>–</span>
                        </div>
                        <div className="SponsorLanding_btn__QNo2m">
                          <button onClick={() =>
                            navigate("/sponsor-booking", {
                              state: { selectedPackage: sponsorPackageList[1] },
                            })
                          }>book your booth</button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="SponsorLanding_card__HxPS8" onClick={platinumToggleBox}>
                    <h4 style={{ backgroundColor: "#4e4e4e", borderBottomLeftRadius: silverActiveTab ? "0px" : "", borderBottomRightRadius: silverActiveTab ? "0px" : "" }}>
                      {sponsorPackageList[2]?.sponsorPackageType}
                      <img src={platinumActiveTab ? arrowUp : arrowDown}></img>
                    </h4>
                    {platinumActiveTab && (
                      <div className="SponsorLanding_body__rHcET">
                        <div className="SponsorLanding_pricing__l1LD7">
                          <h2>
                            <sup>USD</sup>
                            {sponsorPackageList[2]?.sponsorPackagePrice}
                          </h2>
                          <h3>
                            <sup>USD</sup>
                            {sponsorPackageList[2]?.sponsorPackageCuttingPrice}
                          </h3>
                        </div>
                        <h2>Benefits</h2>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>Premium Delegate Passes</p>
                          <span>{sponsorPackageList[2]?.delegatePassQty}</span>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>
                            Full access to all conference activities
                            <span>Including drinks reception, post-event presentations viewer</span>
                          </p>
                          <img src={tickImg} alt=""></img>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>
                            Your Logo on Conference Website
                            <span>which attracts thousands of unique visitors</span>
                          </p>
                          <img src={tickImg} alt=""></img>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>
                            Exhibit Space
                            <span>Includes draped table (approx. 6ft), 2 chairs</span>
                          </p>
                          <span>{sponsorPackageList[2]?.exhibitSpace}</span>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>Invite Colleagues or Guests at a Discount</p>
                          <span>{sponsorPackageList[2]?.inviteDiscount}</span>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>
                            Sponsorship level branding on event days
                            <span>Logo on signage and holding slides</span>
                          </p>
                          <img src={tickImg} alt=""></img>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>Your Logo on Delegate Packs</p>
                          <img src={tickImg} alt=""></img>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>
                            Literature Distribution in Delegate Packs
                            <span>(materials supplied by you)</span>
                          </p>
                          <img src={tickImg} alt=""></img>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>
                            Speaking Slot: 30-minute presentation
                            <span>(subject to editorial approval)</span>
                          </p>
                          <img src={tickImg} alt=""></img>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>
                            Conference Chair: Opportunity to Chair the Conference
                            <span>(full scripts will be provided to assist)</span>
                          </p>
                          <img src={tickImg} alt=""></img>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>Press Release Email Blast Announcement as Sponsor</p>
                          <img src={tickImg} alt=""></img>
                        </div>
                        <div className="SponsorLanding_btn__QNo2m">
                          <button onClick={() =>
                            navigate("/sponsor-booking", {
                              state: { selectedPackage: sponsorPackageList[2] },
                            })
                          }>book your booth</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="LogoSlider_container__KG1H5">
              <h2>INDUSTRY-LEADING PARTICIPANTS AT OUR SHOWS</h2>
              <div className="LogoSlider_innerContainer__Z+wZ7 logo-slider">
                {/* Left Button */}
                <button
                  aria-label="Move slider to left"
                  onClick={() => sliderRef.current.slickPrev()}
                >
                  <img
                    src={leftArrowIcon}
                    alt="left arrow icon"
                    loading="lazy"
                    width="20"
                    height="20"
                  />
                </button>

                {/* Slider */}
                <div>
                  <Slider ref={sliderRef} {...settings}>
                    {logoList.map((logo, index) => (
                      <img
                        key={index}
                        src={logo?.logoLink}
                        alt="Sponsor's Logo"
                        loading="lazy"
                        width="200"
                        height="90"
                        style={{
                          width: "100%",
                          display: "inline-block",
                        }}
                      />
                    ))}
                  </Slider>
                </div>

                {/* Right Button */}
                <button
                  aria-label="Move slider to left"
                  onClick={() => sliderRef.current.slickNext()}
                >
                  <img
                    src={rightArrowIcon}
                    alt="right arrow icon"
                    loading="lazy"
                    width="20"
                    height="20"
                  />
                </button>
              </div>
            </div>

            <div className="SponsorLanding_sponsorshipOptions__DX3F6">
              <h2>BRanding Add-ons</h2>
              <p>
                Boost your visibility with a range of branding add-ons such as
                lanyards, name badges, banner placements, delegate pack inserts,
                and logo placement on event materials. Available to all
                exhibitors, attendees, and partners.
              </p>
              <div>
                {sponsorPackages.map((pkg, index) => (
                  <div className="SponsorshipCard_container__ORwTn">
                    <div className="SponsorshipCard_col__PW1v-">
                      <h3 className="SponsorshipCard_title__wzsXt">
                        {pkg.title}
                      </h3>
                    </div>
                    <div className="SponsorshipCard_col__PW1v-">
                      <p className="SponsorshipCard_price__T0xxu">
                        {pkg.price}
                      </p>
                    </div>
                    <div className="SponsorshipCard_col__PW1v-">
                      <p className="SponsorshipCard_description__0NABR">
                        {pkg.description}
                      </p>
                    </div>
                    <div className="SponsorshipCard_button-wrapper__68ouN">
                      <a
                        href="mailto:person1@abcd.com?subject=I'm%20interested%20in%20Sponsorship%20%E2%80%93%20NAME%20BADGE%20SPONSOR%20%E2%80%93%20WDRM"
                        class="SponsorshipCard_button__3kvwB"
                      >
                        I'M INTERESTED
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <TestimonialCarousel />
            </div>
            {/* <section className="networking-section">
            <div className="container">
              <h2 className="text-black text-[30px] font-extrabold my-12 p-0 text-center uppercase">
                they've attended our events
              </h2>

              <div className="row">
                <div className="col-md-8">
                  <img
                    src={row1Image}
                    alt={row1.name}
                    className="w-100 h-100"
                  />
                </div>
                <div className="col-md-4 p-0">
                  <div className="testimonial-section w-100 h-100">
                    <div className="p-5">
                      <div className="testimonial-text">{row1.quote}</div>
                      <div className="testimonial-author">{row1.name}</div>
                      <div className="testimonial-company">{row1.company}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <img
                    src={row2ImageLeft}
                    alt="Left image"
                    className="w-100 h-100"
                  />
                </div>
                <div className="col-md-4 p-0">
                  <div className="testimonial-section w-100 h-100">
                    <div className="p-5">
                      <div className="testimonial-text">{row2.quote}</div>
                      <div className="testimonial-author">{row2.name}</div>
                      <div className="testimonial-company">{row2.company}</div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <img
                    src={row2ImageRight}
                    alt="Right image"
                    className="w-100 h-100"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-4 p-0">
                  <div className="testimonial-section w-100 h-100">
                    <div className="p-5">
                      <div className="testimonial-text">{row3.quote}</div>
                      <div className="testimonial-author">{row3.name}</div>
                      <div className="testimonial-company">{row3.company}</div>
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                  <img
                    src={row3Image}
                    alt={row3.name}
                    className="w-100 h-100"
                  />
                </div>
              </div>
            </div>
          </section> */}

            <section className="SponsorLanding_contactContainer__hipqh">
              <h2>Get in touch to Book Your Trade Show Booth</h2>
              <div>
                {mediaPageHelpersList.map((item, index) => (
                  <div className="SponsorLanding_contactCard__E6LJD">
                    <h5>{item?.companyPersonName}</h5>
                    <p>
                      <img src={emailIcon} alt="emil icon"></img>
                      <a
                        href={`mailto:${item?.companyPersonEmail}?subject=Desalination &amp; Resource Recovery 2025`}
                        className="MediaScreen_email__vpDbe"
                      >
                        {item?.companyPersonEmail}
                      </a>
                    </p>
                    <p>
                      <img src={phoneIcon} alt="Phone Icon"></img>
                      <a href={`tel:${item?.companyPersonPhone}`}>
                        {item?.companyPersonPhone}
                      </a>
                    </p>
                  </div>
                ))}
              </div>
            </section>
            {/* <section
            class="contact-section_mediaPartbers"
            style={{ backgroundColor: "#ffffff" }}
          >
            <div class="container">
              <div class="row justify-content-center">
                <div class="col-lg-10">
                  <h2
                    class="contact-heading_mediaPartbers"
                    style={{ fontSize: "30px" }}
                  >
                    GET IN TOUCH TO BOOK YOUR TRADE SHOW BOOTH
                  </h2>

                  <div class="row g-4">
                    <div class="col-md-6 ">
                      <div class="contact-card_mediaPartbers">
                        <h3 class="contact-name_mediaPartbers pb-1 text-capitalize">
                          LEE NAVARRO
                        </h3>
                        <div class="contact-info_mediaPartbers">
                          <i class="fas fa-envelope"></i>
                          <a href="mailto:lee.navarro@big-hub.com">
                            lee.navarro@big-hub.com
                          </a>
                        </div>
                        <div class="contact-info_mediaPartbers">
                          <i class="fas fa-phone"></i>
                          <a href="tel:+12065820128">+1 206 582 0128</a>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6 ">
                      <div class="contact-card_mediaPartbers">
                        <h3 class="contact-name_mediaPartbers pb-1 text-capitalize">
                          Sean Collins
                        </h3>
                        <div class="contact-info_mediaPartbers">
                          <i class="fas fa-envelope"></i>
                          <a href="mailto:lee.navarro@big-hub.com">
                            lee.navarro@big-hub.com
                          </a>
                        </div>
                        <div class="contact-info_mediaPartbers">
                          <i class="fas fa-phone"></i>
                          <a href="tel:+12065820128">+1 206 582 0128</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section> */}
          </article>
        </div>
      </div>
      <SubscribeForm />
      <Footer />
    </>
  );
};
export default ExhibitorPackages;
