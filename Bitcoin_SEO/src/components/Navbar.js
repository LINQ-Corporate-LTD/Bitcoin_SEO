// code upto SSR working
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Menu, X } from "lucide-react";
// import "../assets/css/navbar.css";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const logoWhite =
//   "https://desalination-resource-recovery.com/api/images/logo/1742534509561.png";
// const logoBlack =
//   "https://www.desalination-resource-recovery.com/api/images/logo/1742534509562.png";
// const closeBtn =
//   "https://www.desalination-resource-recovery.com/images/icons/close-white.png";
// const leftArrowIcon =
//   "https://www.desalination-resource-recovery.com/images/icons/icon-arrow-left.png";

// const Navbar = ({ disableScrollEffect = false, forceScrolled = false }) => {
//   const navigate = useNavigate();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [hoveredIndex, setHoveredIndex] = useState(null);
//   const [windowWidth, setWindowWidth] = useState(1200); // ✅ Safe default for SSR
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);
//   const [activeIndex, setActiveIndex] = useState(null);
//   const [navItems, setNavItems] = useState([]);
//   const [getTheCurrentPath, setGetTheCurrentPath] = useState("");
//   const [isHomePage, setIsHomePage] = useState(false);
//   const [activeNavItem, setActiveNavItem] = useState(null);

//   // ✅ Client-side only setup for window values
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       setWindowWidth(window.innerWidth);
//       setGetTheCurrentPath(window.location.pathname.split("/").pop().toUpperCase());
//       setIsHomePage(window.location.pathname === "/");

//       const handleResize = () => setWindowWidth(window.innerWidth);
//       window.addEventListener("resize", handleResize);
//       return () => window.removeEventListener("resize", handleResize);
//     }
//   }, []);

//   const less1024 = windowWidth < 1025;

//   const showWhiteNavbar = isHomePage
//     ? less1024
//       ? false
//       : forceScrolled || (!disableScrollEffect && scrolled)
//     : true;

//   // ✅ Track active nav item (safe)
//   useEffect(() => {
//     if (typeof window === "undefined") return;

//     const currentPath = window.location.pathname;
//     const activeIndex = navItems.findIndex((item) => {
//       if (item.href === currentPath) return true;
//       if (currentPath === "/" && item.href === "/") return true;
//       if (item.href !== "/" && currentPath.startsWith(item.href)) return true;
//       return false;
//     });

//     if (activeIndex !== -1 && !navItems[activeIndex]?.dropdown) {
//       setActiveNavItem(activeIndex);
//     } else {
//       setActiveNavItem(null);
//     }
//   }, [navItems]);

//   // ✅ Fetch navigation items
//   useEffect(() => {
//     navItemsListApi();
//     // eslint-disable-next-line
//   }, []);

//   const navItemsListApi = () => {
//     const requestOptions = {
//       method: "GET",
//     };
//     fetch(`https://harsh7541.pythonanywhere.com/admin1/getnavitems`, requestOptions)
//       .then((response) => response.json())
//       .then((data) => {
//         if (data && data.status) {
//           setNavItems(data["navItems"]);
//         }
//       })
//       .catch(() => {
//         setTimeout(() => {
//           toast.error("There was an error, Please try again later.", {
//             position: "top-right",
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//           });
//         }, 1000);
//       });
//   };

//   // ✅ Handle scroll safely
//   useEffect(() => {
//     if (typeof window === "undefined") return;

//     const handleScroll = () => setScrolled(window.scrollY > 40);

//     if (disableScrollEffect || forceScrolled || less1024) {
//       setScrolled(false);
//       return;
//     }

//     handleScroll();
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [disableScrollEffect, forceScrolled, less1024]);

//   // ✅ Handle body overflow safely
//   useEffect(() => {
//     if (typeof document === "undefined") return;
//     document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
//     return () => {
//       if (typeof document !== "undefined") {
//         document.body.style.overflow = "";
//       }
//     };
//   }, [isMobileMenuOpen]);

