// server/ssrDataFetcher.js
// Centralised SSR data fetcher — fetches ALL page data on the server before React renders.
// No read-only API calls will happen client-side when this data is available.

const fetch = require("node-fetch");

const BASE_URL = "https://harsh7541.pythonanywhere.com/admin1";

/* -------- helpers -------- */
async function get(endpoint) {
    try {
        const res = await fetch(`${BASE_URL}/${endpoint}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) return null;
        return await res.json();
    } catch (e) {
        console.error(`❌ SSR fetch error [${endpoint}]:`, e.message);
        return null;
    }
}

async function post(endpoint, formData) {
    try {
        const res = await fetch(`${BASE_URL}/${endpoint}`, {
            method: "POST",
            body: formData,
        });
        if (!res.ok) return null;
        return await res.json();
    } catch (e) {
        console.error(`❌ SSR post error [${endpoint}]:`, e.message);
        return null;
    }
}

/* -------- slug helpers -------- */
function toSlug(str = "") {
    return str
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

function toTrendSlug(str = "") {
    return str.replace(/\s+/g, "-");
}

/* -------- individual fetchers -------- */
async function fetchTheme() {
    const d = await get("gettheme");
    return d?.status ? d.themecolors : null;
}

async function fetchNavLogos() {
    // Try the dedicated endpoint first
    const d = await get("getnavlogos");
    if (d?.status && d.navLogos) {
        const raw = d.navLogos;
        return Array.isArray(raw) ? raw[0] : raw;
    }
    // Fallback: extract navLogos from homepagedata (always available)
    const home = await get("homepagedata");
    if (home?.status && home.homePageSettings?.navLogos) {
        const raw = home.homePageSettings.navLogos;
        return Array.isArray(raw) ? raw[0] : raw;
    }
    return null;
}

async function fetchNavItems() {
    const d = await get("getnavitems");
    return d?.status ? d.navItems : [];
}

async function fetchHomeData() {
    const d = await get("homepagedata");
    return d?.status ? d.homePageSettings : null;
}

async function fetchSponsors() {
    const d = await get("eventsponsors");
    return d?.status ? d.eventSponsors : [];
}

async function fetchSpeakers() {
    const d = await get("eventspeakers");
    return d?.status ? d.eventSpeakersList : [];
}

async function fetchSpeakerById(id) {
    const { FormData } = require("formdata-node");
    const fd = new FormData();
    fd.append("speakerId", String(id));
    const d = await post("speakerbyid", fd);
    return d?.status && d.speakerData?.length > 0 ? d.speakerData : null;
}

async function fetchNews() {
    const d = await get("generalnews");
    return d?.status ? d.generalNews : [];
}

async function fetchNewsById(id) {
    const { FormData } = require("formdata-node");
    const fd = new FormData();
    fd.append("newsId", String(id));
    const d = await post("newsbyid", fd);
    return d?.status && d.NewsData?.length > 0 ? d.NewsData : null;
}

async function fetchVenueData() {
    const d = await get("getvenuedata");
    return d?.status ? d.venuePageStaticData : [];
}

async function fetchVenueGallery() {
    const d = await get("venuegalleryimages");
    return d?.status ? d.venueGalleryImages : [];
}

async function fetchFaqs() {
    const d = await get("eventfaqs");
    return d?.status ? d.faqsList : [];
}

async function fetchTrends() {
    const d = await get("eventindustrytrends");
    return d?.status ? d.eventIndustryTrends : [];
}

async function fetchTrendById(id) {
    const { FormData } = require("formdata-node");
    const fd = new FormData();
    fd.append("trendId", String(id));
    const d = await post("trendbyid", fd);
    return d?.status ? d.trendData : null;
}

async function fetchMediaPartners() {
    const d = await get("mediapagehelpers");
    return d?.status ? d.mediaPageHelpers : [];
}

async function fetchLogoCarousel() {
    const d = await get("homepagecompanieslogo");
    return d?.status ? d.homePageCompaniesList : [];
}

async function fetchSponsorById(id) {
    const { FormData } = require("formdata-node");
    const fd = new FormData();
    fd.append("sponsorId", String(id));
    const d = await post("sponsorbyid", fd);
    return d?.status && d.sponsorData?.length > 0 ? d.sponsorData : null;
}

/* ---- WhoShouldAttend / Attendees ---- */
async function fetchWhoShouldAttend() {
    // Use homepagedata which contains whoshouldattend info, or a dedicated endpoint if it exists
    const d = await get("whoshouldattendpagedata");
    return d?.status ? d : null;
}

async function fetchAttendees() {
    const d = await get("eventattendees");
    return d?.status ? d : null;
}

async function fetchContactHelpers() {
    const d = await get("contactushelpers");
    return d?.status ? d.contactUsHelpers : [];
}

async function fetchContactPageData() {
    const d = await get("contactusstaticdata");
    return d?.status ? d.contatusPageStaticData : [];
}

async function fetchSponsorPageData() {
    const d = await get("getsponsorpagedata");
    return d?.status ? d.sponsorPageStaticData : [];
}

async function fetchDelegatePackages() {
    const d = await get("deligatepackageslist");
    return d?.status ? d.delegatePackages : [];
}

/* -------- main export -------- */
/**
 * @param {string} pathname  - req.path e.g. "/", "/venue", "/speakerprofile/john-doe"
 * @returns {Promise<object>} - Structured initial data object keyed by domain
 */
async function fetchSSRData(pathname) {
    // Always fetch theme + logoCarousel + navLogos + navItems (needed on every page)
    const [theme, logoCarousel, navLogos, navItems] = await Promise.all([
        fetchTheme(),
        fetchLogoCarousel(),
        fetchNavLogos(),
        fetchNavItems(),
    ]);

    const base = { theme, logoCarousel, navLogos, navItems };

    // ---- HOME ----
    if (pathname === "/" || pathname === "") {
        const [home, sponsors, speakers, news, trends] = await Promise.all([
            fetchHomeData(),
            fetchSponsors(),
            fetchSpeakers(),
            fetchNews(),
            fetchTrends(),
        ]);
        return { ...base, home, sponsors, speakers, news, trends };
    }

    // ---- VENUE ----
    if (pathname === "/venue") {
        const [venue, venueGallery] = await Promise.all([
            fetchVenueData(),
            fetchVenueGallery(),
        ]);
        return { ...base, venue, venueGallery };
    }

    // ---- FEATURED SPEAKERS (full page) ----
    if (pathname === "/featured-speakers") {
        const speakers = await fetchSpeakers();
        return { ...base, speakers };
    }

    // ---- CALL FOR PRESENTATION / BECOME A SPEAKER ----
    if (pathname === "/speakers") {
        const speakers = await fetchSpeakers();
        return { ...base, speakers };
    }

    // ---- SPEAKER PROFILE (dynamic) ----
    if (pathname.startsWith("/speakerprofile/")) {
        const slug = pathname.replace("/speakerprofile/", "");
        const speakers = await fetchSpeakers();
        const matched = speakers.find(
            (s) => s.eventSpeakerName?.toLowerCase().replace(/\s+/g, "-") === slug
        );
        let speakerProfile = null;
        if (matched) {
            speakerProfile = await fetchSpeakerById(matched.id);
        }
        return { ...base, speakers, speakerProfile };
    }

    // ---- SPONSORS ----
    if (pathname === "/sponsors") {
        const sponsors = await fetchSponsors();
        const sponsorPageData = await fetchSponsorPageData();
        const mediaPartners = await fetchMediaPartners();
        return { ...base, sponsors, sponsorPageData, mediaPartners };
    }

    // ---- SPONSOR DESCRIPTION (dynamic) ----
    if (pathname.startsWith("/sponsor/")) {
        const slug = pathname.replace("/sponsor/", "");
        const sponsors = await fetchSponsors();
        const matched = sponsors.find((s) => toSlug(s.sponsorComapnyName) === slug);
        let sponsorProfile = null;
        if (matched) {
            sponsorProfile = await fetchSponsorById(matched.id);
        }
        return { ...base, sponsors, sponsorProfile };
    }

    // ---- EXHIBITOR PACKAGES ----
    if (pathname === "/sponsor-packages") {
        const sponsors = await fetchSponsors();
        return { ...base, sponsors };
    }

    // ---- MEDIA PARTNERS ----
    if (pathname === "/media-partners") {
        const mediaPartners = await fetchMediaPartners();
        return { ...base, mediaPartners };
    }

    // ---- AGENDA (uses homepagedata + custom agenda endpoint) ----
    if (pathname === "/agenda") {
        const home = await fetchHomeData();
        const speakers = await fetchSpeakers();
        return { ...base, home, speakers };
    }

    // ---- NEWS LIST ----
    if (pathname === "/news") {
        const news = await fetchNews();
        return { ...base, news };
    }

    // ---- NEWS DESCRIPTION (dynamic) ----
    if (pathname.startsWith("/newsdescription/")) {
        const slug = pathname.replace("/newsdescription/", "");
        const news = await fetchNews();
        const matched = news.find((n) => {
            const s = n.newsTitle
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, "")
                .replace(/\s+/g, "-")
                .replace(/-+/g, "-");
            return s === slug;
        });
        let newsDetail = null;
        if (matched) {
            newsDetail = await fetchNewsById(matched.id);
        }
        return { ...base, news, newsDetail };
    }

    // ---- TREND DESCRIPTION (dynamic) ----
    if (pathname.startsWith("/trenddescription/")) {
        const slug = pathname.replace("/trenddescription/", "");
        const [trends, sponsors, speakers] = await Promise.all([fetchTrends(), fetchSponsors(), fetchSpeakers(),]);
        const matched = trends.find((t) => toTrendSlug(t.trendTitle) === slug);
        let trendDetail = null;
        if (matched) {
            trendDetail = await fetchTrendById(matched.id);
        }
        return { ...base, trends, sponsors, trendDetail, speakers };
    }

    // ---- FAQ ----
    if (pathname === "/faq") {
        const faqs = await fetchFaqs();
        return { ...base, faqs };
    }

    // ---- WHO SHOULD ATTEND ----
    if (pathname === "/who-should-attend") {
        const whoShouldAttend = await fetchWhoShouldAttend();
        const speakers = await fetchSpeakers();
        return { ...base, whoShouldAttend, speakers };
    }

    // ---- ATTENDEES ----
    if (pathname === "/attandees") {
        const attendees = await fetchAttendees();
        return { ...base, attendees };
    }

    // ---- FEATURED SPEAKER (section) ----
    if (pathname === "/featuredSpeaker") {
        const speakers = await fetchSpeakers();
        return { ...base, speakers };
    }

    // ---- REGISTER ----
    if (pathname === "/booking") {
        const [delegatePackages, home] = await Promise.all([
            fetchDelegatePackages(),
            fetchHomeData(),        // ← add this
        ]);
        return { ...base, delegatePackages, home };
    }

    // ---- CONTACT US ----
    if (pathname === "/contact-us") {
        const [contactHelpers, contactPageData] = await Promise.all([
            fetchContactHelpers(),
            fetchContactPageData(),
        ]);
        return { ...base, contactHelpers, contactPageData };
    }

    // ---- SPONSORS PAGE ----
    if (pathname === "/sponsors") {
        const [sponsors, sponsorPageData, mediaPartners] = await Promise.all([
            fetchSponsors(),
            fetchSponsorPageData(),
            fetchMediaPartners(),
        ]);
        return { ...base, sponsors, sponsorPageData, mediaPartners };
    }

    // ---- Default: all other pages (contact, booking, forms, etc.) — theme only ----
    return { ...base };
}

module.exports = { fetchSSRData };
