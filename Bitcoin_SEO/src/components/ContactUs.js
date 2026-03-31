import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import SubscribeForm from "./SubscribeForm";
import Footer from "../Footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/css/contactUs.css";
import { Helmet } from "react-helmet-async";
const emailImage =
  "https://www.desalination-resource-recovery.com/images/icons/icon-email.png";
const emailIcon =
  "https://www.desalination-resource-recovery.com/images/icons/msg.png";

const ContactUs = () => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );
  const [helpersList, setHelpersList] = useState([]);
  const [personName, setPersonName] = useState("");
  console.log("personName: ", personName);
  const [personNameError, setPersonNameError] = useState("");
  const [personCompany, setPersonCompany] = useState("");
  console.log("personCompany: ", personCompany);
  const [personCompanyError, setPersonCompanyError] = useState("");
  const [personEmail, setPersonEmail] = useState("");
  console.log("personEmail: ", personEmail);
  const [personEmailError, setPersonEmailError] = useState("");
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [personMobile, setPersonMobile] = useState("");
  console.log("personMobile: ", personMobile);
  const [personMobileError, setPersonMobileError] = useState("");
  const [message, setMessage] = useState("");
  console.log("message: ", message);
  const [reason, setReason] = useState([]);
  console.log("reason: ", reason);
  const [contactUsPageData, setContactUsPageData] = useState([]);
  const [emailDes, setEmailDes] = useState("");
  const subject = encodeURIComponent(
    "Bitcoin Innovation & Market Evolution 2026",
  );
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    callHelperListApi();
    callContactUsPageDataApi();
    // eslint-disable-next-line
  }, []);

  const callHelperListApi = () => {
    const requestOptions = {
      method: "GET",
    };
    fetch(
      `https://harsh7541.pythonanywhere.com/admin1/contactushelpers`,
      requestOptions,
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data.status) {
          setHelpersList(data["contactUsHelpers"]);
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

  const callContactUsPageDataApi = () => {
    const requestOptions = {
      method: "GET",
    };
    fetch(
      `https://harsh7541.pythonanywhere.com/admin1/contactusstaticdata`,
      requestOptions,
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data.status) {
          setContactUsPageData(data["contatusPageStaticData"]);
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
    if (contactUsPageData?.length > 0) {
      setEmailDes(
        contactUsPageData[0]?.sectionShortParagraph?.replace(/^"(.*)"$/, "$1"),
      );
    }
    // eslint-disable-next-line
  }, [contactUsPageData]);

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
      },
    );

    return cleaned;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Responsive breakpoints
  const isXSmall = windowWidth < 480;
  const isSmall = windowWidth >= 480 && windowWidth < 768;
  const isMedium = windowWidth >= 768 && windowWidth < 1024;
  const isLarge = windowWidth >= 1024 && windowWidth < 1440;
  const isXLarge = windowWidth >= 1440;

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const isDesktop = windowWidth >= 1024;

  // Dynamic Styles
  const contactFormSectionStyle = {
    paddingTop: isXSmall
      ? "100px"
      : isSmall
        ? "120px"
        : isMedium
          ? "140px"
          : "150px",
    paddingBottom: isXSmall
      ? "50px"
      : isSmall
        ? "60px"
        : isMedium
          ? "80px"
          : "100px",
    backgroundColor: "#080808",
    paddingLeft: isXSmall
      ? "15px"
      : isSmall
        ? "20px"
        : isMedium
          ? "30px"
          : "40px",
    paddingRight: isXSmall
      ? "15px"
      : isSmall
        ? "20px"
        : isMedium
          ? "30px"
          : "40px",
  };

  const containerStyle = {
    margin: "0 auto",
    maxWidth: isXSmall
      ? "100%"
      : isSmall
        ? "100%"
        : isMedium
          ? "900px"
          : isLarge
            ? "1200px"
            : "1400px",
    width: "100%",
  };

  const headingStyle = {
    color: "white",
    fontSize: isXSmall
      ? "20px"
      : isSmall
        ? "24px"
        : isMedium
          ? "30px"
          : isLarge
            ? "36px"
            : "40px",
    fontWeight: "800",
    margin: "0",
    padding: "0",
    textAlign: "center",
    textTransform: "uppercase",
    lineHeight: "1.2",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: isXSmall
      ? "25px"
      : isSmall
        ? "30px"
        : isMedium
          ? "35px"
          : "42px",
  };

  const formRowStyle = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: isXSmall ? "15px" : isSmall ? "18px" : "23px",
    gap: isMobile ? "15px" : isTablet ? "20px" : "30px",
  };

  const inputContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: isMobile ? "100%" : "calc(50% - 15px)",
  };

  const inputStyle = {
    backgroundColor: "white",
    border: "none",
    borderRadius: "2px",
    height: isXSmall ? "44px" : "48px",
    outline: "none",
    padding: isXSmall ? "0 15px" : isSmall ? "0 20px" : "0 23px",
    width: "100%",
    fontSize: isXSmall ? "14px" : isSmall ? "15px" : "16px",
    boxSizing: "border-box",
    fontFamily: "inherit",
  };

  const textareaContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: isXSmall ? "18px" : "23px",
    width: "100%",
  };

  const textareaStyle = {
    border: "none",
    borderRadius: "2px",
    height: isXSmall
      ? "120px"
      : isSmall
        ? "140px"
        : isMedium
          ? "160px"
          : "185px",
    outline: "none",
    padding: isXSmall ? "15px" : isSmall ? "18px" : "20px 23px",
    resize: "none",
    width: "100%",
    fontSize: isXSmall ? "14px" : isSmall ? "15px" : "16px",
    boxSizing: "border-box",
    fontFamily: "inherit",
  };

  const checkboxSectionStyle = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    alignItems: isMobile ? "flex-start" : "center",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "white",
    borderRadius: "2px",
    padding: isXSmall
      ? "15px 10px"
      : isSmall
        ? "18px 15px"
        : isMedium
          ? "20px 25px"
          : "20px 40px 20px 20px",
    gap: isMobile ? "12px" : isTablet ? "15px" : "20px",
  };

  const checkboxContainerStyle = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    alignItems: isMobile ? "flex-start" : "center",
    justifyContent: "space-between",
    width: "100%",
    gap: isMobile ? "12px" : isTablet ? "15px" : "20px",
  };

  const checkboxLabelStyle = {
    color: "#777",
    fontSize: isXSmall ? "12px" : isSmall ? "13px" : "15px",
    fontWeight: "bold",
    whiteSpace: isMobile ? "normal" : "nowrap",
    margin: "0",
  };

  const checkboxItemStyle = {
    display: "flex",
    alignItems: "center",
    gap: isXSmall ? "8px" : "10px",
    width: isMobile ? "100%" : "auto",
  };

  const checkboxInputStyle = {
    width: isXSmall ? "14px" : "16px",
    height: isXSmall ? "14px" : "16px",
    cursor: "pointer",
    flexShrink: 0,
  };

  const submitButtonStyle = {
    backgroundColor: "transparent",
    border: "1px solid hsla(0,0%,100%,0.753)",
    borderRadius: "2px",
    color: "white",
    cursor: "pointer",
    fontSize: isXSmall ? "14px" : isSmall ? "16px" : isMedium ? "18px" : "20px",
    fontWeight: "800",
    height: isXSmall ? "45px" : "50px",
    marginTop: isXSmall ? "25px" : isSmall ? "35px" : "50px",
    minWidth: isXSmall ? "150px" : isSmall ? "180px" : "230px",
    padding: isXSmall ? "0 30px" : isSmall ? "0 40px" : "0 50px",
    textTransform: "uppercase",
    transition: "all 0.3s ease",
  };

  const emailSectionStyle = {
    margin: "0 auto",
    maxWidth: isXSmall
      ? "100%"
      : isSmall
        ? "100%"
        : isMedium
          ? "900px"
          : isLarge
            ? "1200px"
            : "1400px",
    width: "100%",
    paddingTop: isXSmall
      ? "50px"
      : isSmall
        ? "60px"
        : isMedium
          ? "80px"
          : "100px",
    paddingBottom: isXSmall
      ? "40px"
      : isSmall
        ? "50px"
        : isMedium
          ? "65px"
          : "80px",
    paddingLeft: isXSmall
      ? "15px"
      : isSmall
        ? "20px"
        : isMedium
          ? "30px"
          : "40px",
    paddingRight: isXSmall
      ? "15px"
      : isSmall
        ? "20px"
        : isMedium
          ? "30px"
          : "40px",
  };

  const emailHeadingStyle = {
    color: "#181818",
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    fontSize: isXSmall
      ? "20px"
      : isSmall
        ? "24px"
        : isMedium
          ? "30px"
          : isLarge
            ? "36px"
            : "40px",
    fontWeight: "800",
    justifyContent: "center",
    alignItems: "center",
    margin: "0",
    padding: "0",
    textAlign: "center",
    textTransform: "uppercase",
    gap: isXSmall ? "10px" : isSmall ? "15px" : "20px",
  };

  const emailImageStyle = {
    height: "auto",
    width: isXSmall
      ? "35px"
      : isSmall
        ? "40px"
        : isMedium
          ? "50px"
          : isLarge
            ? "58px"
            : "65px",
  };

  const emailDescriptionStyle = {
    color: "#181818",
    fontSize: isXSmall ? "13px" : isSmall ? "14px" : isMedium ? "15px" : "16px",
    fontWeight: "600",
    lineHeight: "1.6",
    marginTop: isXSmall
      ? "20px"
      : isSmall
        ? "25px"
        : isMedium
          ? "30px"
          : "38px",
    marginBottom: isXSmall
      ? "25px"
      : isSmall
        ? "30px"
        : isMedium
          ? "35px"
          : "43px",
    textAlign: "center",
    width: isXSmall ? "98%" : isSmall ? "95%" : "91%",
    marginLeft: "auto",
    marginRight: "auto",
  };

  const emailCardsContainerStyle = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    maxWidth: "1240px",
    width: "100%",
    gap: isXSmall ? "15px" : isSmall ? "18px" : isMedium ? "20px" : "2%",
  };

  const emailCardStyle = {
    backgroundColor: "#080808",
    borderRadius: "2px",
    marginBottom: isXSmall ? "15px" : "20px",
    padding: isXSmall
      ? "20px 15px"
      : isSmall
        ? "25px 20px"
        : isMedium
          ? "35px 30px"
          : "45px",
    width: isMobile ? "100%" : isTablet ? "48%" : "49%",
    boxSizing: "border-box",
  };

  const cardTitleStyle = {
    color: "#00baff",
    fontSize: isXSmall
      ? "16px"
      : isSmall
        ? "18px"
        : isMedium
          ? "20px"
          : isLarge
            ? "24px"
            : "26px",
    fontWeight: "800",
    marginBottom: isXSmall ? "15px" : isSmall ? "20px" : "30px",
    padding: "0",
    textAlign: "left",
    textTransform: "uppercase",
    lineHeight: "1.2",
  };

  const cardNameStyle = {
    color: "white",
    fontSize: isXSmall
      ? "16px"
      : isSmall
        ? "18px"
        : isMedium
          ? "20px"
          : isLarge
            ? "22px"
            : "24px",
    fontWeight: "800",
    marginBottom: "5px",
    padding: "0",
    textAlign: "left",
    textTransform: "uppercase",
    lineHeight: "1.2",
  };

  const cardPositionStyle = {
    color: "white",
    fontSize: isXSmall ? "14px" : isSmall ? "16px" : isMedium ? "17px" : "18px",
    fontWeight: "bold",
    marginBottom: "18px",
    padding: "0",
    textAlign: "left",
    lineHeight: "1.3",
  };

  const cardEmailStyle = {
    display: "flex",
    alignItems: "center",
    color: "white",
    fontSize: isXSmall ? "13px" : isSmall ? "14px" : isMedium ? "15px" : "16px",
    fontWeight: "500",
    margin: "0",
    padding: "0",
    textDecoration: "underline",
    wordBreak: "break-all",
    lineHeight: "1.4",
  };

  const emailIconStyle = {
    marginRight: isXSmall ? "10px" : "15px",
    height: "12px",
    width: "18px",
    flexShrink: 0,
  };

  // Event Handlers
  const handleSubmitHover = (e, isHovering) => {
    if (isHovering) {
      e.target.style.backgroundColor = "white";
      e.target.style.color = "#181818";
    } else {
      e.target.style.backgroundColor = "transparent";
      e.target.style.color = "white";
    }
  };

  const submitBtnClk = (e) => {
    e.preventDefault();
    if (personName === "") {
      toast.error("Full Name is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setPersonNameError(true);
    } else if (personName?.length < 3) {
      toast.error("minimum 3 characters is Required!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setPersonNameError(true);
    } else if (personCompany === "") {
      toast.error("Company Name is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setPersonCompanyError(true);
    } else if (personEmail === "") {
      toast.error("Email Address is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setPersonEmailError(true);
      setEmailErrMsg("Email is required");
    } else if (!validateEmail(personEmail)) {
      setPersonEmailError(true);
      setEmailErrMsg("Please enter a valid email address");
    } else if (personMobile === "") {
      toast.error("Mobile Number is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setPersonMobileError(true);
    } else {
      const finalData = new FormData();
      finalData.append("contactPersonName", personName);
      finalData.append("contactPersonCompanyName", personCompany);
      finalData.append("contactPersonEmail", personEmail);
      finalData.append("contactPersonMobile", personMobile);
      finalData.append("contactPersonMessage", message);
      if (reason?.length > 0) {
        finalData.append("contactUsReason", JSON.stringify(reason));
      }

      const requestOptions = {
        method: "POST",
        body: finalData,
      };
      fetch(
        "https://harsh7541.pythonanywhere.com/admin1/addcontactusrequest",
        requestOptions,
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.status) {
            toast.success("Record Added Successfully.", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setPersonName("");
            setPersonCompany("");
            setPersonEmail("");
            setPersonMobile("");
            setMessage("");
            setReason([]);
          } else {
            toast.error(data?.message);
          }
        })
        .catch((error) => {
          console.log("error: ", error);
          toast.error("There was an error, Please try again later.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    }
  };

  const handleCheckboxChange = (e) => {
    console.log("e: ", e);
    const { name, checked } = e.target;
    if (checked) {
      setReason((prev) => [...prev, name]);
    } else {
      setReason((prev) => prev.filter((item) => item !== name));
    }
  };

  const seoTitle = `Bitcoin Innovation & Market Evolution 2026 | Get in Touch`;
  const seoDesc = "Reach the Bitcoin Innovation & Market Evolution 2026 team for registration help, sponsorship options, agenda questions, and venue support.";

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
        <link rel="canonical" href="https://www.bitcoin-innovation-market-evolution.online/contact-us" />
      </Helmet>
      <Navbar forceScrolled />
      <div style={{ opacity: 1 }}>
        <div style={{ marginTop: windowWidth > 1024 ? "120px" : "" }}>
          <article className="ContactUs_bg__MKqvU">
            <div className="Form_container__jwPCR">
              <div>
                <div>
                  <h1>request a call back</h1>
                  <form
                    className="WDRM_2025_request_a_call_back Form_form__nhNBc form_WDRM"
                    method="POST"
                    data-hs-cf-bound="true"
                    onSubmit={submitBtnClk}
                  >
                    <div>
                      <div>
                        <input
                          name="fullname"
                          type="text"
                          placeholder="Full name *"
                          value={personName}
                          onChange={(e) => {
                            setPersonName(e.target.value);
                            setPersonNameError(false);
                          }}
                        ></input>
                        {personNameError && <p>Full Name is required</p>}
                      </div>
                      <div>
                        <input
                          name="companyname"
                          type="text"
                          placeholder="Company name *"
                          value={personCompany}
                          onChange={(e) => {
                            setPersonCompany(e.target.value);
                            setPersonCompanyError(false);
                          }}
                        ></input>
                        {personCompanyError && <p>Company Name is required</p>}
                      </div>
                    </div>
                    <div>
                      <div>
                        <input
                          name="email"
                          type="email"
                          placeholder="Email address *"
                          value={personEmail}
                          onChange={(e) => {
                            setPersonEmail(e.target.value);
                            setPersonEmailError(false);
                            setEmailErrMsg("");
                          }}
                        ></input>
                        {personEmailError && <p>{emailErrMsg}</p>}
                      </div>
                      <div>
                        <input
                          name="mobilenumber"
                          type="tel"
                          placeholder="Mobile number *"
                          value={personMobile}
                          onChange={(e) => {
                            let value = e.target.value;

                            // allow + only at the start
                            if (value.startsWith("+")) {
                              value =
                                "+" + value.slice(1).replace(/[^0-9]/g, "");
                            } else {
                              value = value.replace(/[^0-9]/g, "");
                            }

                            setPersonMobile(value);
                            setPersonMobileError(false);
                          }}
                          maxLength={16}
                        ></input>
                        {personMobileError && <p>Mobile number is required</p>}
                      </div>
                    </div>
                    <div
                      className="Form_textArea__tsfub"
                      style={{ marginBottom: "23px" }}
                    >
                      <textarea
                        name="message"
                        cols={30}
                        rows={6}
                        placeholder="Message"
                        value={message}
                        onChange={(e) => {
                          setMessage(e.target.value);
                        }}
                      ></textarea>
                    </div>
                    <div class="Form_checkboxContainer__UtH6X">
                      <div>
                        <div>
                          <label style={{ margin: "0px" }}>
                            Tell me more about
                          </label>
                        </div>
                        <div>
                          <input
                            type="checkbox"
                            id="speaker"
                            name="speaker_opportunities"
                            value="Checked"
                            onChange={handleCheckboxChange}
                            checked={reason.includes("speaker_opportunities")}
                          ></input>
                          <label>Becoming a speaker</label>
                        </div>
                        <div>
                          <input
                            type="checkbox"
                            id="sponsorship"
                            name="sponsorship_options"
                            value="Checked"
                            onChange={handleCheckboxChange}
                            checked={reason.includes("sponsorship_options")}
                          ></input>
                          <label>Sponsorship packages</label>
                        </div>
                        <div>
                          <input
                            type="checkbox"
                            id="attending"
                            name="attending_the_event"
                            value="Checked"
                            onChange={handleCheckboxChange}
                            checked={reason.includes("attending_the_event")}
                          ></input>
                          <label>Attending the show</label>
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      onMouseEnter={(e) => handleSubmitHover(e, true)}
                      onMouseLeave={(e) => handleSubmitHover(e, false)}
                    >
                      submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <section className="ContactUs_emailContainer__tR-DD">
              <h2>
                <img src={emailImage} alt="email img"></img>
                <span>Email Us</span>
              </h2>
              <p
                dangerouslySetInnerHTML={{
                  __html: cleanHtml(emailDes).replace(/<\/?p>/g, ""),
                }}
              ></p>
              <div className="ContactUs_emailCardContainer__Kg2ym">
                <div className="ContactUs_emailCard__YpEIv">
                  <h5>Delegate Registrations:</h5>
                  <h6>Delegates Support Team</h6>
                  <p style={{ visibility: "hidden" }}>Hidden</p>
                  <a href="mailto:delegates@abcd.com?subject=Bitcoin &amp; Innovation & Market Evolution 2026">
                    <img
                      src={emailIcon}
                      alt="Email Icon"
                      height="12"
                      width="18"
                    ></img>
                    delegates@abcd.com
                  </a>
                </div>
                <div className="ContactUs_emailCard__YpEIv">
                  <h5>Group Sales Team:</h5>
                  <h6>Sales Person</h6>
                  <p style={{ visibility: "visible" }}>Group Sales Director</p>
                  <a href="mailto:salesperson1@abcd.com?subject=Bitcoin Innovation & Market Evolution 2026">
                    <img
                      src={emailIcon}
                      alt="Email Icon"
                      height="12"
                      width="18"
                    ></img>
                    salesperson1@abcd.com
                  </a>
                </div>
                <div className="ContactUs_emailCard__YpEIv">
                  <h5>Sponsorship & Media Partners:</h5>
                  <h6>Company Person1</h6>
                  <p style={{ visibility: "visible" }}>
                    Event & Marketing Manager
                  </p>
                  <a href="mailto:person1@abcd.com?subject=Bitcoin Innovation & Market Evolution 2026">
                    <img
                      src={emailIcon}
                      alt="Email Icon"
                      height="12"
                      width="18"
                    ></img>
                    person1@abcd.com
                  </a>
                </div>
                <div className="ContactUs_emailCard__YpEIv">
                  <h5>Conference Content & Speaking:</h5>
                  <h6>Company Person2</h6>
                  <p style={{ visibility: "visible" }}>Conference Producer</p>
                  <a href="mailto:person2@abcd.com?subject=Bitcoin Innovation & Market Evolution 2026">
                    <img
                      src={emailIcon}
                      alt="Email Icon"
                      height="12"
                      width="18"
                    ></img>
                    person2@abcd.com
                  </a>
                </div>
              </div>
            </section>
            <SubscribeForm />
          </article>
        </div>
      </div>
      {/* Contact Form Section */}
      {/* <div style={contactFormSectionStyle}>
        <div style={containerStyle}>
          <div style={{ margin: "0 auto" }}>
            <h2 style={headingStyle}>REQUEST A CALL BACK</h2>
            <form style={formStyle} onSubmit={submitBtnClk}>
              <div style={formRowStyle}>
                <div style={inputContainerStyle}>
                  <input
                    name="fullname"
                    type="text"
                    placeholder="Full Name *"
                    style={inputStyle}
                    required
                    value={personName}
                    onChange={(e) => {
                      setPersonName(e.target.value);
                      setPersonNameError(false);
                    }}
                  />
                </div>
                <div style={inputContainerStyle}>
                  <input
                    name="companyname"
                    type="text"
                    placeholder="Company Name *"
                    style={inputStyle}
                    required
                    value={personCompany}
                    onChange={(e) => {
                      setPersonCompany(e.target.value);
                      setPersonCompanyError(false);
                    }}
                  />
                </div>
              </div>

              <div style={formRowStyle}>
                <div style={inputContainerStyle}>
                  <input
                    name="email"
                    type="email"
                    placeholder="Email Address *"
                    style={inputStyle}
                    required
                    value={personEmail}
                    onChange={(e) => {
                      setPersonEmail(e.target.value);
                      setPersonEmailError(false);
                    }}
                  />
                </div>
                <div style={inputContainerStyle}>
                  <input
                    name="mobilenumber"
                    type="tel"
                    placeholder="Mobile Number *"
                    style={inputStyle}
                    required
                    value={personMobile}
                    onChange={(e) => {
                      setPersonMobile(e.target.value);
                      setPersonMobileError(false);
                    }}
                  />
                </div>
              </div>

              <div style={textareaContainerStyle}>
                <textarea
                  name="message"
                  placeholder="Message"
                  cols={30}
                  rows={6}
                  style={textareaStyle}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                />
              </div>

              <div style={checkboxSectionStyle}>
                <div style={checkboxContainerStyle}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: isMobile ? "100%" : "max-content",
                      marginBottom: isMobile ? "5px" : "0",
                    }}
                  >
                    <label style={checkboxLabelStyle}>Tell me more about</label>
                  </div>

                  <div style={checkboxItemStyle}>
                    <input
                      style={checkboxInputStyle}
                      type="checkbox"
                      id="speaker"
                      name="speaker_opportunities"
                      value="Checked"
                      onChange={handleCheckboxChange}
                      checked={reason.includes("speaker_opportunities")}
                    />
                    <label htmlFor="speaker" style={checkboxLabelStyle}>
                      Becoming a Speaker
                    </label>
                  </div>

                  <div style={checkboxItemStyle}>
                    <input
                      style={checkboxInputStyle}
                      type="checkbox"
                      id="sponsorship"
                      name="sponsorship_options"
                      value="Checked"
                      onChange={handleCheckboxChange}
                      checked={reason.includes("sponsorship_options")}
                    />
                    <label htmlFor="sponsorship" style={checkboxLabelStyle}>
                      Sponsorship packages
                    </label>
                  </div>

                  <div style={checkboxItemStyle}>
                    <input
                      style={checkboxInputStyle}
                      type="checkbox"
                      id="attending"
                      name="attending_the_event"
                      value="Checked"
                      onChange={handleCheckboxChange}
                      checked={reason.includes("attending_the_event")}
                    />
                    <label htmlFor="attending" style={checkboxLabelStyle}>
                      Attending the show
                    </label>
                  </div>
                </div>
              </div>

              <button
                style={submitButtonStyle}
                type="submit"
                onMouseEnter={(e) => handleSubmitHover(e, true)}
                onMouseLeave={(e) => handleSubmitHover(e, false)}
              >
                submit
              </button>
            </form>
          </div>
        </div>
      </div> */}

      {/* Email Us Section */}
      {/* <div style={emailSectionStyle}>
        <h1 style={emailHeadingStyle}>
          <img
            style={emailImageStyle}
            src={emailImage || "/placeholder.svg"}
            alt="Email Icon"
          />
          <span
            style={{
              color: "#181818",
              marginTop: isMobile ? "0" : "5px",
              marginBottom: "0",
              padding: "0",
            }}
          >
            Email Us
          </span>
        </h1>

        <p style={emailDescriptionStyle}>
          Have questions or need assistance? We're just an email away. Simply
          click an option below to open an email. Our responsive team is
          committed to providing answers on everything from event details to
          registration. We're here to help and excited to hear from you!
        </p>

        <div style={emailCardsContainerStyle}>
          {helpersList?.map((item) => (
            <div style={emailCardStyle}>
              <h5 style={cardTitleStyle}>{item?.reasonToHelp}:</h5>
              {item?.helpingPersonName !== "" && (
                <h6 style={cardNameStyle}>{item?.helpingPersonName}</h6>
              )}
              <h6 style={cardNameStyle}>{item?.helpingPersonDesignation}</h6>
              <p style={{ ...cardPositionStyle, visibility: "hidden" }}>
                Hidden
              </p>
              <a
                style={cardEmailStyle}
                href={`mailto:${item?.helpingPersonEmail}?subject=${encodeURIComponent("Bitcoin Innovation & Market Evolution 2026")}`}
              >
                <img
                  style={emailIconStyle}
                  src={emailIcon || "/placeholder.svg"}
                  alt="Email Icon"
                />
                {item?.helpingPersonEmail}
              </a>
            </div>
          ))}
        </div>
      </div> */}

      <Footer />
    </>
  );
};

export default ContactUs;