//   return (
//     <header
//       className={
//         showWhiteNavbar
//           ? "NewNavbar_wholeContainerWhite__QY0eF"
//           : "NewNavbar_wholeContainer__z2zti"
//       }
//       style={{
//         backgroundColor:
//           isMobileMenuOpen && less1024
//             ? "#000000cc"
//             : showWhiteNavbar
//             ? "#fff"
//             : "transparent",
//       }}
//     >
//       <div className="NewNavbar_container__dGANs">
//         <div className="NewNavbar_logo__D1qkF">
//           <a aria-current="page" className="active" href="/">
//             <img
//               src={showWhiteNavbar ? logoBlack : logoWhite}
//               alt="website-logo"
//               height={50}
//               width={200}
//               loading="lazy"
//             />
//           </a>
//         </div>

//         <div
//           className="NewNavbar_hide__g8Glm NewNavbar_navLinksContainer__s15t3"
//           style={{ display: isMobileMenuOpen && less1024 ? "block" : "" }}
//         >
//           <div
//             className="NewNavbar_linksContainer__tbm-r"
//             style={{
//               flexFlow:
//                 activeMobileDropdown === activeIndex && isDropdownOpen
//                   ? "row"
//                   : "",
//             }}
//           >
//             <ul>
//               {navItems.map((item, index) => {
//                 const hasDropdown = !!item?.dropdown;
//                 const isActive = activeMobileDropdown === index;

//                 // ✅ Mobile dropdown rendering
//                 if (less1024) {
//                   if (isDropdownOpen) {
//                     if (!isActive) return null;
//                     return (
//                       <React.Fragment key={index}>
//                         <li>
//                           <a
//                             aria-current="page"
//                             className="active"
//                             href="/"
//                             style={{
//                               width: "60px",
//                               marginRight: "10px",
//                               display: "flex",
//                               justifyContent: "center",
//                               alignItems: "center",
//                             }}
//                             onClick={(e) => {
//                               e.preventDefault();
//                               setIsDropdownOpen(false);
//                               setActiveMobileDropdown(null);
//                             }}
//                           >
//                             <img
//                               src={leftArrowIcon}
//                               alt="left icon"
//                               width="12"
//                             />
//                           </a>
//                           <a
//                             aria-current="page"
//                             className="active"
//                             href={item.href}
//                             style={{
//                               width: isActive ? "100%" : "",
//                               display: isActive ? "" : "none",
//                             }}
//                           >
//                             {item.name}
//                             <div className="NewNavbar_resExpansionMenu__5GuSM">
//                               {item.dropdown?.map((subItem, subIndex) => (
//                                 <a
//                                   key={subIndex}
//                                   aria-current="page"
//                                   className="active"
//                                   href={subItem.href}
//                                 >
//                                   {subItem.name}
//                                 </a>
//                               ))}
//                             </div>
//                           </a>
//                         </li>
//                       </React.Fragment>
//                     );
//                   }

//                   return (
//                     <li key={index}>
//                       <a
//                         aria-current="page"
//                         className="active"
//                         href={item.href}
//                         onClick={(e) => {
//                           if (hasDropdown) {
//                             e.preventDefault();
//                             setActiveMobileDropdown(index);
//                             setIsDropdownOpen(true);
//                             setActiveIndex(index);
//                           }
//                         }}
//                       >
//                         {item.name}
//                       </a>
//                     </li>
//                   );
//                 }

//                 // ✅ Desktop version unchanged
//                 return (
//                   <li
//                     key={index}
//                     onMouseEnter={() => {
//                       if (activeNavItem !== index) setHoveredIndex(index);
//                     }}
//                     onMouseLeave={() => {
//                       if (activeNavItem !== index) setHoveredIndex(null);
//                     }}
//                     onClick={() => {
//                       if (!hasDropdown) setActiveNavItem(index);
//                     }}
//                   >
//                     <a
//                       aria-current="page"
//                       href={item.href}
//                       className={`${
//                         getTheCurrentPath === item.name
//                           ? "navbar-active-no-hover"
//                           : ""
//                       }`}
//                     >
//                       {item.name}
//                     </a>
//                     {item?.dropdown && (
//                       <div
//                         className="NewNavbar_expansionMenuOuter__wKpka"
//                         style={{
//                           visibility:
//                             hoveredIndex === index ? "visible" : "hidden",
//                           opacity: hoveredIndex === index ? 1 : 0,
//                         }}
//                       >
//                         <div className="NewNavbar_expansionMenu__KBWXI">
//                           {item.dropdown?.map((subItem, subIndex) => (
//                             <a
//                               key={subIndex}
//                               aria-current="page"
//                               className="active"
//                               href={subItem.href}
//                             >
//                               {subItem.name}
//                             </a>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </li>
//                 );
//               })}
//             </ul>
//             <button
//               style={{
//                 display:
//                   activeMobileDropdown === activeIndex && isDropdownOpen
//                     ? "none"
//                     : "",
//               }}
//               onClick={() => navigate("/booking")}
//             >
//               Register
//             </button>
//           </div>
//         </div>

