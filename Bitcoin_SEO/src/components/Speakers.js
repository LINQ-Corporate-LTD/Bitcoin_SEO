import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import SubscribeForm from "./SubscribeForm";
import Footer from "../Footer";
import LogoCarousel from "./LogoCarousel";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/css/speakers.css";
import "../assets/css/form.css";
import { Helmet } from "react-helmet-async";
const Speakers = () => {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const [speakerList, setSprakerList] = useState([]);
  const [fullName, setFullName] = useState("");
  const [fullNameErr, setFullNameErr] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [companyNameErr, setCompanyNameErr] = useState(false);
  const [proposedTitle, setProposedTitle] = useState("");
  const [proposedTitleErr, setProposedTitleErr] = useState(false);
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [message, setMessage] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const handleClick = (member) => {
    const speakerName = member.eventSpeakerName
      .toLowerCase()
      .replace(/\s+/g, "-");
    navigate(`/speakerprofile/${speakerName}`, { state: member }); // ✅ Pass member object in route state
  };

  const getSpeakerUrl = (speaker) => {
    const slug = speaker.eventSpeakerName.toLowerCase().replace(/\s+/g, "-");
    return `/speakerprofile/${slug}`;
  };

  const submitBtnClk = (e) => {
    e.preventDefault();
    if (fullName === "") {
      setFullNameErr(true);
    } else if (companyName === "") {
      setCompanyNameErr(true);
    } else if (proposedTitle === "") {
      setProposedTitleErr(true);
    } else if (email === "") {
      setEmailErr(true);
      setEmailErrMsg("Email is required");
    } else if (!validateEmail(email)) {
      setEmailErr(true);
      setEmailErrMsg("Please enter a valid email address");
    } else {
      const finalData = new FormData();
      finalData.append("requesterName", fullName);
      finalData.append("requesterCompanyName", companyName);
      finalData.append("proposedTitle", proposedTitle);
      finalData.append("requesterEmail", email);
      if (message?.length > 0) {
        finalData.append("requesterMessage", JSON.stringify(message));
      }

      const requestOptions = {
        method: "POST",
        body: finalData,
      };
      fetch(
        "https://harsh7541.pythonanywhere.com/admin1/addbecomespeakerrequest",
        requestOptions
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
            setFullName("");
            setFullNameErr(false);
            setCompanyName("");
            setCompanyNameErr(false);
            setProposedTitle("");
            setProposedTitleErr(false);
            setEmail("");
            setEmailErr(false);
            setEmailErrMsg("");
            setMessage("");
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
  const seoTitle = `Bitcoin Innovation & Market Evolution 2026 | Speakers`;
  const seoDesc = "Meet featured experts shaping adoption, mining, Layer-2, security, and regulation, presented by Bitcoin Innovation & Market Evolution 2026.";
  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDesc} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDesc} />
        <link rel="canonical" href="https://www.bitcoin-innovation-market-evolution.online/featured-speakers" />
      </Helmet>
      <Navbar forceScrolled />
      <div style={{ marginTop: windowWidth > 1024 ? "120px" : "" }}>
        <article
          className="SpeakersSection_speakerSection__UNPkB"
          style={{ backgroundColor: "#f2f2f2" }}
        >
          <h1>Featured Speakers</h1>
          <div
            className="SpeakersSection_container__s+N5X"
            style={{ display: "inline-block" }}
          >
            <div className="SpeakersSection_speakersContainer__zaJfH">
              {speakerList.map((speaker) => (
                <Link
                  key={speaker.id}
                  to={getSpeakerUrl(speaker)}
                  state={speaker}
                  className="SpeakersSection_speakerImageContainer__dwWJ1"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <img
                    src={speaker.eventSpeakerFeaturedPageImage}
                    alt={speaker.eventSpeakerName}
                    loading="lazy"
                    width="300"
                    height="300"
                  ></img>
                  <div className="SpeakersSection_text__FLalV">
                    <p>{speaker.eventSpeakerName}</p>
                    <p>{speaker.eventSpeakerCompany}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </article>
      </div>
      <div className="Form_container__jwPCR">
        <div>
          <div>
            <h2>BECOME A SPEAKER & JOIN THE CONVERSATION</h2>
            <form
              className="WDRM_2025_quick_proposal Form_form__nhNBc form_WDRM"
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
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      setFullNameErr(false);
                    }}
                  ></input>
                  {fullNameErr && <p>Full Name is required</p>}
                </div>
                <div>
                  <input
                    name="companyname"
                    type="text"
                    placeholder="Company name *"
                    value={companyName}
                    onChange={(e) => {
                      setCompanyName(e.target.value);
                      setCompanyNameErr(false);
                    }}
                  ></input>
                  {companyNameErr && <p>Company Name is required</p>}
                </div>
              </div>
              <div>
                <div>
                  <input
                    name="proposed"
                    type="text"
                    placeholder="Proposed title *"
                    value={proposedTitle}
                    onChange={(e) => {
                      setProposedTitle(e.target.value);
                      setProposedTitleErr(false);
                    }}
                  ></input>
                  {proposedTitleErr && <p>Proposed title is required</p>}
                </div>
                <div>
                  <input
                    name="email"
                    type="email"
                    placeholder="Email address *"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailErr(false);
                      setEmailErrMsg("");
                    }}
                  ></input>
                  {emailErr && <p>{emailErrMsg}</p>}
                </div>
              </div>
              <div className="Form_textArea__tsfub">
                <textarea
                  name="message"
                  cols={30}
                  rows={6}
                  placeholder="Brief outline"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                ></textarea>
              </div>
              <button type="submit">get back to me</button>
            </form>
          </div>
        </div>
      </div>
      <LogoCarousel />
      <SubscribeForm />
      <Footer />
    </>
  );
};

export default Speakers;
