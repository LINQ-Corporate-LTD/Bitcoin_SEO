// src/common/ApiContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

// Create the context
const ApiDataContext = createContext();

// Custom hook to use the context
export const useApiData = () => {
  const context = useContext(ApiDataContext);
  if (!context) {
    throw new Error("useApiData must be used within an ApiDataProvider");
  }
  return context;
};

// Inner component that uses hooks
const ApiDataProviderInner = ({ children, initialData }) => {
  const [data, setData] = useState(initialData || null);
  const [isClient, setIsClient] = useState(false);
  const navigate = useNavigate(); // ✅ Safe to call here - only renders in BrowserRouter
  
  console.log("data: ", data);
  console.log("initialData from SSR: ", initialData);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!initialData && isClient) {
      console.log("📡 Fetching data on client side...");
      fetchData();
    } else if (initialData) {
      console.log("✅ Using SSR initial data");
    }
  }, [initialData, isClient]);

  const fetchData = () => {
    if (typeof window === 'undefined') {
      return;
    }

    const requestOptions = {
      method: "GET",
    };
    
    fetch(`https://harsh7541.pythonanywhere.com/admin1/homepagedata`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (
          data &&
          (data.detail === "The Token is expired" ||
            data.message === "Invalid token")
        ) {
          navigate("/logout");
        }
        if (data && data.status) {
          setData(data["homePageSettings"]);
        } else {
          if (isClient) {
            toast.error(data?.message);
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        if (isClient) {
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
        }
      });
  };

  const value = {
    data,
    homeVideoSettings: data?.homeVideoSctionSettings?.[0],
    eventDetails: data?.homeVideoSctionEventDetails?.[0],
    eventGeneralSettings: data?.eventGeneralSettings?.[0],
    themeSettings: data?.themeSetting?.[0],
    navLogos: data?.navLogos?.[0],
    refetch: () => fetchData(),
  };

  return (
    <ApiDataContext.Provider value={value}>{children}</ApiDataContext.Provider>
  );
};

// Provider component - exported version
export const ApiDataProvider = ({ children, initialData }) => {
  // ✅ During SSR, provide a simple context without hooks
  if (typeof window === 'undefined') {
    const value = {
      data: initialData || null,
      homeVideoSettings: initialData?.homeVideoSctionSettings?.[0],
      eventDetails: initialData?.homeVideoSctionEventDetails?.[0],
      eventGeneralSettings: initialData?.eventGeneralSettings?.[0],
      themeSettings: initialData?.themeSetting?.[0],
      navLogos: initialData?.navLogos?.[0],
      refetch: () => {},
    };
    
    return (
      <ApiDataContext.Provider value={value}>
        {children}
      </ApiDataContext.Provider>
    );
  }

  // ✅ On client, use the full provider with hooks
  return (
    <ApiDataProviderInner initialData={initialData}>
      {children}
    </ApiDataProviderInner>
  );
};