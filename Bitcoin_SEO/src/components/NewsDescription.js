import React, { useState, useEffect, useRef } from "react";
import { useLocation, useParams, useNavigate, Link } from "react-router-dom";
import Newsimg from "../../src/assets/images/News/1749734953604.jpg";
import "../../src/assets/css/NewsDescription.css";
import Navbar from "./Navbar";
import SubscribeForm from "./SubscribeForm";
import Footer from "../Footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Error404 from "./Error404";
import { Helmet } from "react-helmet-async";
import { useSSRData } from "../common/useSSRData";
const newsImg =
  "https://www.desalination-resource-recovery.com/api/images/news/1749734842198.jpg";
const linkedInLogo =
  "https://www.desalination-resource-recovery.com/images/icons/share-linkedIn.png";
const whatsappLogo =
  "https://www.desalination-resource-recovery.com/images/icons/share-whatsapp.png";
const emailLogo =
  "https://www.desalination-resource-recovery.com/images/icons/share-email.png";
const copyLogo =
  "https://www.desalination-resource-recovery.com/images/icons/share-copy.png";

const NewsDescription = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { state } = useLocation();

  // ✅ SSR data — pre-fetched by server.js before renderToString
  const ssrNewsDetail = useSSRData("newsDetail");
  const ssrNews = useSSRData("news");

  const [newsData, setNewsData] = useState(ssrNewsDetail || []);
  const [newsList, setNewsList] = useState(ssrNews || []);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const [isNotFound, setIsNotFound] = useState(false);
  // Start in loading state if SSR didn't provide data — prevents Helmet rendering with empty values
  const [loading, setLoading] = useState(!ssrNewsDetail || ssrNewsDetail.length === 0);

  useEffect(() => {
    // Only fetch news list client-side if SSR didn't provide it
    if (!ssrNews || ssrNews.length === 0) {
      callNewsListApi();
    }
    // eslint-disable-next-line
  }, []);

  const fetchNewsData = async (id) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("newsId", id);
    console.log("newsId: ", id);
    const requestOptions = { method: "POST", body: formData };

    fetch(`https://harsh7541.pythonanywhere.com/admin1/newsbyid`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.status && data.NewsData?.length > 0) {
          setNewsData(data["NewsData"]);
          setIsNotFound(false);
        } else {
          setIsNotFound(true);
        }
      })
      .catch(() => setIsNotFound(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    // Skip if SSR already provided news detail
    if (ssrNewsDetail && ssrNewsDetail.length > 0) return;
    if (state?.id) {
      fetchNewsData(state.id);
    }
  }, [state]);

  useEffect(() => {
    if (!state?.id) {
      // Skip slug-matching fetch if SSR already resolved this news item
      if (ssrNewsDetail && ssrNewsDetail.length > 0) return;
      const matchedNews = newsList.find((news) => {
        const formattedSlug = news.newsTitle
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-");
        console.log("formattedSlug:", formattedSlug);
        return formattedSlug === slug;
      });
      console.log("matchedNews:", matchedNews);

      if (matchedNews) {
        fetchNewsData(matchedNews.id);
      } else {
        setIsNotFound(true);
      }
    }
  }, [newsList, slug]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const callNewsListApi = () => {
    const requestOptions = {
      method: "GET",
    };
    fetch(`https://harsh7541.pythonanywhere.com/admin1/generalnews`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.status) {
          setNewsList(data["generalNews"]);
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
  let featuredLatestArticle = null;
  let latestNewsItems = [];
  if (newsList?.length > 0) {
    featuredLatestArticle = newsList[0];
    const remainingItems = newsList.slice(1);
    latestNewsItems =
      remainingItems.length > 5 ? remainingItems.slice(0, 4) : remainingItems;
  }
  const subscribeSectionRef = useRef(null);
  const [shareOpen, setShareOpen] = useState(true);

  const scrollToQuickProposal = () => {
    if (subscribeSectionRef.current) {
      const navbarHeight = 0;
      const elementPosition = subscribeSectionRef.current.offsetTop;
      const offsetPosition = elementPosition - navbarHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const openCloseShare = () => {
    setShareOpen((prev) => !prev);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  const handleClick = (member) => {
    const newsTitle = member.newsTitle
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "") // remove special characters like ':'
      .replace(/\s+/g, "-") // replace spaces with hyphens
      .replace(/-+/g, "-");
    navigate(`/newsdescription/${newsTitle}`, { state: member }); // ✅ Pass member object in route state
  };

  const handleLinkedInShare = () => {
    // Get current page URL
    const currentUrl = window.location.href;

    // LinkedIn share URL format
    const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      currentUrl
    )}`;

    // Open LinkedIn share dialog in a popup window
    window.open(
      linkedInShareUrl,
      "linkedin-share-dialog",
      "width=626,height=436,toolbar=0,status=0"
    );
  };

  const handleWhatsAppShare = () => {
    const currentUrl = window.location.href;
    const newsTitle = newsData[0]?.newsTitle || "Check out this news";
    const text = `${newsTitle} - ${currentUrl}`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleGmailShare = () => {
    if (!newsData || !newsData[0]) return;

    const currentUrl = window.location.href;
    const newsTitle = newsData[0]?.newsTitle || "Interesting News Article";
    const newsDescription =
      newsData[0]?.newsShortDescription
        ?.replace(/<[^>]*>/g, "")
        .substring(0, 150) || "";

    const subject = encodeURIComponent(newsTitle);
    const body = encodeURIComponent(`I thought you might find this interesting:

${newsTitle}

${newsDescription}...

Read the full article: ${currentUrl}`);

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&su=${subject}&body=${body}`;

    window.open(gmailUrl, "_blank", "width=600,height=600");
  };

  const handleCopyLink = () => {
    const currentUrl = window.location.href;

    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        toast.success("Link copied to clipboard!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      })
      .catch(() => {
        toast.error("Failed to copy link", {
          position: "top-right",
          autoClose: 2000,
        });
      });
  };

  if (loading) return <div>Loading...</div>;
  if (isNotFound) {
    return <Error404 />;
  }
  const newsSeo = newsData[0];
  const seoTitle = newsSeo?.newsMetaTitle ? newsSeo?.newsMetaTitle?.trim() : 'Bitcoin News & Market Updates | BIM Evolution';
  const seoDesc = newsSeo?.newsMetaDescription ? newsSeo?.newsMetaDescription?.trim() : "Stay informed with the latest Bitcoin news, market trends, and crypto innovations. Get in-depth analysis and updates on Bitcoin's evolving market landscape.";
  const seoImage = newsSeo?.newsImage;
  const canonicalUrl = slug
    ? `https://www.bitcoin-innovation-market-evolution.online/newsdescription/${slug}`
    : "https://www.bitcoin-innovation-market-evolution.online/news";

  console.log('newsSeo', newsSeo);
  console.log('canonicalUrl', canonicalUrl);
  console.log('seoTitle', seoTitle);
  console.log('seoDesc', seoDesc);
  console.log('seoImage', seoImage);


  return (
    <div id="root">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDesc} />
        <meta property="og:image" content={seoImage} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDesc} />
        <meta name="twitter:image" content={seoImage} />
      </Helmet>
      <div style={{ opacity: 1 }}>
        <div style={{ marginTop: windowWidth > 1024 ? "150px" : "" }}>
          <Navbar forceScrolled />
          <div className="NewsDetails_container__goqTf">
            <div className="NewsDetails_backButtonContainer__hgOHX">
              <div className="NewsDetails_backButtonPartContainer__YHRKV">
                <a href="/news">
                  <svg
                    width="14"
                    height="11"
                    viewBox="0 0 14 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.2227 5.75C13.2227 6.24219 12.8398 6.625 12.375 6.625H3.98047L6.85156 9.52344C7.20703 9.85156 7.20703 10.4258 6.85156 10.7539C6.6875 10.918 6.46875 11 6.25 11C6.00391 11 5.78516 10.918 5.62109 10.7539L1.24609 6.37891C0.890625 6.05078 0.890625 5.47656 1.24609 5.14844L5.62109 0.773438C5.94922 0.417969 6.52344 0.417969 6.85156 0.773438C7.20703 1.10156 7.20703 1.67578 6.85156 2.00391L3.98047 4.875H12.375C12.8398 4.875 13.2227 5.28516 13.2227 5.75Z"
                      fill="#171717"
                    ></path>
                  </svg>
                  Back to all News
                </a>
              </div>
            </div>
            <div className="NewsDetails_upperPartContainer__iGJWB">
              <div className="NewsDetails_upperPart__RvrUr">
                <p>{newsData[0]?.newsCategoryDetails?.newsCategory}</p>
                <h1>{newsData[0]?.newsTitle}</h1>
                <div className="NewsDetails_descriptionText__ifgC7">
                  <p
                    lang="en"
                    dangerouslySetInnerHTML={{
                      __html: newsData[0]?.newsShortDescription.replace(
                        /^"(.*)"$/,
                        "$1"
                      ),
                    }}
                  ></p>
                </div>
                <div className="NewsDetails_categoryContainer__pmy7Y">
                  <p>{formatDate(newsData[0]?.newsCreatedDate)}</p>
                  {shareOpen === true && (
                    <div>
                      <button onClick={scrollToQuickProposal}>Subscribe</button>
                      <button
                        className="NewsDetails_share__laT4U"
                        onClick={openCloseShare}
                      >
                        Share
                      </button>
                    </div>
                  )}
                  {shareOpen === false && (
                    <div className="NewsDetails_sharePopUpContainer__UB1au">
                      <button onClick={openCloseShare}>X</button>
                      <h6>Share</h6>
                      <div className="NewsDetails_shareIconsContainer__ZkpQn">
                        <div className="NewsDetails_shareIconBox__E6cI5">
                          <button
                            class="react-share__ShareButton"
                            style={{
                              backgroundColor: "transparent",
                              border: "none",
                              padding: "0px",
                              font: "inherit",
                              color: "inherit",
                              cursor: "pointer",
                            }}
                            onClick={handleLinkedInShare}
                          >
                            <img src={linkedInLogo} alt="Share on LinkedIn" />
                          </button>
                        </div>
                        <div className="NewsDetails_shareIconBox__E6cI5">
                          <button
                            class="react-share__ShareButton"
                            style={{
                              backgroundColor: "transparent",
                              border: "none",
                              padding: "0px",
                              font: "inherit",
                              color: "inherit",
                              cursor: "pointer",
                            }}
                            onClick={handleWhatsAppShare}
                          >
                            <img src={whatsappLogo} alt="Share via WhatsApp" />
                          </button>
                        </div>
                        <div className="NewsDetails_shareIconBox__E6cI5">
                          <button
                            class="react-share__ShareButton"
                            style={{
                              backgroundColor: "transparent",
                              border: "none",
                              padding: "0px",
                              font: "inherit",
                              color: "inherit",
                              cursor: "pointer",
                            }}
                            onClick={handleGmailShare}
                          >
                            <img src={emailLogo} alt="Share via Email" />
                          </button>
                        </div>
                        <div className="NewsDetails_shareIconBox__E6cI5">
                          <button
                            class="react-share__ShareButton"
                            style={{
                              backgroundColor: "transparent",
                              border: "none",
                              padding: "0px",
                              font: "inherit",
                              color: "inherit",
                              cursor: "pointer",
                            }}
                            onClick={handleCopyLink}
                          >
                            <img src={copyLogo} alt="Copy" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="NewsDetails_lowerPart__F5RRQ">
              <div className="NewsDetails_left__SL1Qe">
                <div className="NewsDetails_content__0+gd8">
                  <img src={newsData[0]?.newsImage} alt={newsData[0]?.newsImageAltText}></img>
                  <p
                    lang="en"
                    dangerouslySetInnerHTML={{
                      __html: newsData[0]?.newsDescription.replace(
                        /^"(.*)"$/,
                        "$1"
                      ),
                    }}
                  ></p>
                </div>
              </div>
              <div className="NewsDetails_right__P72yX">
                <div className="NewsSection_wholeContainer__t5qCK">
                  <div className="NewsSection_latestNewsLightContainer__M19xp">
                    {windowWidth < 1024 && <h2>Latest News</h2>}
                    <div className="NewsSection_latestNews__9sDlt">
                      <div className="NewsSection_newsList__tnQsK">
                        {windowWidth > 1024 && <h2>Latest News</h2>}
                        <ul>
                          {latestNewsItems?.map((item, index) => (
                            // add a tag due to Semrush warning
                            // <li>
                            //   <div className="NewsSection_categoryAndDate__WBz4R">
                            //     <p onClick={() => handleClick(item)}>
                            //       {formatDate(item?.newsCreatedDate)}
                            //     </p>
                            //   </div>
                            //   <div
                            //     className="NewsSection_newsTitle__1tiob"
                            //     onClick={() => handleClick(item)}
                            //   >
                            //     {item?.newsTitle}
                            //   </div>
                            // </li>
                            <li key={index}>
                              <Link
                                to={`/newsdescription/${item.newsTitle
                                  .toLowerCase()
                                  .replace(/[^a-z0-9\s-]/g, "") // remove special characters like ':'
                                  .replace(/\s+/g, "-") // replace spaces with hyphens
                                  .replace(/-+/g, "-")}`}
                                state={item}
                                style={{ textDecoration: "none", color: "inherit" }} // keeps original look
                              >
                                <div className="NewsSection_categoryAndDate__WBz4R">
                                  <p>{formatDate(item?.newsCreatedDate)}</p>
                                </div>
                                <div className="NewsSection_newsTitle__1tiob">
                                  {item?.newsTitle}
                                </div>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ width: "100%" }}></div>
            <div
              ref={subscribeSectionRef}
              style={{
                transition: "margin-top 0.3s ease",
                width: "100%",
              }}
            >
              <SubscribeForm />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div >
  );
};

export default NewsDescription;
