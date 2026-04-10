import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./assets/css/footer.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSSRData } from "./common/useSSRData";
const emailImage =
  "https://www.desalination-resource-recovery.com/images/icons/icon-mail.png";
const linkedInIcon =
  "https://www.desalination-resource-recovery.com/images/icons/icon-linkedin.png";

const Footer = () => {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );
  const [socialMediaData, setSocialMediaData] = useState([]);
  const [relatedEventList, setRelatedEventList] = useState([]);
  const [linkedin, setLinkedin] = useState("");
  console.log("linkedin: ", linkedin);
  const [email, setEmail] = useState("");
  const sponsors = useSSRData("sponsors") || [];
  const news = useSSRData("news") || [];
  const speakers = useSSRData("speakers") || [];
  const trends = useSSRData("trends") || [];
  const [footerNavOptions, setFooterNavOptions] = useState([]);

  const toSlug = (str) =>
    (str || "")
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    callSocialMediaOptionsApi();
    callRelatedEventListApi();
    callFooterOptionsApi();
    // eslint-disable-next-line
  }, []);
  const callSocialMediaOptionsApi = () => {
    const requestOptions = {
      method: "GET",
    };
    fetch(
      `https://harsh7541.pythonanywhere.com/admin1/footersocialmediaoptions`,
      requestOptions,
    )
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
          setSocialMediaData(data["footerSocialMediaOptions"]);
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

  const callRelatedEventListApi = () => {
    const requestOptions = {
      method: "GET",
    };
    fetch(
      `https://harsh7541.pythonanywhere.com/admin1/relatedevents`,
      requestOptions,
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data.status) {
          setRelatedEventList(data["relatedEvents"]);
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

  const callFooterOptionsApi = () => {
    fetch(`https://harsh7541.pythonanywhere.com/admin1/footeroptions`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.status) {
          const checked = data.footerOptions.filter(
            (item) => item.isChecked === "Yes",
          );
          setFooterNavOptions(checked);
        } else {
          toast.error(data?.message);
        }
      })
      .catch(() => {
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
    setLinkedin(socialMediaData[0]?.linkedinLink);
    setEmail(socialMediaData[0]?.emailLink);

    // eslint-disable-next-line
  }, [socialMediaData]);

  // Responsive breakpoints
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const isDesktop = windowWidth >= 1024;

  // Dynamic styles
  const footerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    margin: "0 auto",
    paddingTop: isMobile ? "40px" : isTablet ? "60px" : "100px",
    paddingLeft: isMobile ? "20px" : "0",
    paddingRight: isMobile ? "20px" : "0",
  };

  const containerStyle = {
    width: "100%",
    maxWidth: isMobile ? "100%" : isTablet ? "1200px" : "1400px",
  };

  const topSectionStyle = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    justifyContent: "flex-start",
    marginBottom: isMobile ? "30px" : "50px",
    overflow: "visible",
  };

  const logoContainerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: isMobile ? "center" : "flex-start",
    maxHeight: "68px",
    overflow: "visible",
    position: "relative",
    width: isMobile ? "100%" : "24%",
    marginBottom: isMobile ? "30px" : "0",
  };

  const logoStyle = {
    cursor: "pointer",
    height: "auto",
    maxWidth: isMobile ? "120px" : "150px",
    minWidth: isMobile ? "80px" : "100px",
    objectFit: "contain",
    width: "100%",
  };

  const navContainerStyle = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    justifyContent: "space-between",
    maxHeight: isMobile ? "auto" : "68px",
    width: isMobile ? "100%" : "71%",
    gap: isMobile ? "20px" : "0",
  };

  const navColumnStyle = {
    display: "flex",
    flexDirection: "column",
    width: isMobile ? "100%" : "auto",
  };

  const navLinkStyle = {
    color: "white",
    fontSize: isMobile ? "13px" : "14px",
    fontWeight: "bold",
    lineHeight: isMobile ? "30px" : "35px",
    textDecoration: "none",
    textTransform: "uppercase",
  };

  const dividerStyle = {
    borderBottom: "1px solid #5e5e5e",
    margin: "0",
    padding: "0",
    width: "100%",
  };

  const middleSectionStyle = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    justifyContent: "flex-start",
    paddingTop: isMobile ? "30px" : "52px",
    paddingBottom: isMobile ? "40px" : "60px",
  };

  const socialContainerStyle = {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: isMobile ? "center" : "flex-start",
    paddingLeft: isMobile ? "0" : "5px",
    width: isMobile ? "100%" : "24%",
    marginBottom: isMobile ? "30px" : "0",
  };

  const socialIconStyle = {
    height: "30px",
    width: "30px",
    marginRight: "16px",
  };

  const contentContainerStyle = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: isMobile ? "100%" : "71%",
    gap: isMobile ? "30px" : "0",
  };

  const contentColumnStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: isMobile ? "100%" : "auto",
  };

  const sectionHeadingStyle = {
    color: "white",
    fontSize: "16px",
    fontWeight: "800",
    marginBottom: "25px",
    whiteSpace: isMobile ? "normal" : "nowrap",
  };

  const contentLinkStyle = {
    color: "white",
    fontSize: isMobile ? "13px" : "14px",
    fontWeight: "500",
    lineHeight: isMobile ? "35px" : "40px",
    margin: "0",
    textDecoration: "none",
    textTransform: "uppercase",
    pointerEvents: "auto",
  };

  const bottomSectionStyle = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    alignItems: isMobile ? "flex-start" : "center",
    justifyContent: "space-between",
    margin: "25px 0",
    gap: isMobile ? "15px" : "0",
  };

  const bottomTextStyle = {
    color: "white",
    fontSize: isMobile ? "12px" : "14px",
    margin: "0",
    padding: "0",
    marginBottom: isMobile ? "0" : "18px",
  };

  const bottomLinkStyle = {
    color: "white",
    textDecoration: "none",
  };

  const lessThen1023 = windowWidth <= 1023;

  return (
    <footer className="Footer_footer__YOvWG">
      <div className="Footer_Footercontainer__PLGWA">
        <div className="Footer_footerUpperContainer__crT6t">
          <div className="Footer_footerLogo__6mJFB">
            <div className="lazyload-wrapper ">
              <a href="/" style={{ textDecoration: "none", color: "inherit" }}>
                <img
                  src="https://harsh7541.pythonanywhere.com/media/mediabitcoin_logo_white.png"
                  alt="Bitcoin Innovation & Market EvolutionLogo"
                  height={64}
                ></img>
              </a>
            </div>
          </div>
          {/* <div className="Footer_footerNav__ipo0e">
            <div className="Footer_footerNavItem__k2FUW">
              <a href="/">Event Details</a>
              <a href="/speakers">Speakers</a>
            </div>
            <div className="Footer_footerNavItem__k2FUW">
              <a href="/sponsors">Sponsors</a>
              <a href="/venue">Venue</a>
            </div>
            {lessThen1023 ? (
              <>
                <div className="Footer_footerNavItem__k2FUW">
                  <a href="/agenda">Program</a>
                </div>
                <div className="Footer_footerNavItem__k2FUW">
                  <a href="/who-should-attend">Benefits</a>
                </div>
              </>
            ) : (
              <div className="Footer_footerNavItem__k2FUW">
                <a href="/agenda">Program</a>
                <a href="/who-should-attend">Benefits</a>
              </div>
            )}

            <div className="Footer_footerNavItem__k2FUW">
              <a href="/media-partners">Media</a>
              <a href="/contact-us">Contact Us</a>
            </div>
            <div className="Footer_footerNavItem__k2FUW">
              <a href="/venue#gallery">Gallery</a>
              <a href="/faq">FAQ</a>
            </div>
          </div> */}
          <div className="Footer_footerNav__ipo0e">
            {Array.from(
              { length: Math.ceil(footerNavOptions.length / 2) },
              (_, colIndex) => {
                const colItems = footerNavOptions.slice(
                  colIndex * 2,
                  colIndex * 2 + 2,
                );

                // On mobile (<= 1023), split paired items into separate divs
                if (lessThen1023 && colItems.length === 2) {
                  return (
                    <React.Fragment key={colIndex}>
                      <div className="Footer_footerNavItem__k2FUW">
                        <a href={colItems[0].footerOptionsPath}>
                          {colItems[0].footerOptionsName}
                        </a>
                      </div>
                      <div className="Footer_footerNavItem__k2FUW">
                        <a href={colItems[1].footerOptionsPath}>
                          {colItems[1].footerOptionsName}
                        </a>
                      </div>
                    </React.Fragment>
                  );
                }

                return (
                  <div className="Footer_footerNavItem__k2FUW" key={colIndex}>
                    {colItems.map((item) => (
                      <a key={item.id} href={item.footerOptionsPath}>
                        {item.footerOptionsName}
                      </a>
                    ))}
                  </div>
                );
              },
            )}
          </div>
        </div>
        <div className="Footer_hr__LZlee"></div>
        <div className="Footer_footerLowerContainer__+0Ffv">
          <div className="Footer_footerIconsContainer__CAONl">
            <a
              target="_blank"
              href={`mailto:${email}?subject=Bitcoin Innovation & Market Evolution 2026`}
            >
              <img
                src={emailImage}
                alt="Email icon"
                width={20}
                height={20}
              ></img>
            </a>
            <a target="blank" href={linkedin}>
              <img
                src={linkedInIcon}
                alt="LinkedIn"
                width={20}
                height={20}
              ></img>
            </a>
          </div>
          <div className="Footer_footerQuickLinksContainer__ToAiG">
            <div className="Footer_footerQuickLinks__dTpfQ undefined">
              <h5>OTHER EVENTS</h5>
              {relatedEventList.map((event, index) => (
                <a
                  target="_blank"
                  href={event?.eventWebsiteLink}
                  style={{ textTransform: "uppercase", pointerEvents: "auto" }}
                >
                  {event?.eventName}
                </a>
              ))}
            </div>
            <div className="Footer_footerQuickLinks__dTpfQ">
              <h5>QUICK LINKS</h5>
              <a target="_blank" href="/booking">
                Register
              </a>
              <a target="_blank" href="/who-should-attend">
                Benefits
              </a>
              <a target="_blank" href="/remind-me-later">
                Remind Me
              </a>
            </div>
            <div className="Footer_footerQuickLinks__dTpfQ">
              <h5>CONTACT US</h5>
              <a
                target="_blank"
                href="mailto:delegates@abcd.com?subject=Bitcoin Innovation & Market Evolution 2026"
              >
                Email
              </a>
              <a href="/pay-online">Pay Online</a>
              <a target="_blank" href="/terms-and-conditions">
                Terms and Conditions
              </a>
            </div>
          </div>
        </div>
        <div className="Footer_hr__LZlee"></div>
        <div className="Footer_footerBottom__ZgyOV">
          <p>
            <a href="/privacy-policy">Privacy Policy</a>
            <span> | </span>
            ABCD Company
          </p>
          <p>©2026 Bitcoin Innovation & Market Evolution 2026</p>
        </div>
        <div
          style={{
            visibility: "hidden",
            height: 0,
            overflow: "hidden",
            position: "absolute",
          }}
        >
          {/* Universal Hubs */}
          <a href="/news">News Hub</a>
          <a href="/featured-speakers">Featured Speakers Hub</a>
          <a href="/sponsor-packages">Sponsorship Packages Hub</a>
          <a href="/attandees">Attendees Hub</a>
          <a href="/sponsor-booking">Sponsor Booking Hub</a>
          <a href="/featuredSpeaker">Featured Speaker Hub</a>

          {/* Dynamic Slugs Harvested from SSR Data */}
          {sponsors.map((s, i) => (
            <a
              key={`seosp-${i}`}
              href={`/sponsor/${toSlug(s.sponsorComapnyName)}`}
            >
              {s.sponsorComapnyName}
            </a>
          ))}
          {news.map((n, i) => (
            <a
              key={`seonw-${i}`}
              href={`/newsdescription/${toSlug(n.newsTitle)}`}
            >
              {n.newsTitle}
            </a>
          ))}
          {speakers.map((s, i) => (
            <a
              key={`seosk-${i}`}
              href={`/speakerprofile/${(s.eventSpeakerName || "").toLowerCase().replace(/\s+/g, "-")}`}
            >
              {s.eventSpeakerName}
            </a>
          ))}
          {trends.map((t, i) => (
            <a
              key={`seotr-${i}`}
              href={`/trenddescription/${(t.trendTitle || "").replace(/\s+/g, "-")}`}
            >
              {t.trendTitle}
            </a>
          ))}
        </div>
      </div>
    </footer>
    // <footer style={footerStyle}>
    //   <div style={containerStyle}>
    //     {/* Top Section - Logo and Navigation */}
    //     <div style={topSectionStyle}>
    //       <div style={logoContainerStyle}>
    //         <div>
    //           <img
    //             style={logoStyle}
    //             src="https://www.desalination-resource-recovery.com/api/images/logo/1742534509561.png"
    //             alt="WDRM Logo"
    //             height={64}
    //           />
    //         </div>
    //       </div>
    //       <div style={navContainerStyle}>
    //         <div style={navColumnStyle}>
    //           <a style={navLinkStyle} onClick={() => navigate("/")}>
    //             Event Details
    //           </a>
    //           <a style={navLinkStyle} onClick={() => navigate("/speakers")}>
    //             Speakers
    //           </a>
    //         </div>
    //         <div style={navColumnStyle}>
    //           <a style={navLinkStyle} onClick={() => navigate("/sponsor")}>
    //             Sponsors
    //           </a>
    //           <a style={navLinkStyle} onClick={() => navigate("/venue")}>
    //             Venue
    //           </a>
    //         </div>
    //         <div style={navColumnStyle}>
    //           <a style={navLinkStyle} onClick={() => navigate("/agenda")}>
    //             Program
    //           </a>
    //           <a style={navLinkStyle} onClick={() => navigate("/who-should-attend")}>
    //             Benefits
    //           </a>
    //         </div>
    //         <div style={navColumnStyle}>
    //           <a style={navLinkStyle} onClick={() => navigate("/media-partners")}>
    //             Media
    //           </a>
    //           <a style={navLinkStyle} onClick={() => navigate("/contact-us")}>
    //             Contact Us
    //           </a>
    //         </div>
    //         <div style={navColumnStyle}>
    //           <a style={navLinkStyle} onClick={() => navigate("/venue")}>
    //             Gallery
    //           </a>
    //           <a style={navLinkStyle} onClick={() => navigate("/faqs")}>
    //             FAQ
    //           </a>
    //         </div>
    //       </div>
    //     </div>

    //     <div style={dividerStyle}></div>

    //     {/* Middle Section - Social Icons and Content */}
    //     <div style={middleSectionStyle}>
    //       <div style={socialContainerStyle}>
    //         <a
    //           target="_blank"
    //           href="mailto:delegates@abcd.com?subject=Bitcoin Innovation & Market Evolution 2026"
    //           style={{ marginRight: '16px', textDecoration: 'none' }}
    //         >
    //           <img
    //             style={socialIconStyle}
    //             src="https://www.desalination-resource-recovery.com/images/icons/icon-mail.png"
    //             alt="Email"
    //             width={20}
    //             height={20}
    //           />
    //         </a>
    //         <a
    //           target="_blank"
    //           href="https://www.linkedin.com/showcase/smart-water-utilities/"
    //           style={{ marginRight: '0px', textDecoration: 'none' }}
    //         >
    //           <img
    //             style={socialIconStyle}
    //             src="https://www.desalination-resource-recovery.com/images/icons/icon-linkedin.png"
    //             alt="LinkedIn"
    //             width={20}
    //             height={20}
    //           />
    //         </a>
    //       </div>

    //       <div style={contentContainerStyle}>
    //         <div style={{ ...contentColumnStyle, width: isMobile ? '100%' : '50%' }}>
    //           <h5 style={sectionHeadingStyle}>
    //             OTHER EVENTS
    //           </h5>
    //           <a
    //             style={contentLinkStyle}
    //             href="https://www.water-resource-recovery.com/"
    //             target="_blank"
    //           >
    //             Water Resource Recovery USA 2025
    //           </a>
    //           <a
    //             style={contentLinkStyle}
    //             href="https://www.membrane-technology-show.com/"
    //             target="_blank"
    //           >
    //             Membrane Technology USA 2025
    //           </a>
    //           <a
    //             style={contentLinkStyle}
    //             href="https://www.europe.pfas-summit.com/"
    //             target="_blank"
    //           >
    //             PFAS Treatment Europe 2025
    //           </a>
    //         </div>

    //         <div style={contentColumnStyle}>
    //           <h5 style={sectionHeadingStyle}>
    //             QUICK LINKS
    //           </h5>
    //           <a style={contentLinkStyle} href="/booking">
    //             Register
    //           </a>
    //           <a style={contentLinkStyle} href="/who-should-attend">
    //             Benefits
    //           </a>
    //           <a style={contentLinkStyle} href="/faqs">
    //             FAQ
    //           </a>
    //         </div>

    //         <div style={contentColumnStyle}>
    //           <h5 style={sectionHeadingStyle}>
    //             CONTACT US
    //           </h5>
    //           <a
    //             style={contentLinkStyle}
    //             href="mailto:delegates@abcd.com?subject=Bitcoin Innovation & Market Evolution 2026"
    //           >
    //             Email
    //           </a>
    //           <a style={contentLinkStyle} href="/contact-us">
    //             Customer Support
    //           </a>
    //           <a style={contentLinkStyle} href="/terms-and-conditions">
    //             Terms and Conditions
    //           </a>
    //         </div>
    //       </div>
    //     </div>

    //     <div style={dividerStyle}></div>

    //     {/* Bottom Section - Copyright */}
    //     <div style={bottomSectionStyle}>
    //       <p style={bottomTextStyle}>
    //         <a style={bottomLinkStyle} href="/privacy-policy">
    //           Privacy Policy
    //         </a>
    //         <span style={{ color: 'white', margin: '0 3px' }}> | </span>
    //         ABCD Company
    //       </p>
    //       <p style={bottomTextStyle}>
    //         @2025 Desalination & Resource Recovery
    //       </p>
    //     </div>
    //   </div>
    // </footer>
  );
};

export default Footer;