import React, { useMemo, useCallback, useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  Input,
  Row,
  Container,
  Label,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import TableContainer from "../../Components/Common/TableContainer";
import { Link, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteModal from "../../Components/Common/DeleteModal";
import "../../assets/css/ckeditor.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Tooltip from "@mui/material/Tooltip";
const override = css`
  display: block;
  margin: 0 auto;
  color: black;
  height: 100%;
`;

const EventData = () => {
  const navigate = useNavigate();
  const [eventData, setEventData] = useState(null);
  console.log("eventData: ", eventData);
  const [eventName, setEventName] = useState("");
  const [eventYear, setEventYear] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [navWhiteLogo, setNavWhiteLogo] = useState("");
  console.log("navWhiteLogo: ", navWhiteLogo);
  const [navBlackLogo, setNavBlackLogo] = useState("");
  console.log("navBlackLogo: ", navBlackLogo);
  const [videomp4, setVideomp4] = useState("");
  const [videoWebm, setVideoWebm] = useState("");
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
  const [isSeoEnable, setIsSeoEnable] = useState("");

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
      console.log("eventData: ", eventData);
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

  if (loading)
    return (
      <div className="loaderClass" style={{ textAlign: "center" }}>
        <ClipLoader color={color} loading={loading} css={override} size={100} />
      </div>
    );

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Event General Detail" pageTitle="Event Data" />
        <Row>
          <Col lg={12}>
            <Card>
              <CardBody>
                <button
                  type="submit"
                  className="btn btn-success mt-3"
                  id="add-btn"
                  onClick={() => navigate("/addeventdata")}
                >
                  Edit Event General Detail
                </button>
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
                        disabled
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
                        disabled
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
                        disabled
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
                        disabled
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
                        disabled
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
                        type="text"
                        className="form-control"
                        placeholder="Enter Event Location"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={navWhiteLogo}
                        disabled
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
                        type="text"
                        className="form-control"
                        placeholder="Enter Event Location"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={navBlackLogo}
                        disabled
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
                        type="text"
                        className="form-control"
                        placeholder="Enter Event Location"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={videomp4}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mt-2">
                    <div>
                      <Label htmlFor="sort-order" className="form-label">
                        Video Webm{" "}
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Enter Event Location"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={videoWebm}
                        disabled
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
                        type="text"
                        className="form-control"
                        placeholder="Enter Event Location"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={eventDetailBackImage}
                        disabled
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
                        type="text"
                        className="form-control"
                        placeholder="Enter Event Location"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={stataticBgPattern}
                        disabled
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
                        type="text"
                        className="form-control"
                        placeholder="Enter Event Location"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={expertSpeakerBgPattern}
                        disabled
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
                        disabled
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
                        disabled
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
                        disabled
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
                        disabled
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
                        disabled
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
                        disabled
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
                        disabled
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
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-md-4 mt-2">
                    <div>
                      <Label htmlFor="sort-order" className="form-label">
                        Video Replace Image{" "}
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Enter Video Replace Image"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={videoReplaceImage}
                        disabled
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
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default EventData;
