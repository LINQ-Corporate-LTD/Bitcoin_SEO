import React, { useState, useRef, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import "../assets/css/LatestNews.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const LatestNews = () => {
  const navigate = useNavigate();
  const [newsList, setNewsList] = useState([]);

  const handleClick = (member) => {
    const newsTitle = member.newsTitle
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "") // remove special characters like ':'
      .replace(/\s+/g, "-") // replace spaces with hyphens
      .replace(/-+/g, "-");
    navigate(`/newsdescription/${newsTitle}`, { state: member }); // ✅ Pass member object in route state
  };

  useEffect(() => {
    callNewsListApi();
    // eslint-disable-next-line
  }, []);

  const callNewsListApi = () => {
    const requestOptions = {
      method: "GET",
    };
    fetch(`https://harsh7541.pythonanywhere.com/admin1/generalnews`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.status) {
          setNewsList(data["generalNews"]);
          // setTotalCount(data?.paginationDetails?.count);
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
  let featuredLatestArticle = null;
  let latestNewsItems = [];

  if (newsList?.length > 0) {
    featuredLatestArticle = newsList[0];
    const remainingItems = newsList.slice(1);
    latestNewsItems =
      remainingItems.length > 5 ? remainingItems.slice(0, 4) : remainingItems;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  return (
    <div className="HomeScreen_NewsHomeContainer__+EIaN">
      <div className="NewsSection_wholeContainer__t5qCK">
        <div className="NewsSection_latestNewsContainer__T48Li">
          <h2>Latest News</h2>
          <div className="NewsSection_latestNews__9sDlt">
            <div className="NewsSection_newsList__tnQsK">
              <ul>
                {latestNewsItems?.map((item, index) => (
                  <li>
                    <div className="NewsSection_categoryAndDate__WBz4R">
                      <p onClick={() => handleClick(item)}>
                        {item?.newsCategoryDetails?.newsCategory}
                      </p>
                      <p onClick={() => handleClick(item)}>
                        {formatDate(item?.newsCreatedDate)}
                      </p>
                    </div>
                    <div
                      className="NewsSection_newsTitle__1tiob"
                      onClick={() => handleClick(item)}
                    >
                      {item?.newsTitle}
                    </div>
                  </li>
                ))}
              </ul>
              <button
                className="NewsSection_showAllNews__epl41"
                onClick={() => navigate("/news")}
              >
                Show All News
                <svg
                  className="NewsSection_iconArrow__DM6M5"
                  width="24"
                  height="16"
                  viewBox="0 0 24 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M23.2071 8.70711C23.5976 8.31658 23.5976 7.68342 23.2071 7.29289L16.8431 0.928932C16.4526 0.538408 15.8195 0.538408 15.4289 0.928932C15.0384 1.31946 15.0384 1.95262 15.4289 2.34315L21.0858 8L15.4289 13.6569C15.0384 14.0474 15.0384 14.6805 15.4289 15.0711C15.8195 15.4616 16.4526 15.4616 16.8431 15.0711L23.2071 8.70711ZM0 9H22.5V7H0V9Z"
                    style={{ fill: "  #ffffff" }}
                  ></path>
                </svg>
              </button>
            </div>
            <div
              className="NewsSection_featuredNews__ENl3B"
              style={{ height: "639PX" }}
            >
              <h3 onClick={() => handleClick(featuredLatestArticle)}>
                {featuredLatestArticle?.newsTitle}
              </h3>
              <img
                src={featuredLatestArticle?.newsImage}
                alt={featuredLatestArticle?.newsTitle}
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  objectFit: "cover",
                }}
                onClick={() => handleClick(featuredLatestArticle)}
              />
              <div className="NewsSection_featuredcategoryAndDate__WZuqu">
                <p onClick={() => handleClick(featuredLatestArticle)}>
                  {featuredLatestArticle?.newsCategoryDetails?.newsCategory}
                </p>
                <p onClick={() => handleClick(featuredLatestArticle)}>
                  {formatDate(featuredLatestArticle?.newsCreatedDate)}
                </p>
              </div>
              <p
                lang="en"
                dangerouslySetInnerHTML={{
                  __html: featuredLatestArticle?.newsShortDescription.replace(
                    /^"(.*)"$/,
                    "$1"
                  ),
                }}
                onClick={() => handleClick(featuredLatestArticle)}
              ></p>
            </div>
          </div>
        </div>
      </div>
    </div>

    // <section className="bg-black text-white py-16 px-4">
    //   <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[3fr_4fr] gap-12">
    //     {/* News Section */}
    //     <div className="max-w-3xl">
    //       <h2 className="text-5xl font-bold mb-6">Latest News</h2>
    //       <ul className="divide-y-4 divide-cyan-500 text-sm">
    //         {latestNewsArr.newsTopicsArr.map((item, idx) => (
    //           <li key={item.id} className="py-10">
    //             <p className="text-cyan-500 font-bold uppercase">
    //               {item.category.name}
    //               <span className="float-right text-xs">
    //                 {item.publishdate}
    //               </span>
    //             </p>
    //             <p className="font-semibold text-xl">{item.title}</p>
    //           </li>
    //         ))}
    //       </ul>

    //       <p className="text-white mt-6 font-bold cursor-pointer hover:underline">
    //         Show All News →
    //       </p>
    //     </div>

    //     {/* Feature Article */}
    //     <div>
    //       <h3 className="text-3xl font-bold mb-4 pt-24">
    //         {latestNewsArr.latestNewsSingle.title}
    //       </h3>
    //       <img
    //         src={latestNewsArr.latestNewsSingle.image}
    //         alt={latestNewsArr.latestNewsSingle.title}
    //         className="rounded w-full object-cover mb-2"
    //       />
    //       <div className="flex justify-between">
    //         <p className="text-lg font-semibold text-cyan-500">
    //           {latestNewsArr.latestNewsSingle.category.name}
    //         </p>
    //         <p className="text-lg font-semibold text-cyan-500">
    //           {latestNewsArr.latestNewsSingle.publishdate}
    //         </p>
    //       </div>
    //       <p className="text-sm mt-2">
    //         {latestNewsArr.latestNewsSingle.shortdescription.replace(
    //           /<[^>]*>/g,
    //           ""
    //         )}
    //       </p>
    //     </div>
    //   </div>
    // </section>
  );
};

export default LatestNews;
