import { createContext, useContext} from "react";

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
    navLogos: data?.navLogos || home?.navLogos?.[0] || null,
    pageSeoSettings: home?.pageSeoSettings || [],
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