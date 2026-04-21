// src/App.js
// Theme is now applied via SSR-injected <style> tag in <head>.
// No client-side API calls here — all data flows through window.__INITIAL_DATA__.
import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ContactUs from "./components/ContactUs";
import ScrollToTop from "./ScrollToTop";
import Home from "./components/Home";
import Register from "./components/Register";
import Venue from "./components/Venue";
import Sponsor from "./components/Sponsor";
import MediaPartners from "./components/MediaPartners";
import Agenda from "./components/Agenda";
import WhoShouldAttend from "./components/WhoShouldAttend";
import FeaturedSpeaker from "./components/FeaturedSpeaker";
import Faq from "./components/Faq";
import CallForPresentation from "./components/CallForPresentation";
import Speakers from "./components/Speakers";
import TrendDescriptionPage from "./components/TrendDescriptionPage";
import ExhibitorPackages from "./components/ExhibitorPackages";
import NewsDescription from "./components/NewsDescription";
import SpeakerProfile from "./components/SpeakersProfile";
import Attandees from "./components/Attandees";
import AddDelegateForm from "./components/AddDelegateForm";
import BookingForm from "./components/BookingForm";
import AddSponsorDelegateForm from "./components/AddSponsorDelegateForm";
import News from "./components/News";
import { ToastContainer } from "react-toastify";
// import SponsorBookingForm from "./components/SponsorBookingForm";
import { ApiDataProvider } from "./common/ApiContext";
import PrivacyPolicy from "./components/privacyPolicy";
import ThankYouPage from "./components/thankyouPage";
import TermsAndConditions from "./components/TermsAndConditions";
import Error404 from "./components/Error404";
import SponsorDescription from "./components/SponsorDescription";
import RemindMeLater from "./components/RemindMe";
import SlideShare from "./components/slideShare";
import PayOnline from "./components/payOnline";

function App({ ssrData }) {
  const location = useLocation();
  // ✅ During SSR: use the prop injected by server.js before renderToString.
  // ✅ During CSR:  use window.__INITIAL_DATA__ set by the inline <script> in the HTML.
  const initialData =
    ssrData ??
    (typeof window !== "undefined" && window.__INITIAL_DATA__
      ? window.__INITIAL_DATA__
      : null);

  // ✅ Theme is injected server-side as <style id="ssr-theme"> in <head>.
  // No client-side theme fetch needed. The CSS variables are already applied.

  const setFavicon = (url) => {
    if (!url) return;
    let link = document.querySelector("link[rel*='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.type = "image/png";
    link.href = url + "?v=" + new Date().getTime(); // prevent caching
  };

  // ✅ Track page views on every route change
  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("config", "G-66QV0BWYCN", {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  useEffect(() => {
    const faviconUrl =
      initialData?.home?.homeVideoSctionEventDetails?.[0]?.favicon;
    if (faviconUrl) {
      setFavicon(faviconUrl);
    }
  }, [initialData]);

  return (
    <>
      <Helmet>
        <link
          rel="icon"
          href={initialData?.home?.homeVideoSctionEventDetails?.[0]?.favicon}
        />
        <link
          rel="apple-touch-icon"
          href={initialData?.home?.homeVideoSctionEventDetails?.[0]?.favicon}
        />
      </Helmet>
      <ApiDataProvider initialData={initialData}>
        <ToastContainer
          theme="light"
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <ScrollToTop />
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="contact-us" element={<ContactUs />} />
            <Route path="booking" element={<Register />} />
            <Route path="venue" element={<Venue />} />
            <Route path="sponsors" element={<Sponsor />} />
            <Route path="sponsor/:slug" element={<SponsorDescription />} />
            <Route path="media-partners" element={<MediaPartners />} />
            <Route path="agenda" element={<Agenda />} />
            <Route path="who-should-attend" element={<WhoShouldAttend />} />
            <Route path="faq" element={<Faq />} />
            <Route path="speakers" element={<CallForPresentation />} />
            <Route path="featured-speakers" element={<Speakers />} />
            <Route
              path="trenddescription/:slug"
              element={<TrendDescriptionPage />}
            />
            <Route path="sponsor-packages" element={<ExhibitorPackages />} />
            <Route path="newsdescription/:slug" element={<NewsDescription />} />
            <Route path="speakerprofile/:slug" element={<SpeakerProfile />} />
            <Route path="attandees" element={<Attandees />} />
            <Route path="adddelegate" element={<AddDelegateForm />} />
            <Route path="booking-form" element={<BookingForm />} />
            <Route
              path="sponsor-booking"
              element={<AddSponsorDelegateForm />}
            />
            <Route path="news" element={<News />} />
            <Route path="remind-me-later" element={<RemindMeLater />} />
            {/* <Route path="sponsor-booking" element={<SponsorBookingForm />} /> */}
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route
              path="terms-and-conditions"
              element={<TermsAndConditions />}
            />
            <Route path="thank-you" element={<ThankYouPage />} />
            <Route path="securelogin" element={<SlideShare />} />
            <Route path="pay-online" element={<PayOnline />} />
            <Route path="404" element={<Error404 />} />
            <Route path="*" element={<Error404 />} />
          </Route>
        </Routes>
      </ApiDataProvider>
    </>
  );
}

export default App;
