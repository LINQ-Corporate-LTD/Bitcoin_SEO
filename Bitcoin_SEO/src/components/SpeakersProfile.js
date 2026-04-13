import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import "../../src/assets/css/speakerProfile.css";
import Navbar from "./Navbar";
import SubscribeForm from "./SubscribeForm";
import Footer from "../Footer";
import LogoCarousel from "./LogoCarousel";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Error404 from "./Error404";
import { Helmet } from "react-helmet-async";
import { useSSRData } from "../common/useSSRData";

const SpeakerProfile = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log("state: ", state);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  // ✅ SSR data — pre-fetched by server.js before renderToString
  const ssrSpeakerProfile = useSSRData("speakerProfile");
  const ssrSpeakers = useSSRData("speakers");

  const [speakerData, setSpeakerData] = useState(ssrSpeakerProfile || []);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    // Skip initial fetch if SSR already resolved this speaker
    if (ssrSpeakerProfile && ssrSpeakerProfile.length > 0) return;

    // ✅ If state is missing (e.g. user directly entered URL)
    if (!state?.id) {
      // Use SSR speakers list first, fall back to client fetch
      if (ssrSpeakers && ssrSpeakers.length > 0) {
        const matched = ssrSpeakers.find(
          (s) => s.eventSpeakerName?.toLowerCase().replace(/\s+/g, "-") === slug
        );
        if (matched) {
          fetchSpeakerById(matched.id);
        } else {
          setIsNotFound(true);
        }
      } else {
        fetchSpeakerBySlug(slug);
      }
    } else {
      // Fetch using the passed state.id
      fetchSpeakerById(state.id);
    }
  }, [state, slug]);

  const fetchSpeakerById = async (speakerId) => {
    try {
      const formData = new FormData();
      formData.append("speakerId", speakerId);

      const response = await fetch(
        `https://harsh7541.pythonanywhere.com/admin1/speakerbyid`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();

      if (data?.status && data?.speakerData?.length > 0) {
        setSpeakerData(data.speakerData);
      } else {
        setIsNotFound(true); // ✅ No data found
      }
    } catch (error) {
      console.error("Error fetching speaker:", error);
      setIsNotFound(true);
    }
  };

  const fetchSpeakerBySlug = async (slug) => {
    try {
      const response = await fetch(
        `https://harsh7541.pythonanywhere.com/admin1/eventspeakers`
      );
      const data = await response.json();

      if (data?.status && Array.isArray(data?.eventSpeakersList)) {
        const matchedSpeaker = data.eventSpeakersList.find((speaker) => {
          const speakerSlug = speaker.eventSpeakerName
            ?.toLowerCase()
            ?.replace(/\s+/g, "-");
          return speakerSlug === slug;
        });

        if (matchedSpeaker) {
          fetchSpeakerById(matchedSpeaker.id);
        } else {
          setIsNotFound(true);
        }
      } else {
        setIsNotFound(true);
      }
    } catch (error) {
      console.error("Error fetching speakers:", error);
      setIsNotFound(true);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isNotFound) {
    return <Error404 />;
  }

  const speaker = speakerData[0];

  // ✅ STRICT: derive SEO fields ONLY from backend data — no fallbacks
  const seoTitle = speaker?.eventSpeakerMetaTitle;
  const seoDesc = speaker?.eventSpeakerMetaDescription;
  const canonicalUrl = slug
    ? `https://www.bitcoin-innovation-market-evolution.online/speakerprofile/${slug}`
    : "https://www.bitcoin-innovation-market-evolution.online/featured-speakers";

  return (
    <>
      {/*
        ✅ CRITICAL SEO FIX:
        Render <Helmet> ONLY when seoTitle is a real non-empty string from the backend.
        If we always render <Helmet>, React-Helmet emits <title></title> when data is
        absent (i.e. during SSR when backend fetch failed or is still loading).
        SEO crawlers like Semrush read the FIRST <title> they find — an empty one =
        "Missing title tag". By gating on seoTitle we guarantee zero empty tags.
      */}
      {seoTitle && (
        <Helmet>
          <title>{seoTitle}</title>
          {seoDesc && <meta name="description" content={seoDesc} />}
          <link rel="canonical" href={canonicalUrl} />
          <meta property="og:title" content={seoTitle} />
          {seoDesc && <meta property="og:description" content={seoDesc} />}
          <meta property="og:type" content="profile" />
          <meta property="og:url" content={canonicalUrl} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={seoTitle} />
          {seoDesc && <meta name="twitter:description" content={seoDesc} />}
        </Helmet>
      )}
      <Navbar forceScrolled />
      <div style={{ opacity: 1 }}>
        <div style={{ marginTop: windowWidth > 1024 ? "120px" : "" }}>
          <article className="SpeakerBio_container__4uadj">
            <div className="DetailsContainer_wholeContainer__385Iv">
              <div className="DetailsContainer_container__JrWjX">
                <div
                  className="DetailsContainer_imageContainer__ncJwH"
                  style={{
                    backgroundImage: `url(${speakerData[0]?.eventSpeakerProfilePageImage})`,
                    backgroundSize: "cover",
                  }}
                ></div>
                <div className="DetailsContainer_textContainer__D8Ukb">
                  <h2>Speaker's profile</h2>
                  <div className="DetailsContainer_innerContent__6NQGR">
                    <div>
                      <h1 className="speaker-h1-name">
                        {speakerData[0]?.eventSpeakerName}
                      </h1>
                      <span style={{ fontSize: "20px", fontWeight: 600 }}>
                        {speakerData[0]?.eventSpeakerCompany}
                      </span>
                      <h3 style={{ fontSize: "23px", margin: "40px 0 32px" }}>
                        <span>BIOGRAPHY</span>
                      </h3>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: speakerData[0]?.eventSpeakerDescription
                            ?.replace(/^"(.*)"$/, "$1")
                            ?.replace(/<p>(\s|&nbsp;)*<\/p>/g, ""),
                        }}
                      ></div>
                    </div>
                  </div>
                  <button onClick={() => navigate("/agenda")}>
                    view program
                  </button>
                </div>
              </div>
            </div>
            <div className="Form_container__jwPCR">
              <div>
                <div>
                  <h2>BECOME A SPEAKER & JOIN THE CONVERSATION</h2>
                  <form
                    className="WDRM_2025_quick_proposal Form_form__nhNBc form_WDRM"
                    method="POST"
                    data-hs-cf-bound="true"
                  >
                    <div>
                      <div>
                        <input
                          name="fullname"
                          type="text"
                          placeholder="Full name *"
                          required
                        ></input>
                      </div>
                      <div>
                        <input
                          name="companyname"
                          type="text"
                          placeholder="Company name *"
                          required
                        ></input>
                      </div>
                    </div>
                    <div>
                      <div>
                        <input
                          name="proposed"
                          type="text"
                          placeholder="Proposed title *"
                          required
                        ></input>
                      </div>
                      <div>
                        <input
                          name="email"
                          type="email"
                          placeholder="Email address *"
                          required
                        ></input>
                      </div>
                    </div>
                    <div className="Form_textArea__tsfub">
                      <textarea
                        name="message"
                        cols={30}
                        rows={6}
                        placeholder="Brief outline"
                      ></textarea>
                    </div>
                    <button type="submit">get back to me</button>
                  </form>
                </div>
              </div>
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

export default SpeakerProfile;