//         <div className="NewNavbar_register__UET28">
//           <button onClick={() => navigate("/booking")}>Register</button>
//           {less1024 && !isMobileMenuOpen && (
//             <svg
//               width="33"
//               height="28"
//               viewBox="0 0 33 28"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//               onClick={() => setIsMobileMenuOpen(true)}
//             >
//               <rect width="33" height="6"></rect>
//               <rect y="11" width="33" height="6"></rect>
//               <rect y="22" width="33" height="6"></rect>
//             </svg>
//           )}
//           {less1024 && isMobileMenuOpen && (
//             <img
//               src={closeBtn}
//               alt="Hamburger icons"
//               className="NewNavbar_close__YvNRt"
//               width="25"
//               height="25"
//               style={{ display: isMobileMenuOpen ? "block" : "none" }}
//               onClick={() => setIsMobileMenuOpen(false)}
//             />
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;

// code After added Google Translation
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/navbar.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useApiData } from "../../src/common/ApiContext";
import GoogleTranslate from "./GoogleTranslate";

const closeBtn =
  "https://www.desalination-resource-recovery.com/images/icons/close-white.png";
const hamburger = "https://cdn-icons-png.flaticon.com/512/56/56763.png";
const leftArrowIcon =
  "https://www.desalination-resource-recovery.com/images/icons/icon-arrow-left.png";

