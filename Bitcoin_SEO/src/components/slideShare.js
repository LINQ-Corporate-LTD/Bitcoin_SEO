import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
// import "../../src/assets/css/sponsor.css";
import Navbar from "./Navbar";
import "../assets/css/slideShare.css";
import Footer from "../Footer";
import { useSSRData } from "../common/useSSRData";
import Modal from "react-modal";

const SlideShare = () => {

    // ✅ SSR data — no client-side GET requests

    const slideShare = [
        {
            heading: "CHARGING AHEAD: STATES ADVANCING THE US ZEV TRANSITION",
            author: "Georgia Lowe | Adam Ruder",
            company: "Foreign, Commonwealth & Development Office | New York State Energy Research and Development Authority",
            slideShareLink: "https://www.scribd.com/embeds/1002941470/content?start_page=1&view_mode=scroll&access_key=key-RiF7utQ5Tsc5CTCpXZqu",
            project: "2026",
            image: "https://www.uk.evcharging-infrastructure.com/api/images/1771923729922.jpg",
        },
        {
            heading: "MATCHING SUPPLY TO DEMAND FOR EV PUBLIC CHARGING IN THE UK",
            author: "Jamie Hamilton",
            company: "Deloitte",
            slideShareLink: "https://www.scribd.com/embeds/1002941459/content?start_page=1&view_mode=scroll&access_key=key-J3zcz0zqKFPBsDOTzmoq",
            project: "2026",
            image: "https://www.uk.evcharging-infrastructure.com/api/images/1771923850580.jpg",
        },
        {
            heading: "EV ADOPTION PATTERNS: THE KEY BARRIER HIDDEN IN THE DATA",
            author: "Joel Teague",
            company: "Co Charger",
            slideShareLink: "https://www.scribd.com/embeds/1002941457/content?start_page=1&view_mode=scroll&access_key=key-vW1WNgI0QaReKgxFo9EL",
            project: "2026",
            image: "https://www.uk.evcharging-infrastructure.com/api/images/1771923981726.jpg",
        },
    ];

    const [windowWidth, setWindowWidth] = useState(
        typeof window !== "undefined" ? window.innerWidth : 1200,
    );

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenAttendees, setIsOpenAttendees] = useState(false);
    const [activePdf, setActivePdf] = useState("");
    const [activePdfTitle, setActivePdfTitle] = useState("");
    const isVerify = "true";

    const seoTitle = `Bitcoin Innovation & Market Evolution 2026 | Sponsorship`;
    const seoDesc = "Exhibit or sponsor at Bitcoin Innovation & Market Evolution 2026 and connect with miners, exchanges, fintechs, regulators and blockchain leaders.";

    const delegatesName = [
        {
            "id": 308,
            "delegatename": "Adam Ruder",
            "companyname": "New York State Energy Research and Development Authority",
            "project": "2026",
            "createdAt": "2026-02-24T08:48:23.000Z",
            "updatedAt": "2026-02-24T08:48:23.000Z"
        },
        {
            "id": 309,
            "delegatename": "Adam Thorp",
            "companyname": "VINCI Facilities (Building Solutions)",
            "project": "2026",
            "createdAt": "2026-02-24T08:48:23.000Z",
            "updatedAt": "2026-02-24T08:48:23.000Z"
        },
        {
            "id": 310,
            "delegatename": "Alevtina Novikova",
            "companyname": "Mobility Plaza",
            "project": "2026",
            "createdAt": "2026-02-24T08:48:23.000Z",
            "updatedAt": "2026-02-24T08:48:23.000Z"
        },
        {
            "id": 311,
            "delegatename": "Alex Georgianna",
            "companyname": "Grace Automotive",
            "project": "2026",
            "createdAt": "2026-02-24T08:48:23.000Z",
            "updatedAt": "2026-02-24T08:48:23.000Z"
        },
        {
            "id": 312,
            "delegatename": "Alex Mitchell",
            "companyname": "British Embassy Washington",
            "project": "2026",
            "createdAt": "2026-02-24T08:48:23.000Z",
            "updatedAt": "2026-02-24T08:48:23.000Z"
        },
        {
            "id": 313,
            "delegatename": "Alexander Boedeker",
            "companyname": "MHP – A Porsche Company",
            "project": "2026",
            "createdAt": "2026-02-24T08:48:23.000Z",
            "updatedAt": "2026-02-24T08:48:23.000Z"
        },
        {
            "id": 314,
            "delegatename": "Ali-Naqi Esmail",
            "companyname": "Osprey Charging Network",
            "project": "2026",
            "createdAt": "2026-02-24T08:48:23.000Z",
            "updatedAt": "2026-02-24T08:48:23.000Z"
        },
        {
            "id": 315,
            "delegatename": "Alok Dubey",
            "companyname": "Monta",
            "project": "2026",
            "createdAt": "2026-02-24T08:48:23.000Z",
            "updatedAt": "2026-02-24T08:48:23.000Z"
        },
        {
            "id": 316,
            "delegatename": "Amy Schlosser",
            "companyname": "British Embassy Washington",
            "project": "2026",
            "createdAt": "2026-02-24T08:48:23.000Z",
            "updatedAt": "2026-02-24T08:48:23.000Z"
        },
        {
            "id": 317,
            "delegatename": "Andres Martell",
            "companyname": "Catapult",
            "project": "2026",
            "createdAt": "2026-02-24T08:48:23.000Z",
            "updatedAt": "2026-02-24T08:48:23.000Z"
        },
        {
            "id": 318,
            "delegatename": "Andrew Aylesbury",
            "companyname": "Duku EV",
            "project": "2026",
            "createdAt": "2026-02-24T08:48:23.000Z",
            "updatedAt": "2026-02-24T08:48:23.000Z"
        },
        {
            "id": 319,
            "delegatename": "Andrew Nosworthy",
            "companyname": "Osprey Charging Network Ltd",
            "project": "2026",
            "createdAt": "2026-02-24T08:48:23.000Z",
            "updatedAt": "2026-02-24T08:48:23.000Z"
        },
        {
            "id": 320,
            "delegatename": "Andrew Rogers",
            "companyname": "Boundary Stone Partners",
            "project": "2026",
            "createdAt": "2026-02-24T08:48:23.000Z",
            "updatedAt": "2026-02-24T08:48:23.000Z"
        },
        {
            "id": 321,
            "delegatename": "Andrine Mendez",
            "companyname": "GoPlugable",
            "project": "2026",
            "createdAt": "2026-02-24T08:48:23.000Z",
            "updatedAt": "2026-02-24T08:48:23.000Z"
        },
        {
            "id": 322,
            "delegatename": "Angela Muresan",
            "companyname": "Enspec Power",
            "project": "2026",
            "createdAt": "2026-02-24T08:48:23.000Z",
            "updatedAt": "2026-02-24T08:48:23.000Z"
        },
        {
            "id": 323,
            "delegatename": "Anna Krajinska",
            "companyname": "Transport & Environment",
            "project": "2026",
            "createdAt": "2026-02-24T08:48:23.000Z",
            "updatedAt": "2026-02-24T08:48:23.000Z"
        },
        {
            "id": 324,
            "delegatename": "Ashok Willis",
            "companyname": "Gridcog",
            "project": "2026",
            "createdAt": "2026-02-24T08:48:23.000Z",
            "updatedAt": "2026-02-24T08:48:23.000Z"
        }
    ]

    return (
        <div id="root">
            <>
                <Helmet>
                    <title>{seoTitle}</title>
                    <meta name="description" content={seoDesc} />
                    <meta property="og:title" content={seoTitle} />
                    <meta property="og:description" content={seoDesc} />
                    <meta property="og:type" content="website" />
                    <meta name="twitter:card" content="summary" />
                    <meta name="twitter:title" content={seoTitle} />
                    <link rel="canonical" href="https://www.bitcoin-innovation-market-evolution.online/sponsors" />
                </Helmet>
                <div style={{ opacity: 1 }}>
                    <div style={{ marginTop: windowWidth > 1024 ? "120px" : "" }}>
                        <Navbar forceScrolled />
                        <div className="Slideshare_container__TrIvi">
                            <div className="Slideshare_topContainer__Yu35o">
                                <div className="Slideshare_authenticate__A8Vrd" style={{ display: isVerify === "true" ? 'flex' : '', flexDirection: isVerify === "true" ? 'column' : '', justifyContent: isVerify === "true" ? 'center' : '' }}>
                                    {isVerify === "true" ? (
                                        <>
                                            <p className="Slideshare_welcomePara__b7Kc2" style={{ margin: '0px' }}>
                                                Welcome,
                                                <span>email@test</span>
                                            </p>
                                            <div className="Slideshare_logoutContainer__RSKNv">
                                                <p className="Slideshare_authPara3__Nefi0">
                                                    <span onClick={() => {
                                                        if (isVerify !== "true") return;
                                                        // setActivePdf(slide.slideShareLink);
                                                        // setActivePdfTitle(slide.heading);
                                                        setIsOpenAttendees(true);
                                                    }} style={{ textDecoration: 'underline', cursor: 'pointer' }}> Click here</span>
                                                    {' '} to view a full list of delegates registered to attend {' '}
                                                    <span className="Slideshare_authPara3Span__zPzva">
                                                        EV CHARGING UK
                                                        2026
                                                    </span>
                                                </p>
                                                <button>Logout</button>
                                            </div>
                                            <div></div>
                                        </>
                                    ) :
                                        (
                                            <>
                                                <h1>access the presentations</h1>
                                                <p className="Slideshare_authPara1__ZI+o7">
                                                    Please verify below to access the
                                                    <span>presentations</span>
                                                    .
                                                </p>
                                                <form data-hs-cf-bound="true" data-gtm-form-interact-id="0">
                                                    <div>
                                                        <div>
                                                            <input type="email" placeholder="Email address *" data-gtm-form-interact-field-id="0"></input>
                                                            <input type="password" placeholder="Password *" data-gtm-form-interact-field-id="1"></input>
                                                        </div>
                                                    </div>
                                                    <input type="submit" value="Verify"></input>
                                                </form>
                                                <p className="Slideshare_authPara2__9QGA2">
                                                    If you do not have these details and would like to gain access please email our delegates team at
                                                    <a href="mailto:delegates@iq-hub.com" style={{ display: 'block' }}>delegates@iq-hub.com</a>
                                                </p>
                                            </>
                                        )
                                    }

                                </div>
                            </div>
                            <div className="Slideshare_bottomContainer__oejp4">
                                <div className="Slideshare_slidesContainer__jsZ-m">
                                    <div className="Slideshare_topSec__EeRby">
                                        <h3>Presentations Viewer</h3>
                                        <p>
                                            The
                                            <span style={{ fontWeight: 800 }}> Bitcoin Innovation & Market Evolution 2026 </span>
                                            is the only event delivering cutting-edge market intelligence and sector-specific insights into innovative water treatment technologies that enhance operational efficiency.
                                        </p>
                                    </div>
                                    {slideShare.map((slide) => (
                                        <div className="Slideshare_slide__QlPAx"
                                            onClick={() => {
                                                if (isVerify !== "true") return;
                                                setActivePdf(slide.slideShareLink);
                                                setActivePdfTitle(slide.heading);
                                                setIsOpen(true);
                                            }}
                                            style={{ cursor: isVerify === "true" ? "pointer" : "" }}>
                                            <div className="Slideshare_slideLeft__428RJ">
                                                <img src={slide.image} alt="thumbnail of the slide"></img>
                                            </div>
                                            <div className="Slideshare_slideRight__Zch8R">
                                                <h5>{slide.heading}</h5>
                                                <p>{slide.author}, {slide.company}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    isOpen={isOpen}
                    onRequestClose={() => setIsOpen(false)}
                    className="ReactModalPortal"
                    style={{
                        content: {
                            position: 'absolute',
                            inset: '40px 0px',
                            border: '1px solid rgb(204, 204, 204)',
                            background: 'rgb(255, 255, 255)',
                            overflow: 'hidden',
                            borderRadius: '8px',
                            outline: 'none',
                            padding: '20px',
                            width: '95 %',
                            maxWidth: '1200px',
                            margin: 'auto',
                            maxHeight: '800px',
                        },
                        overlay: {
                            backgroundColor: "rgba(0,0,0,0.55)",
                            zIndex: 9999
                        }
                    }}
                >
                    <div onClick={() => setIsOpen(false)} style={{ display: "flex", justifyContent: 'flex-end', marginBottom: '10px' }}>
                        <button style={{ border: 'none', backgroundColor: 'transparent', margin: '0px', padding: '0px', cursor: 'pointer' }}>
                            <img src="https://www.uk.evcharging-infrastructure.com/images/icons/close-mustard.png" alt="close icon" width='18'></img>
                        </button>
                    </div>
                    <div>
                        <iframe
                            title={activePdfTitle}
                            src={activePdf}
                            width="100%"
                            height="700px"
                        />
                    </div>
                </Modal>
                <Modal
                    isOpen={isOpenAttendees}
                    onRequestClose={() => setIsOpenAttendees(false)}
                    className="ReactModalPortal"
                    style={{
                        content: {
                            position: 'absolute',
                            inset: '40px',
                            border: '1px solid rgb(204, 204, 204)',
                            background: 'rgb(255, 255, 255)',
                            overflow: 'auto',
                            borderRadius: ' 4px',
                            outline: 'none',
                            padding: '20px',
                            width: '80 %',
                            maxWidth: '800px',
                            margin: 'auto',
                            maxHeight: ' 600px',
                        },
                        overlay: {
                            backgroundColor: "rgba(0,0,0,0.55)",
                            zIndex: 9999
                        }
                    }}
                >
                    <div onClick={() => setIsOpenAttendees(false)} style={{ display: "flex", justifyContent: 'flex-end' }}>
                        <button style={{ border: 'none', backgroundColor: 'transparent', margin: '0px', padding: '0px', cursor: 'pointer' }}>
                            <img src="https://www.uk.evcharging-infrastructure.com/images/icons/close-mustard.png" alt="close icon" width='18'></img>
                        </button>
                    </div>
                    <div className="Slideshare_tableContainer__J6uzu">
                        <h3>Registered Delegate:
                            EV CHARGING UK 2026
                        </h3>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <tr style={{ backgroundColor: '#181818' }}>
                                <td style={{ fontWeight: '700', color: '#ffffff' }}>Delegate Name</td>
                                <td style={{ fontWeight: '700', color: '#ffffff' }}>Company</td>
                            </tr>
                            {
                                delegatesName.map((delegate, index) => (
                                    console.log('index', index),

                                    <tr>
                                        <td style={{ paddingTop: delegatesName.length > 0 && index === 0 ? '20px' : '' }}>{delegate.delegatename}</td>
                                        <td style={{ paddingTop: delegatesName.length > 0 && index === 0 ? '20px' : '' }}>{delegate.companyname}</td>
                                    </tr>
                                ))
                            }

                        </table>
                    </div>
                </Modal>
                <Footer />
            </>
        </div >
    );
};
export default SlideShare;
