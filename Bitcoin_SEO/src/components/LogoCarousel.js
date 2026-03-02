import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../src/assets/css/logoslider.css";

const leftArrowIcon =
  "https://www.desalination-resource-recovery.com/images/icons/icon-arrow-left.png";
const rightArrowIcon =
  "https://www.desalination-resource-recovery.com/images/icons/icon-arrow-right.png";

const LogoCarousel = () => {
  const sliderRef = useRef(null);
  const [logoList, setLogoList] = useState([]);
  useEffect(() => {
    callLogoListApi();
    // eslint-disable-next-line
  }, []);
  const callLogoListApi = () => {
    const requestOptions = {
      method: "GET",
    };
    fetch(`https://harsh7541.pythonanywhere.com/admin1/homepagecompanieslogo`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.status) {
          setLogoList(data["homePageCompaniesList"]);
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
  const settings = {
    dots: false,
    infinite: true,
    speed: 900,
    slidesToShow: 6,
    slidesToScroll: 1,
    cssEase: "ease-in-out",
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1180,
        settings: { slidesToShow: 5 },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 799,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 599,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 420,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    // <div className="d-flex align-items-center justify-content-between logo-slider-container" style={{backgroundColor: "#ffffff"}}>
    //   <div>
    //     {/* Left Button */}
    //     <button className="border-0" style={{background:'none',fontSize: '3rem',border: 'none',outline: 'none',boxShadow: 'none'}} onClick={() => sliderRef.current.slickPrev()}>&#8592;</button>
    //   </div>

    //   {/* Slider */}
    //   <div style={{ width: "80%" }}>
    //     <Slider ref={sliderRef} {...settings}>
    //       {logos.map((logo, index) => (
    //         <div key={index} className="text-center p-2">
    //           <img
    //             src={logo}
    //             style={{
    //               maxWidth: "80%",
    //               maxHeight: "70px",
    //               objectFit: "contain",
    //             }}
    //           />
    //         </div>
    //       ))}
    //     </Slider>
    //   </div>

    //   <div className="border-0">
    //     {/* Right Button */}
    //     <button className="border-0" style={{background:'none',fontSize: '3rem',border: 'none',outline: 'none',boxShadow: 'none'}} onClick={() => sliderRef.current.slickNext()}>&#8594;</button>
    //   </div>
    // </div>
    <div className="LogoSlider_container__KG1H5">
      <div className="LogoSlider_innerContainer__Z+wZ7 logo-slider">
        {/* Left Button */}
        <button
          aria-label="Move slider to left"
          onClick={() => sliderRef.current.slickPrev()}
        >
          <img
            src={leftArrowIcon}
            alt="left arrow icon"
            loading="lazy"
            width="20"
            height="20"
          />
        </button>

        {/* Slider */}
        <div>
          <Slider ref={sliderRef} {...settings}>
            {logoList?.map((logo, index) => (
              <img
                key={index}
                src={logo?.logoLink}
                alt="Sponsor's Logo"
                loading="lazy"
                width="200"
                height="90"
                style={{
                  width: "100%",
                  display: "inline-block",
                }}
              />
            ))}
          </Slider>
        </div>

        {/* Right Button */}
        <button
          aria-label="Move slider to left"
          onClick={() => sliderRef.current.slickNext()}
        >
          <img
            src={rightArrowIcon}
            alt="right arrow icon"
            loading="lazy"
            width="20"
            height="20"
          />
        </button>
      </div>
    </div>
  );
};

export default LogoCarousel;
