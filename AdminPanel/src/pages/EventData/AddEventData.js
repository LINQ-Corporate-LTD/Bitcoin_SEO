import React, { useState, useEffect } from "react";
import BreadCrumb from "../../../src/Components/Common/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import {
  Modal,
  ModalHeader,
  Form,
  ModalBody,
  Label,
  Input,
  Breadcrumb,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Container,
} from "reactstrap";
import "../../assets/css/ApplicationMain.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import "../../assets/css/dropzone.css";
const override = css`
  display: block;
  margin: 0 auto;
  color: black;
  height: 100%;
`;
const AddEventData = () => {
  const navigate = useNavigate();
  const [eventData, setEventData] = useState([]);
  const [eventName, setEventName] = useState("");
  const [eventYear, setEventYear] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [navWhiteLogo, setNavWhiteLogo] = useState("");
  const [navBlackLogo, setNavBlackLogo] = useState("");
  const [videomp4, setVideomp4] = useState("");
  console.log("videomp4: ", videomp4);
  const [videoWebm, setVideoWebm] = useState("");
  console.log("videoWebm: ", videoWebm);
  const [eventDetailBackImage, setEventDetailBackImage] = useState("");
  const [stataticBgPattern, setStataticBgPattern] = useState("");
  const [expertSpeakerBgPattern, setExpertSpeakerBgPattern] = useState("");
  const [purchaseTax, setPurchaseTax] = useState("");
  const [currencyName, setCurrencyName] = useState("");
  const [currencySymbol, setCurrencySymbol] = useState("");
  const [primaryColor, setPrimaryColor] = useState("");
  const [secondaryColor, setSeconaryColor] = useState("");
  const [lightColor, setLightColor] = useState("");
  const [darkColor, setDarkColor] = useState("");
  const [gradientColor, setGradientColor] = useState("");
  const [videoReplaceImage, setVideoReplaceImage] = useState("");
  const [isSeoEnable, setIsSeoEnable] = useState("No");

  const [loading, setloading] = useState(false);
  let color = "#405189";

  useEffect(() => {
    callGetEventDataApi();
    // eslint-disable-next-line
  }, []);

  const callGetEventDataApi = () => {
    setloading(true);

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
          localStorage.clear();
          navigate("/logout");
        }
        if (data && data.status) {
          setEventData(data["homePageSettings"]);
          // setTotalCount(data?.paginationDetails?.count);
        }
        setloading(false);
      })
      .catch((error) => {
        setloading(false);
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
  useEffect(() => {
    if (eventData && Object.keys(eventData).length > 0) {
      if (eventData?.homeVideoSctionEventDetails?.length > 0) {
        setEventName(eventData?.homeVideoSctionEventDetails[0]?.eventName);
        setEventYear(eventData?.homeVideoSctionEventDetails[0]?.eventYear);
        setEventDate(eventData?.homeVideoSctionEventDetails[0]?.eventDate);
        setEventLocation(
          eventData?.homeVideoSctionEventDetails[0]?.eventLocation
        );
        setIsSeoEnable(
          eventData?.homeVideoSctionEventDetails[0]?.isSeoEnable
        );
      }
      if (eventData?.navLogos?.length > 0) {
        setNavWhiteLogo(eventData?.navLogos[0]?.whiteLogo);
        setNavBlackLogo(eventData?.navLogos[0]?.blackLogo);
      }

      if (eventData?.homeVideoSctionSettings?.length > 0) {
        setVideomp4(eventData?.homeVideoSctionSettings[0]?.videoLinkmp4);
        setVideoWebm(eventData?.homeVideoSctionSettings[0]?.videoLinkwebm);
        setEventDetailBackImage(
          eventData?.homeVideoSctionSettings[0]?.eventDetailBackImage
        );
        setStataticBgPattern(
          eventData?.homeVideoSctionSettings[0]?.eventStataticsBackImage
        );
        setExpertSpeakerBgPattern(
          eventData?.homeVideoSctionSettings[0]?.eventExpertSpeakerBackImage
        );
        setVideoReplaceImage(
          eventData?.homeVideoSctionSettings[0]?.videoReplaceImage
        );
      }

      if (eventData?.eventGeneralSettings?.length > 0) {
        setPurchaseTax(eventData?.eventGeneralSettings[0]?.purchaseTaxPercent);
        setCurrencyName(eventData?.eventGeneralSettings[0]?.currencyName);
        setCurrencySymbol(eventData?.eventGeneralSettings[0]?.currencySymbol);
      }

      if (eventData?.themeSetting?.length > 0) {
        setPrimaryColor(eventData?.themeSetting[0]?.primaryColor);
        setSeconaryColor(eventData?.themeSetting[0]?.secondaryColor);
        setLightColor(eventData?.themeSetting[0]?.lightColor);
        setDarkColor(eventData?.themeSetting[0]?.darkColor);
        setGradientColor(eventData?.themeSetting[0]?.gradientColor);
      }
    }

    // eslint-disable-next-line
  }, [eventData]);

  const getUploadParams = async (file, type) => {
    const finalData = new FormData();
    finalData.append("media", file);
    const requestOptions = {
      method: "POST",
      body: finalData,
    };

    try {
      const response = await fetch(
        "https://harsh7541.pythonanywhere.com/admin1/upload",
        requestOptions
      );
      const data = await response.json();

      if (
        data.detail === "The Token is expired" ||
        data.message === "Invalid token"
      ) {
        localStorage.clear();
        history.push("/logout");
        return;
      }

      if (data.uploadedURL) {
        switch (type) {
          case "whiteLogo":
            setNavWhiteLogo(data.uploadedURL);
            break;
          case "blackLogo":
            setNavBlackLogo(data.uploadedURL);
            break;
          case "mp4Video":
            setVideomp4(data.uploadedURL);
            break;
          case "webmVideo":
            setVideoWebm(data.uploadedURL);
            break;
          case "eventDetailBackImage":
            setEventDetailBackImage(data.uploadedURL);
            break;
          case "stataticBgPattern":
            setStataticBgPattern(data.uploadedURL);
            break;
          case "expertSpeakerBgPattern":
            setExpertSpeakerBgPattern(data.uploadedURL);
            break;
          case "videoReplaceImage":
            setVideoReplaceImage(data.uploadedURL);
            break;
          default:
            break;
        }
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("There was an error, Please try again later.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  const handleSubmitWithFormData = (e) => {
    e.preventDefault();
    setloading(true);
    const formDataObj = new FormData();
    formDataObj.append("eventName", eventName);
    formDataObj.append("eventYear", eventYear);
    formDataObj.append("eventDate", eventDate);
    formDataObj.append("eventLocation", eventLocation);
    formDataObj.append("whiteLogoLink", navWhiteLogo);
    formDataObj.append("blackLogoLink", navBlackLogo);
    formDataObj.append("videoLinkmp4", videomp4);
    formDataObj.append("videoLinkwebm", videoWebm);
    formDataObj.append("eventDetailBackImage", eventDetailBackImage);
    formDataObj.append("eventStataticsBackImage", stataticBgPattern);
    formDataObj.append("eventExpertSpeakerBackImage", expertSpeakerBgPattern);
    formDataObj.append("purchaseTaxPercent", purchaseTax);
    formDataObj.append("currencyName", currencyName);
    formDataObj.append("currencySymbol", currencySymbol);
    formDataObj.append("primaryColor", primaryColor);
    formDataObj.append("secondaryColor", secondaryColor);
    formDataObj.append("lightColor", lightColor);
    formDataObj.append("darkColor", darkColor);
    formDataObj.append("gradientColor", gradientColor);
    formDataObj.append("videoReplaceImage", videoReplaceImage);
    formDataObj.append("isSeoEnable", isSeoEnable);


    const requestOptions = {
      method: "POST",
      body: formDataObj,
    };
    fetch("https://harsh7541.pythonanywhere.com/admin1/addeventdata", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          toast.success("Record Added Successfully.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setloading(false);
          navigate("/eventdata");
        } else {
          setloading(false);
          toast.error(data?.message);
        }
      })
      .catch((error) => {
        console.log("error: ", error);
        setloading(false);
        toast.error("There was an error, Please try again later.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  if (loading)
    return (
      <div className="loaderClass" style={{ textAlign: "center" }}>
        <ClipLoader color={color} loading={loading} css={override} size={100} />
      </div>
    );

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Event General Detail" pageTitle="Event General Detail" pageLink="/eventdata" />
        <Row>
          <Col lg={12}>
            <Card>
              <CardBody>
                <Row>
                  <div className="col-md-6 mt-2">
                    <div>
                      <Label htmlFor="sort-order" className="form-label">
                        Event Name{" "}
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Enter Event Name"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={eventName}
                        onChange={(e) => {
                          setEventName(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 mt-2">
                    <div>
                      <Label htmlFor="sort-order" className="form-label">
                        Event Year{" "}
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Enter Event Year"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={eventYear}
                        onChange={(e) => {
                          setEventYear(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-2 mt-2">
                    <div>
                      <Label htmlFor="sort-order" className="form-label">
                        Is SEO Enable?{" "}
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Enter Is SEO Enable"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={isSeoEnable}
                        onChange={(e) => {
                          setIsSeoEnable(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </Row>
                <Row>
                  <div className="col-md-6 mt-2">
                    <div>
                      <Label htmlFor="sort-order" className="form-label">
                        Event Date{" "}
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Enter Event Date"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={eventDate}
                        onChange={(e) => {
                          setEventDate(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mt-2">
                    <div>
                      <Label htmlFor="sort-order" className="form-label">
                        Event Location{" "}
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Enter Event Location"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={eventLocation}
                        onChange={(e) => {
                          setEventLocation(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </Row>
                <Row>
                  <div className="col-md-6 mt-2">
                    <div>
                      <Label htmlFor="sort-order" className="form-label">
                        Nav White Logo{" "}
                      </Label>
                      <Input
                        id="profile-img-file-input"
                        type="file"
                        className="profile-img-file-input"
                        accept="image/png, image/jpg, image/jpeg,"
                        name="photo"
                        onChange={(e) =>
                          getUploadParams(e.target.files[0], "whiteLogo")
                        }
                      />
                    </div>
                    {navWhiteLogo?.length > 0 && (
                      <div className="mt-2">
                        <img
                          src={navWhiteLogo}
                          alt="uploaded-Logo"
                          height={100}
                          width={100}
                        />
                      </div>
                    )}
                  </div>
                  <div className="col-md-6 mt-2">
                    <div>
                      <Label htmlFor="sort-order" className="form-label">
                        Nav Black Logo{" "}
                      </Label>
                      <Input
                        id="profile-img-file-input"
                        type="file"
                        className="profile-img-file-input"
                        accept="image/png, image/jpg, image/jpeg,"
                        name="photo"
                        onChange={(e) =>
                          getUploadParams(e.target.files[0], "blackLogo")
                        }
                      />
                    </div>
                    {navBlackLogo?.length > 0 && (
                      <div className="mt-2">
                        <img
                          src={navBlackLogo}
                          alt="uploaded-Logo"
                          height={100}
                          width={100}
                        />
                      </div>
                    )}
                  </div>
                </Row>
                <Row>
                  <div className="col-md-6 mt-2">
                    <div>
                      <Label htmlFor="sort-order" className="form-label">
                        Video MP4{" "}
                      </Label>
                      <Input
                        id="profile-img-file-input"
                        type="file"
                        className="profile-img-file-input"
                        accept="video/mp4, video/avi, video/mov, video/wmv, video/flv, video/webm, video/mkv"
                        name="video"
                        onChange={(e) =>
                          getUploadParams(e.target.files[0], "mp4Video")
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mt-2">
                    <div>
                      <Label htmlFor="sort-order" className="form-label">
                        Video Webm{" "}
                      </Label>
                      <Input
                        id="profile-img-file-input"
                        type="file"
                        className="profile-img-file-input"
                        accept="video/mp4, video/avi, video/mov, video/wmv, video/flv, video/webm, video/mkv"
                        name="video"
                        onChange={(e) =>
                          getUploadParams(e.target.files[0], "webmVideo")
                        }
                      />
                    </div>
                  </div>
                </Row>
                <Row>
                  <div className="col-md-4 mt-2">
                    <div>
                      <Label htmlFor="sort-order" className="form-label">
                        Event Detail Back Image{" "}
                      </Label>
                      <Input
                        id="profile-img-file-input"
                        type="file"
                        className="profile-img-file-input"
                        accept="image/png, image/jpg, image/jpeg,"
                        name="photo"
                        onChange={(e) =>
                          getUploadParams(
                            e.target.files[0],
                            "eventDetailBackImage"
                          )
                        }
                      />
                    </div>
                    {eventDetailBackImage?.length > 0 && (
                      <div className="mt-2">
                        <img
                          src={eventDetailBackImage}
                          alt="uploaded-Logo"
                          height={100}
                          width={100}
                        />
                      </div>
                    )}
                  </div>
                  <div className="col-md-4 mt-2">
                    <div>
                      <Label htmlFor="sort-order" className="form-label">
                        Statatics Bg Pattern{" "}
                      </Label>
                      <Input
                        id="profile-img-file-input"
                        type="file"
                        className="profile-img-file-input"
                        accept="image/png, image/jpg, image/jpeg,"
                        name="photo"
                        onChange={(e) =>
                          getUploadParams(
                            e.target.files[0],
                            "stataticBgPattern"
                          )
                        }
                      />
                    </div>
                    {stataticBgPattern?.length > 0 && (
                      <div className="mt-2">
                        <img
                          src={stataticBgPattern}
                          alt="uploaded-Logo"
                          height={100}
                          width={100}
                        />
                      </div>
                    )}
                  </div>
                  <div className="col-md-4 mt-2">
                    <div>
                      <Label htmlFor="sort-order" className="form-label">
                        Expert Speaker Bg Pattern{" "}
                      </Label>
                      <Input
                        id="profile-img-file-input"
                        type="file"
                        className="profile-img-file-input"
                        accept="image/png, image/jpg, image/jpeg,"
                        name="photo"
                        onChange={(e) =>
                          getUploadParams(
                            e.target.files[0],
                            "expertSpeakerBgPattern"
                          )
                        }
                      />
                    </div>
                    {expertSpeakerBgPattern?.length > 0 && (
                      <div className="mt-2">
                        <img
                          src={expertSpeakerBgPattern}
                          alt="uploaded-Logo"
                          height={100}
                          width={100}
                        />
                      </div>
                    )}
                  </div>
                </Row>
                <Row>
                  <div className="col-md-4 mt-2">
                    <div>
                      <Label htmlFor="sort-order" className="form-label">
                        Purchase Tax(%){" "}
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Enter Purchase Tax"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={purchaseTax}
                        onChange={(e) => {
                          setPurchaseTax(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 mt-2">
                    <div>
                      <Label htmlFor="sort-order" className="form-label">
                        Currency Name{" "}
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Enter Currency Name"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={currencyName}
                        onChange={(e) => {
                          setCurrencyName(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 mt-2">
                    <div>
                      <Label htmlFor="sort-order" className="form-label">
                        Currency Symbol{" "}
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Enter Currency Symbol"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={currencySymbol}
                        onChange={(e) => {
                          setCurrencySymbol(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </Row>
                <Row>
                  <div className="col-md-3 mt-2">
                    <div>
                      <Label htmlFor="sort-order" className="form-label">
                        Primary Color{" "}
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Enter Primary Color"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={primaryColor}
                        onChange={(e) => {
                          setPrimaryColor(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-3 mt-2">
                    <div>
                      <Label htmlFor="sort-order" className="form-label">
                        Secondary Color{" "}
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Enter Secondary Color"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={secondaryColor}
                        onChange={(e) => {
                          setSeconaryColor(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-3 mt-2">
                    <div>
                      <Label htmlFor="sort-order" className="form-label">
                        Light Color{" "}
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Enter Light Color"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={lightColor}
                        onChange={(e) => {
                          setLightColor(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-3 mt-2">
                    <div>
                      <Label htmlFor="sort-order" className="form-label">
                        Dark Color{" "}
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Enter Dark Color"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={darkColor}
                        onChange={(e) => {
                          setDarkColor(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </Row>
                <Row>
                  <div className="col-md-8 mt-2">
                    <div>
                      <Label htmlFor="sort-order" className="form-label">
                        Gradient Color{" "}
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Enter Gradient Color"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={gradientColor}
                        onChange={(e) => {
                          setGradientColor(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 mt-2">
                    <div>
                      <Label htmlFor="sort-order" className="form-label">
                        Video Replace Image{" "}
                      </Label>
                      <Input
                        id="profile-img-file-input"
                        type="file"
                        className="profile-img-file-input"
                        accept="image/png, image/jpg, image/jpeg,"
                        name="photo"
                        onChange={(e) =>
                          getUploadParams(
                            e.target.files[0],
                            "videoReplaceImage"
                          )
                        }
                      />
                    </div>
                    {videoReplaceImage?.length > 0 && (
                      <div className="mt-2">
                        <img
                          src={videoReplaceImage}
                          alt="uploaded-Logo"
                          height={100}
                          width={100}
                        />
                      </div>
                    )}
                  </div>
                </Row>

                <button
                  type="submit"
                  className="btn btn-success mt-3"
                  id="add-btn"
                  onClick={handleSubmitWithFormData}
                >
                  Submit
                </button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddEventData;
