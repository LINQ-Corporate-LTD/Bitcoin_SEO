// src/App.js
import React from "react";
import { useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
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
import SponsorBookingForm from "./components/SponsorBookingForm";
import { ApiDataProvider } from "./common/ApiContext";
import PrivacyPolicy from "./components/privacyPolicy";
import ThankYouPage from "./components/thankyouPage";
import TermsAndConditions from "./components/TermsAndConditions";
import Error404 from "./components/Error404";
import SponsorDescription from "./components/SponsorDescription";
import RemindMeLater from "./components/RemindMe";

function App() {
  useEffect(() => {
    fetch("https://harsh7541.pythonanywhere.com/admin1/gettheme")
      .then((res) => res.json())
      .then((res) => {
        if (!res.status || !res.themecolors) return;

        const theme = res.themecolors;
        console.log('theme: ', theme);
        const root = document.documentElement;

        theme.primaryColor &&
          root.style.setProperty("--primary-color", theme.primaryColor);

        theme.secondaryColor &&
          root.style.setProperty("--secondary-color", theme.secondaryColor);

        theme.darkColor &&
          root.style.setProperty("--dark-color", theme.darkColor);

        theme.lightColor &&
          root.style.setProperty("--light-color", theme.lightColor);

        theme.gradient &&
          root.style.setProperty("--linearGradient-color", theme.gradientColor);
      })
      .catch((err) => console.error("Theme API error:", err));
  }, []);
  // ✅ Get initial data from window if available (from SSR)
  const initialData = typeof window !== 'undefined' && window.__INITIAL_DATA__ 
    ? window.__INITIAL_DATA__ 
    : null;

  console.log("App.js - initialData:", initialData ? "Available" : "Not available");
  console.log("App.js - Full data:", initialData);

  return (
    <>
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
            <Route path="featuredSpeaker" element={<FeaturedSpeaker />} />
            <Route path="faq" element={<Faq />} />
            <Route path="speakers" element={<CallForPresentation />} />
            <Route path="featured-Speakers" element={<Speakers />} />
            <Route
              path="trenddescription/:slug"
              element={<TrendDescriptionPage />}
            />
            <Route path="sponsor-packages" element={<ExhibitorPackages />} />
            <Route
              path="newsdescription/:slug"
              element={<NewsDescription />}
            />
            <Route path="speakerprofile/:slug" element={<SpeakerProfile />} />
            <Route path="attandees" element={<Attandees />} />
            <Route path="adddelegate" element={<AddDelegateForm />} />
            <Route path="booking-form" element={<BookingForm />} />
            <Route
              path="addsponsordelegate"
              element={<AddSponsorDelegateForm />}
            />
            <Route path="news" element={<News />} />
            <Route path="remind-me-later" element={<RemindMeLater />} />
            <Route path="sponsor-booking" element={<SponsorBookingForm />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="thank-you" element={<ThankYouPage />} />
            <Route path="404" element={<Error404 />} />
            <Route path="*" element={<Error404 />} />
          </Route>
        </Routes>
      </ApiDataProvider>
    </>
  );
}

export default App;