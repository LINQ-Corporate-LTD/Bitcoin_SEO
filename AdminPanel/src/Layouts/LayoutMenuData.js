import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
  const history = useNavigate();
  //state data
  const [isDashboard, setIsDashboard] = useState(false);
  const [isApps, setIsApps] = useState(false);
  const [isStaticPage, setIsStaticPage] = useState(false);
  const [isFormResponse, setIsFormResponse] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [isPages, setIsPages] = useState(false);
  const [isBaseUi, setIsBaseUi] = useState(false);
  const [isAdvanceUi, setIsAdvanceUi] = useState(false);
  const [isForms, setIsForms] = useState(false);
  const [isTables, setIsTables] = useState(false);
  const [isCharts, setIsCharts] = useState(false);
  const [isIcons, setIsIcons] = useState(false);
  const [isMaps, setIsMaps] = useState(false);
  const [isMultiLevel, setIsMultiLevel] = useState(false);

  //Calender
  const [isCalender, setCalender] = useState(false);

  // Apps
  const [isEmail, setEmail] = useState(false);
  const [isSubEmail, setSubEmail] = useState(false);
  const [isEcommerce, setIsEcommerce] = useState(false);
  const [isProjects, setIsProjects] = useState(false);
  const [isTasks, setIsTasks] = useState(false);
  const [isCRM, setIsCRM] = useState(false);
  const [isCrypto, setIsCrypto] = useState(false);
  const [isInvoices, setIsInvoices] = useState(false);
  const [isSupportTickets, setIsSupportTickets] = useState(false);
  const [isNFTMarketplace, setIsNFTMarketplace] = useState(false);
  const [isJobs, setIsJobs] = useState(false);
  const [isJobList, setIsJobList] = useState(false);
  const [isCandidateList, setIsCandidateList] = useState(false);

  // Authentication
  const [isSignIn, setIsSignIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [isPasswordCreate, setIsPasswordCreate] = useState(false);
  const [isLockScreen, setIsLockScreen] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);
  const [isVerification, setIsVerification] = useState(false);
  const [isError, setIsError] = useState(false);

  // Pages
  const [isProfile, setIsProfile] = useState(false);
  const [isLanding, setIsLanding] = useState(false);
  const [isBlog, setIsBlog] = useState(false);

  // Charts
  const [isApex, setIsApex] = useState(false);

  // Multi Level
  const [isLevel1, setIsLevel1] = useState(false);
  const [isLevel2, setIsLevel2] = useState(false);

  const [iscurrentState, setIscurrentState] = useState("Dashboard");

  function updateIconSidebar(e) {
    if (e && e.target && e.target.getAttribute("subitems")) {
      const ul = document.getElementById("two-column-menu");
      const iconItems = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove("active");
        var id = item.getAttribute("subitems");
        if (document.getElementById(id))
          document.getElementById(id).classList.remove("show");
      });
    }
  }

  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");
    if (iscurrentState !== "Dashboard") {
      setIsDashboard(false);
    }
    if (iscurrentState !== "Apps") {
      setIsApps(false);
    }
    if (iscurrentState !== "StaticPages") {
      setIsStaticPage(false);
    }
    if (iscurrentState !== "formResponses") {
      setIsFormResponse(false);
    }
    if (iscurrentState !== "Auth") {
      setIsAuth(false);
    }
    if (iscurrentState !== "Pages") {
      setIsPages(false);
    }
    if (iscurrentState !== "BaseUi") {
      setIsBaseUi(false);
    }
    if (iscurrentState !== "AdvanceUi") {
      setIsAdvanceUi(false);
    }
    if (iscurrentState !== "Forms") {
      setIsForms(false);
    }
    if (iscurrentState !== "Tables") {
      setIsTables(false);
    }
    if (iscurrentState !== "Charts") {
      setIsCharts(false);
    }
    if (iscurrentState !== "Icons") {
      setIsIcons(false);
    }
    if (iscurrentState !== "Maps") {
      setIsMaps(false);
    }
    if (iscurrentState !== "MuliLevel") {
      setIsMultiLevel(false);
    }
    if (iscurrentState === "Widgets") {
      history("/widgets");
      document.body.classList.add("twocolumn-panel");
    }
    if (iscurrentState !== "Landing") {
      setIsLanding(false);
    }
  }, [
    history,
    iscurrentState,
    isDashboard,
    isApps,
    isStaticPage,
    isFormResponse,
    isAuth,
    isPages,
    isBaseUi,
    isAdvanceUi,
    isForms,
    isTables,
    isCharts,
    isIcons,
    isMaps,
    isMultiLevel,
  ]);

  const menuItems = [
    {
      label: "Menu",
      isHeader: true,
    },
    {
      id: "dashboard",
      label: "Dashboards",
      icon: "ri-dashboard-2-line",
      link: "/#",
      stateVariables: isDashboard,
      click: function (e) {
        e.preventDefault();
        setIsDashboard(!isDashboard);
        setIscurrentState("Dashboard");
        updateIconSidebar(e);
      },
    },
    {
      id: "apps",
      label: "Modules",
      icon: "ri-apps-2-line",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsApps(!isApps);
        setIscurrentState("Apps");
        updateIconSidebar(e);
      },
      stateVariables: isApps,
      subItems: [
        {
          id: "eventSpeakers",
          label: "Event Speakers",
          link: "/eventspeakers",
          parentId: "apps",
        },
        {
          id: "eventSponsors",
          label: "Event Sponsors",
          link: "/eventsponsors",
          parentId: "apps",
        },
        {
          id: "eventKeyPoints",
          label: "Event Key Topics",
          link: "/eventkeytopics",
          parentId: "apps",
        },
        {
          id: "eventtestimonials",
          label: "Event Testimonials",
          link: "/eventtestimonials",
          parentId: "apps",
        },
        {
          id: "industrytrends",
          label: "Industry Trends",
          link: "/industrytrends",
          parentId: "apps",
        },
        {
          id: "relatedevents",
          label: "Related Events",
          link: "/relatedevents",
          parentId: "apps",
        },
        {
          id: "contactPersons",
          label: "Contact Us Persons",
          link: "/contactusperson",
          parentId: "apps",
        },
        {
          id: "eventpastattandees",
          label: "Event Past Attendees",
          link: "/eventpastattandees",
          parentId: "apps",
        },
        {
          id: "eventdelpackages",
          label: "Delegate Packages",
          link: "/delegatepackages",
          parentId: "apps",
        },
        {
          id: "eventSpopackages",
          label: "Sponsor Packages",
          link: "/sponsorpackages",
          parentId: "apps",
        },
        {
          id: "eventStatatics",
          label: "Event Statistics",
          link: "/eventstatatics",
          parentId: "apps",
        },
        {
          id: "logoSlider",
          label: "Event Slider Logos",
          link: "/sliderlogos",
          parentId: "apps",
        },
        {
          id: "newsCategories",
          label: "Event News Categories",
          link: "/newscategories",
          parentId: "apps",
        },
        {
          id: "news",
          label: "Event News",
          link: "/news",
          parentId: "apps",
        },
        {
          id: "faqs",
          label: "Event Faqs",
          link: "/faqs",
          parentId: "apps",
        },
        {
          id: "coreAttandees",
          label: "Event Core Attendees",
          link: "/coreattandees",
          parentId: "apps",
        },
        {
          id: "industries",
          label: "Event Participated Industries",
          link: "/industries",
          parentId: "apps",
        },
        {
          id: "expertSpeakers",
          label: "Event Expert Speakers",
          link: "/expertspeakers",
          parentId: "apps",
        },
        {
          id: "eventLeaders",
          label: "Event Leaders/Operators",
          link: "/eventleaders",
          parentId: "formResponses",
        },
        {
          id: "offerCoupons",
          label: "Event Offer Coupons",
          link: "/offercoupons",
          parentId: "formResponses",
        },
        {
          id: "navMainCategories",
          label: "Navbar Main Categories",
          link: "/navmaincategories",
          parentId: "formResponses",
        },
        {
          id: "navSubCategories",
          label: "Navbar Sub Categories",
          link: "/navsubcategories",
          parentId: "formResponses",
        },
      ],
    },
    {
      id: "StaticPages",
      label: "Page Content",
      icon: "ri-apps-2-line",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsStaticPage(!isStaticPage);
        setIscurrentState("StaticPages");
        updateIconSidebar(e);
      },
      stateVariables: isStaticPage,
      subItems: [
        {
          id: "eventTagline",
          label: "Event Tagline",
          link: "/taglinecontent",
          parentId: "StaticPages",
        },
        {
          id: "venuePageData",
          label: "Venue",
          link: "/venuecontent",
          parentId: "StaticPages",
        },
        {
          id: "WhoShouldAttendPageData",
          label: "Who Should Attend",
          link: "/whoshouldattend",
          parentId: "StaticPages",
        },
        {
          id: "speakerPageData",
          label: "Speaker Page Data",
          link: "/speakerpagecontent",
          parentId: "StaticPages",
        },
        {
          id: "contactUsPageData",
          label: "Contact Us Page",
          link: "/contactuspagecontent",
          parentId: "StaticPages",
        },
        {
          id: "mediaPageData",
          label: "Media Page",
          link: "/mediapagecompanypersons",
          parentId: "StaticPages",
        },
        {
          id: "sponsorPageData",
          label: "Sponsor Page",
          link: "/sponsorpagecontent",
          parentId: "StaticPages",
        },
        {
          id: "homePastAttandeeData",
          label: "Home Page Past Attendees",
          link: "/homepastattandees",
          parentId: "StaticPages",
        },
        {
          id: "delegateAddOns",
          label: "Delegate Add Ons",
          link: "/delegateaddons",
          parentId: "StaticPages",
        },
        {
          id: "sponsorAddOnTypes",
          label: "Sponsor Add On Types",
          link: "/sponsoraddontypes",
          parentId: "StaticPages",
        },
        {
          id: "sponsorAddOns",
          label: "Sponsor Add Ons",
          link: "/sponsoraddons",
          parentId: "StaticPages",
        },
        {
          id: "agendaList",
          label: "Agenda List",
          link: "/agendalist",
          parentId: "StaticPages",
        },
        {
          id: "eventData",
          label: "Event Data",
          link: "/eventdata",
          parentId: "StaticPages",
        },
        {
          id: "socialMediaData",
          label: "Social Media Links",
          link: "/socialmediadata",
          parentId: "StaticPages",
        },
      ],
    },
    {
      id: "formResponses",
      label: "Form Responses",
      icon: "ri-apps-2-line",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsFormResponse(!isFormResponse);
        setIscurrentState("formResponses");
        updateIconSidebar(e);
      },
      stateVariables: isFormResponse,
      subItems: [
        {
          id: "contactusresponse",
          label: "Contact Us Response",
          link: "/contactusrespone",
          parentId: "formResponses",
        },
        {
          id: "eventsubscribers",
          label: "Event Subscribers",
          link: "/eventsubscribers",
          parentId: "formResponses",
        },
        {
          id: "eventCrowdResponse",
          label: "Stand Out From The Crowd Response",
          link: "/standoutcrowdresponse",
          parentId: "formResponses",
        },
        {
          id: "becomeSpeakerResponse",
          label: "Become a Speaker Response",
          link: "/becomespeakerresponse",
          parentId: "formResponses",
        },
        {
          id: "quickProposalResponse",
          label: "Quick Proposal Response",
          link: "/quickproposalresponse",
          parentId: "formResponses",
        },
        {
          id: "userPassRegistration",
          label: "End User Pass Registration Response",
          link: "/userpassregistrationrequests",
          parentId: "formResponses",
        },
        {
          id: "joinedCompanies",
          label: "Joined Companies",
          link: "/joinedcompanies",
          parentId: "formResponses",
        },
        {
          id: "joinedDelegates",
          label: "Joined Delegates",
          link: "/joineddelegates",
          parentId: "formResponses",
        },
        {
          id: "companyTransections",
          label: "Company Transections",
          link: "/companytransections",
          parentId: "formResponses",
        },
        {
          id: "joinedSponsors",
          label: "Joined Sponsors",
          link: "/joinedsponsors",
          parentId: "formResponses",
        },
        {
          id: "joinedSponsorDelegates",
          label: "Joined Sponsor Delegates",
          link: "/joinedsponsordelegates",
          parentId: "formResponses",
        },
        {
          id: "sponsorTransections",
          label: "Sponsor Transections",
          link: "/sponsortransections",
          parentId: "formResponses",
        },
      ],
    },
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
