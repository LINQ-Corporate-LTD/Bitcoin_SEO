// src/common/ApiContext.js
// SSR-aware context provider.
// - During SERVER render: provides data directly from initialData (no hooks).
// - During CLIENT render: uses initialData from window.__INITIAL_DATA__ directly.
//   NEVER re-fetches homepagedata on the client if SSR data is already present.
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// Create the context
export const ApiDataContext = createContext();

// Custom hook to use the context
export const useApiData = () => {
  const context = useContext(ApiDataContext);
  if (!context) {
    throw new Error("useApiData must be used within an ApiDataProvider");
  }
  return context;
};

// Helper to build value from data
function buildValue(data) {
  const home = data?.home || null;
  return {
    data: home,
    homeVideoSettings: home?.homeVideoSctionSettings?.[0],
    eventDetails: home?.homeVideoSctionEventDetails?.[0],
    eventGeneralSettings: home?.eventGeneralSettings?.[0],
    themeSettings: home?.themeSetting?.[0],
    // data.navLogos is now a single object (fetchNavLogos returns [0] already)
    // home.navLogos is an array (from homepagedata), so we use [0] there
    navLogos: data?.navLogos || home?.navLogos?.[0] || null,
    refetch: () => { },
  };
}

// Provider component
export const ApiDataProvider = ({ children, initialData }) => {
  // Build value from SSR-injected data — no client-side fetch ever
  const value = {
    ...buildValue(initialData),
    __allData: initialData, // expose full data so useSSRData works during SSR
  };

  return (
    <ApiDataContext.Provider value={value}>
      {children}
    </ApiDataContext.Provider>
  );
};