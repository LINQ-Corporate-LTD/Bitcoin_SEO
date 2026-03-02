import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/IndustryTrend.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const IndustryTrend = () => {
  const navigate = useNavigate();
  const [indutryTrendList, setIndustryTrendList] = useState([]);
  useEffect(() => {
    callIndustryTrendListApi();
  }, []);
  const callIndustryTrendListApi = () => {
    const requestOptions = {
      method: "GET",
    };
    fetch(`https://harsh7541.pythonanywhere.com/admin1/eventindustrytrends`, requestOptions)
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
          setIndustryTrendList(data["eventIndustryTrends"]);
        } else {
          toast.error(data?.message);
        }
      })
      .catch((error) => {
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
  const handleClick = (trend) => {
    const trendTitle = trend?.trendTitle.replace(/\s+/g, "-");
    navigate(`/trenddescription/${trendTitle}`, { state: trend }); // ✅ Pass member object in route state
  };
  return (
    <article className="HomeScreen_industryTrends__KoD6-">
      <div className="HomeScreen_industryTrendsContainer__+xwuK">
        <h1>Industry Trends</h1>
        <div>
          <>
            <div>
              {indutryTrendList?.map((trend, index) => index < 2 ?
                (
                  <p
                    key={index}
                    onClick={() =>
                      handleClick(trend)
                    }
                  >
                    {trend?.trendTitle}
                  </p>
                ) : null
              )}
            </div>
            <div>
              {indutryTrendList?.map((trend, index) => index >= 2 ?
                (
                  <p
                    key={index}
                    onClick={() =>
                      handleClick(trend)
                    }
                  >
                    {trend?.trendTitle}
                  </p>
                ) : null
              )}
            </div>
          </>
        </div>
      </div>
    </article>
    // <section className="bg-black py-24">
    //   <div className="max-w-7xl mx-auto text-center">
    //     <h2 className="text-white text-2xl sm:text-3xl font-bold mb-8 uppercase">Industry Trends</h2>

    //     <div className="flex flex-wrap justify-center gap-4">
    //       {IndustryTrendArr.map((trend, idx) => (
    //         <button
    //           key={idx}
    //           onClick={() => navigate(`/trenddescription/${trend.toLowerCase().replace(/\s+/g, "-")}`)}
    //           className="text-white border border-white px-6 py-2 text-sm font-semibold uppercase hover:bg-white hover:text-[black!important] hover:cursor-pointer transition duration-300"
    //         >
    //           {trend}
    //         </button>
    //       ))}
    //     </div>
    //   </div>
    // </section>
  );
};

export default IndustryTrend;
