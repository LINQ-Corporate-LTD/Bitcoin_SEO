import React, { useEffect, useState } from "react";

const LANGS = [
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
  { code: "de", label: "DE" },
  { code: "es", label: "ES" },
  { code: "pt", label: "PT" },
  { code: "ru", label: "RU" },
  { code: "sv", label: "SV" },
];

export default function GoogleTranslate({ 
  defaultLang = "en",
  showWhiteNavbar = false,
  isMobileMenuOpen = false,
  less1024 = false
}) {
  const [currentLang, setCurrentLang] = useState(defaultLang);

  const handleChange = (e) => {
    const selectedLang = e.target.value;
    setCurrentLang(selectedLang);
    
    // Use cookie method - this is the most reliable way
    const domain = window.location.hostname;
    const cookieValue = `/en/${selectedLang}`;
    
    // Set Google Translate cookie
    document.cookie = `googtrans=${cookieValue}; domain=${domain}; path=/`;
    document.cookie = `googtrans=${cookieValue}; path=/`;
    
    // Also set it without domain for localhost
    document.cookie = `googtrans=${cookieValue}`;
    
    console.log("Language cookie set to:", selectedLang);
    
    // Reload page to apply translation
    window.location.reload();
  };

  // Check current language from cookie on mount
  useEffect(() => {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'googtrans') {
        const lang = value.split('/')[2];
        if (lang && lang !== currentLang) {
          setCurrentLang(lang);
        }
      }
    }
  }, []);

  // Determine the color based on navbar state
  const dropdownColor = isMobileMenuOpen && less1024
    ? "#ffffff"
    : showWhiteNavbar
    ? "#000000"
    : "#ffffff";

  // Create unique class name based on color to force CSS update
  const dropdownClass = `lang-dropdown-${dropdownColor === "#000000" ? "black" : "white"}`;

  console.log("Dropdown Color:", dropdownColor);
  console.log("Dropdown Class:", dropdownClass);
  console.log("showWhiteNavbar:", showWhiteNavbar);

  return (
    <div style={{ marginRight: "15px", marginLeft: "5px" }}>
      <style>
        {`
          select:focus-visible {
            border: none !important;
            outline: none !important;
            box-shadow: none !important;
          }
          
          /* Custom arrow color - White arrow */
          .lang-dropdown-white {
            appearance: none !important;
            -webkit-appearance: none !important;
            -moz-appearance: none !important;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Cpath fill='%23ffffff' d='M8 11L3 6h10z'/%3E%3C/svg%3E") !important;
            background-repeat: no-repeat !important;
            background-position: right 4px center !important;
            background-size: 14px !important;
            padding-right: 22px !important;
          }
          
          /* Custom arrow color - Black arrow */
          .lang-dropdown-black {
            appearance: none !important;
            -webkit-appearance: none !important;
            -moz-appearance: none !important;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Cpath fill='%23000000' d='M8 11L3 6h10z'/%3E%3C/svg%3E") !important;
            background-repeat: no-repeat !important;
            background-position: right 4px center !important;
            background-size: 14px !important;
            padding-right: 22px !important;
          }
        `}
      </style>
      <select
        onChange={handleChange}
        value={currentLang}
        className={`notranslate ${dropdownClass}`}
        style={{
          background: "transparent",
          border: "none",
          color: dropdownColor,
          fontSize: "14px",
          outline: "none",
          cursor: "pointer",
        }}
      >
        {LANGS.map((l) => (
          <option key={l.code} value={l.code} style={{ color: "#000000" }}>
            {l.label}
          </option>
        ))}
      </select>
    </div>
  );
}