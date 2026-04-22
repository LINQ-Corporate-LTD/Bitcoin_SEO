import { useState } from "react";
import "../assets/css/CookieBanner.css";


const CookieBanner = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isToggleAnalyticsCookies, setIsToggleAnalyticsCookies] = useState(true);
  const [isToggleFunctionalCookies, setIsToggleFunctionalCookies] = useState(true);
  const [isToggleMarketingCookies, setIsToggleMarketingCookies] = useState(true);


  return (
    <>
      <div className="Cookies_banner__ftQmG" data-testid="cookie-banner">
        <div className="Cookies_bannerContent__4VF8m">
          <div className="Cookies_bannerLeft__IkfbE">
            <p className="Cookies_bannerText__l0qMd">
              We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. Read our{' '}
              <a href="/cookie-policy" className="Cookies_link__sIenQ">Cookie Policy</a>
              {' '}for more information.
            </p>
            <div className="Cookies_bannerActions__jHtZM">
              <button className="Cookies_acceptBtn__krsrW">ACCEPT ALL</button>
              <button className="Cookies_rejectBtn__bKZ9X">REJECT ALL</button>
            </div>
          </div>
          <div className="Cookies_bannerRight__Q3Y4Y">
            <button className="Cookies_manageBtn__bXfM3" onClick={() => setIsPopupOpen(true)}>MANAGE PREFERENCES</button>
          </div>
        </div>
      </div>
      {isPopupOpen && (
        <div className="CookiePreferences_overlay__Hyurn">
          <div className="CookiePreferences_modal__sOBoP">
            <button className="CookiePreferences_closeBtn__JaI5A" aria-label="Close" onClick={() => setIsPopupOpen(false)}>✕</button>
            <h2 className="CookiePreferences_title__bXfM3">Cookie Preferences</h2>
            <p className="CookiePreferences_description__XCpMJ">
              We Use Cookies to help you navigate efficiently and perform certain functions. You will find detailed information about all cookies under each consent Category below.
            </p>
            <div className="CookiePreferences_links__2ITRd">
              <a href="/cookie-policy" className="CookiePreferences_link__-1qWG">Cookie Policy</a>
              <a href="/terms-and-conditions" className="CookiePreferences_link__-1qWG">Terms and Conditions</a>
            </div>
            <div className="CookiePreferences_categories__IdAhN">
              <div className="CookiePreferences_category__60OtH">
                <div className="CookiePreferences_categoryInfo__C+H+v">
                  <span className="CookiePreferences_categoryTitle__zSnQ7">NECESSARY COOKIES</span>
                  <span className="CookiePreferences_categoryDesc__3ktvi">Required for the website to function. Cannot be disabled.</span>
                </div>
                <button className="CookiePreferences_toggle__ZT5Yl" aria-label="Toggle NECESSARY COOKIES" disabled style={{ backgroundColor: '#cccccc', cursor: 'not-allowed', opacity: 0.6 }}>
                  <span className="CookiePreferences_toggleKnob__dMhKN" style={{ transform: "translateX(22px)" }}></span>
                </button>
              </div>
              <div className="CookiePreferences_category__60OtH">
                <div className="CookiePreferences_categoryInfo__C+H+v">
                  <span className="CookiePreferences_categoryTitle__zSnQ7">ANALYTICS COOKIES</span>
                  <span className="CookiePreferences_categoryDesc__3ktvi">Help us understand how visitors interact with our website.</span>
                </div>
                <button className="CookiePreferences_toggle__ZT5Yl" aria-label="Toggle ANALYTICS COOKIES" style={{ backgroundColor: isToggleAnalyticsCookies ? 'var(--primary-color)' : 'var(--secondary-color)', cursor: 'pointer', opacity: 1 }} onClick={() =>
                  setIsToggleAnalyticsCookies(prev => !prev)}>
                  <span className="CookiePreferences_toggleKnob__dMhKN" style={{ transform: isToggleAnalyticsCookies ? "translateX(22px)" : "translateX(0px)" }}></span>
                </button>
              </div>
              <div className="CookiePreferences_category__60OtH">
                <div className="CookiePreferences_categoryInfo__C+H+v">
                  <span className="CookiePreferences_categoryTitle__zSnQ7">FUNCTIONAL COOKIES</span>
                  <span className="CookiePreferences_categoryDesc__3ktvi">Remember your preferences and provide enhanced features.</span>
                </div>
                <button className="CookiePreferences_toggle__ZT5Yl" aria-label="Toggle FUNCTIONAL COOKIES" style={{ backgroundColor: isToggleFunctionalCookies ? 'var(--primary-color)' : 'var(--secondary-color)', cursor: 'pointer', opacity: 1 }} onClick={() => setIsToggleFunctionalCookies(prev => !prev)}>
                  <span className="CookiePreferences_toggleKnob__dMhKN" style={{ transform: isToggleFunctionalCookies ? "translateX(22px)" : "translateX(0px)" }}></span>
                </button>
              </div>
              <div className="CookiePreferences_category__60OtH">
                <div className="CookiePreferences_categoryInfo__C+H+v">
                  <span className="CookiePreferences_categoryTitle__zSnQ7">MARKETING COOKIES</span>
                  <span className="CookiePreferences_categoryDesc__3ktvi">Used to display relevant ads and track campaign effectiveness.</span>
                </div>
                <button className="CookiePreferences_toggle__ZT5Yl" aria-label="Toggle MARKETING COOKIES" style={{ backgroundColor: isToggleMarketingCookies ? 'var(--primary-color)' : 'var(--secondary-color)', cursor: 'pointer', opacity: 1 }} onClick={() => setIsToggleMarketingCookies(prev => !prev)}>
                  <span className="CookiePreferences_toggleKnob__dMhKN" style={{ transform: isToggleMarketingCookies ? "translateX(22px)" : "translateX(0px)" }}></span>
                </button>
              </div>
            </div>
            <div className="CookiePreferences_footer__2ZLR4">
              <button className="CookiePreferences_acceptAllBtn__07aaP">ACCEPT ALL</button>
              <button className="CookiePreferences_saveBtn__pWaoV">SAVE MY PREFERENCES</button>
            </div>
          </div>
        </div >
      )}

    </>
  );
};

export default CookieBanner;