const Navbar = ({ disableScrollEffect = false, forceScrolled = false }) => {
  const navigate = useNavigate();
  const { navLogos: contextNavLogos } = useApiData();
  
  // Local state for logos - will be populated from API
  const [navLogos, setNavLogos] = useState(contextNavLogos || null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [windowWidth, setWindowWidth] = useState(1200);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);
  const [activeNavItem, setActiveNavItem] = useState(null);
  const [navItems, setNavItems] = useState([]);

  // ✅ Fetch logos directly if not available from context
  useEffect(() => {
    if (!navLogos) {
      fetchNavLogos();
    }
  }, []);

  // ✅ Update local state when context updates
  useEffect(() => {
    if (contextNavLogos && !navLogos) {
      setNavLogos(contextNavLogos);
    }
  }, [contextNavLogos]);

  const fetchNavLogos = async () => {
    try {
      const response = await fetch(`https://harsh7541.pythonanywhere.com/admin1/getnavlogos`);
      const data = await response.json();
      
      if (data && data.status && data.navLogos) {
        setNavLogos(data.navLogos);
      }
    } catch (error) {
      console.error("Error fetching nav logos:", error);
    }
  };

  // Client-side only setup for window values
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);

      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const less1024 = windowWidth < 1025;
  const isHomePage =
    typeof window !== "undefined" ? window.location.pathname === "/" : false;

  const showWhiteNavbar = isHomePage
    ? less1024
      ? false
      : forceScrolled || (!disableScrollEffect && scrolled)
    : true;

  // Track active nav item
  useEffect(() => {
    if (typeof window === "undefined") return;

    const currentPath = window.location.pathname;
    const activeIndex = navItems.findIndex((item) => {
      if (item.href === currentPath) return true;
      if (currentPath === "/" && item.href === "/") return true;
      if (item.href !== "/" && currentPath.startsWith(item.href)) return true;
      return false;
    });

    if (activeIndex !== -1 && !navItems[activeIndex]?.dropdown) {
      setActiveNavItem(activeIndex);
    } else {
      setActiveNavItem(null);
    }
  }, [navItems]);

  // Fetch navigation items
  useEffect(() => {
    navItemsListApi();
  }, []);

  const navItemsListApi = () => {
    const requestOptions = {
      method: "GET",
    };
    fetch(`https://harsh7541.pythonanywhere.com/admin1/getnavitems`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.status) {
          setNavItems(data["navItems"]);
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

  // Handle scroll
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => setScrolled(window.scrollY > 40);

    if (disableScrollEffect || forceScrolled || less1024) {
      setScrolled(false);
      return;
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [disableScrollEffect, forceScrolled, less1024]);

  // Handle body overflow
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={
        showWhiteNavbar
          ? "NewNavbar_wholeContainerWhite__QY0eF NewNavbar_googleTranslateEnabled__6pHnw"
          : "NewNavbar_wholeContainer__z2zti NewNavbar_googleTranslateEnabled__6pHnw"
      }
      style={{
        backgroundColor:
          isMobileMenuOpen && less1024
            ? "#000000cc"
            : showWhiteNavbar
            ? "#fff"
            : "transparent",
      }}
    >
      <div className="NewNavbar_container__dGANs">
        <div className="NewNavbar_logo__D1qkF">
          <a className="notranslate" href="/">
            {navLogos ? (
              <img
                src={showWhiteNavbar ? navLogos.blackLogo : navLogos.whiteLogo}
                alt="website-logo"
                height={50}
                width={200}
                loading="lazy"
              />
            ) : (
              // Show loading placeholder while fetching
              <div style={{ width: 200, height: 50, backgroundColor: showWhiteNavbar ? '#f0f0f0' : 'rgba(255,255,255,0.1)' }} />
            )}
          </a>
        </div>

        <div
          className="NewNavbar_hide__g8Glm NewNavbar_navLinksContainer__s15t3 navLinksContainer "
          style={{ display: isMobileMenuOpen && less1024 ? "block" : "" }}
        >
          <div className="NewNavbar_linksContainer__tbm-r">
            <ul>
              {navItems.map((item, index) => {
                const hasDropdown = item.dropdown?.length;

                if (less1024) {
                  const isActive = activeMobileDropdown === index;

                  if (isDropdownOpen) {
                    if (!isActive) return null;

                    return (
                      <React.Fragment key={index}>
                        <li>
                          <a
                            href="/"
                            onClick={(e) => {
                              e.preventDefault();
                              setIsDropdownOpen(false);
                              setActiveMobileDropdown(null);
                            }}
                          >
                            <img src={leftArrowIcon} width="12" alt="back" />
                          </a>
                          <a href={item.href}>{item.name}</a>
                        </li>

                        {item.dropdown.map((sub, sIdx) => (
                          <li key={sIdx}>
                            <a href={sub.href}>{sub.name}</a>
                          </li>
                        ))}
                      </React.Fragment>
                    );
                  }

                  return (
                    <li key={index}>
                      <a
                        href={item.href}
                        onClick={(e) => {
                          if (hasDropdown) {
                            e.preventDefault();
                            setActiveMobileDropdown(index);
                            setIsDropdownOpen(true);
                          }
                        }}
                      >
                        {item.name}
                      </a>
                    </li>
                  );
                }

                return (
                  <li
                    key={index}
                    onMouseEnter={() =>
                      activeNavItem !== index && setHoveredIndex(index)
                    }
                    onMouseLeave={() =>
                      activeNavItem !== index && setHoveredIndex(null)
                    }
                  >
                    <a href={item.href}>{item.name}</a>

                    {hasDropdown && (
                      <div
                        className="NewNavbar_expansionMenuOuter__wKpka"
                        style={{
                          visibility:
                            hoveredIndex === index ? "visible" : "hidden",
                          opacity: hoveredIndex === index ? 1 : 0,
                        }}
                      >
                        <div className="NewNavbar_expansionMenu__KBWXI">
                          {item.dropdown.map((sub, sIdx) => (
                            <a key={sIdx} href={sub.href}>
                              {sub.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
            <button onClick={() => navigate("/booking")}>Register</button>
          </div>
        </div>

        <div className="NewNavbar_register__UET28 register_btn">
          {/* <GoogleTranslate
            defaultLang="en"
            showWhiteNavbar={showWhiteNavbar}
            isMobileMenuOpen={isMobileMenuOpen}
            less1024={less1024}
          /> */}

          <button onClick={() => navigate("/booking")}>Register</button>

          {less1024 && (
            <img
              src={isMobileMenuOpen ? closeBtn : hamburger}
              alt="menu"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              style={{ width: 22, cursor: "pointer" }}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
