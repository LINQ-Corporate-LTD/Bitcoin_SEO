import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Modal, ModalHeader, Form, ModalBody, Label, Input } from "reactstrap";
import "../../assets/css/ApplicationMain.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import "../../assets/css/dropzone.css";
import "../../assets/css/ckeditor.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const override = css`
  display: block;
  margin: 0 auto;
  color: black;
  height: 100%;
`;
const EditSlideShareAttandee = ({
    row,
    editSlideShareAttandeeModal,
    onCloseModal,
    onModalSubmitBtnClk,
}) => {
    console.log("row: ", row);
    const navigate = useNavigate();
    const location = useLocation();
    const [slideShareAttandeeName, setSlideShareAttandeeName] = useState("");
    const [slideShareAttandeeNameError, setSlideShareAttandeeNameError] = useState(false);
    const [attandeeComapnyName, setAttandeeComapnyName] = useState("");
    const [attandeeComapnyNameError, setAttandeeComapnyNameError] = useState(false);
    const [projectYear, setProjectyear] = useState("");
    const [visible, setVisible] = useState(false);
    const [loading, setloading] = useState(false);
    let color = "#405189";

    useEffect(() => {
        if (row) {
            setSlideShareAttandeeName(row?.delegateName);
            setAttandeeComapnyName(row?.companyName);
            setProjectyear(row?.projectYear);
        }
    }, [location]);

    const submitBtnClk = (e) => {
        e.preventDefault();
        if (slideShareAttandeeName === "") {
            toast.error("SlideShare Attandee Name is Required", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setSlideShareAttandeeNameError(true);
            setVisible(false);
        } else if (attandeeComapnyName === "") {
            toast.error("Attandee Company Name is Required", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setAttandeeComapnyNameError(true);
            setVisible(false);
        } else {
            setVisible(true);
            const finalData = new FormData();
            finalData.append("id", row?.id);
            finalData.append("delegateName", slideShareAttandeeName);
            finalData.append("companyName", attandeeComapnyName);
            finalData.append("projectYear", projectYear);
            const requestOptions = {
                method: "POST",
                body: finalData,
            };
            fetch(
                "https://harsh7541.pythonanywhere.com/admin1/editslideShareAttandee",
                requestOptions
            )
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
                    if (data.status) {
                        setVisible(true);
                        onModalSubmitBtnClk();
                        toast.success("Record Added Successfully.", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    } else {
                        setloading(false);
                        setVisible(false);
                        toast.error(data?.message);
                    }
                })
                .catch((error) => {
                    console.log("error: ", error);
                    setVisible(false);
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
        }
    };

    if (loading)
        return (
            <div className="loaderClass" style={{ textAlign: "center" }}>
                <ClipLoader color={color} loading={loading} css={override} size={100} />
            </div>
        );

    return (
        <>
            <Modal
                id="showModal"
                size="lg"
                isOpen={editSlideShareAttandeeModal}
                toggle={onCloseModal}
                centered
            >
                <ModalHeader className="bg-light p-3" toggle={onCloseModal}>
                    <h5 className="modal-title" id="exampleModalLabel">
                        Edit SlideShare Attandee
                    </h5>
                </ModalHeader>
                <Form action="#">
                    <ModalBody>
                        <input type="hidden" id="id-field" />
                        <div className="row gy-4 mb-3">
                            <div className="col-md-12">
                                <div>
                                    <Label htmlFor="customername-field" className="form-label">
                                        Attandee Name <span className="required_span">*</span>
                                    </Label>
                                    <Input
                                        type="text"
                                        className={`form-control ${slideShareAttandeeNameError ? "border-danger " : ""
                                            }`}
                                        placeholder="Enter Attandee Name"
                                        aria-label="name"
                                        aria-describedby="basic-addon1"
                                        value={slideShareAttandeeName}
                                        onChange={(e) => {
                                            setSlideShareAttandeeName(e.target.value);
                                            setSlideShareAttandeeNameError(false);
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div>
                                    <Label htmlFor="customername-field" className="form-label">
                                        Company Name <span className="required_span">*</span>
                                    </Label>
                                    <Input
                                        type="text"
                                        className={`form-control ${attandeeComapnyNameError ? "border-danger " : ""
                                            }`}
                                        placeholder="Enter Company Name"
                                        aria-label="name"
                                        aria-describedby="basic-addon1"
                                        value={attandeeComapnyName}
                                        onChange={(e) => {
                                            setAttandeeComapnyName(e.target.value);
                                            setAttandeeComapnyNameError(false);
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div>
                                    <Label htmlFor="customername-field" className="form-label">
                                        Project Year
                                    </Label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Project Year"
                                        aria-label="name"
                                        aria-describedby="basic-addon1"
                                        value={projectYear}
                                        onChange={(e) => {
                                            setProjectyear(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <div className="modal-footer">
                        <div className="hstack gap-2 justify-content-end">
                            <button
                                type="button"
                                className="btn btn-light border"
                                onClick={() => {
                                    onCloseModal();
                                }}
                            >
                                Close
                            </button>
                            <button
                                type="submit"
                                className="btn btn-success"
                                id="add-btn"
                                onClick={(e) => {
                                    submitBtnClk(e);
                                }}
                                disabled={visible}
                            >
                                Edit SlideShare Attandee
                            </button>
                        </div>
                    </div>
                </Form>
            </Modal>
        </>
    );
};
export default EditSlideShareAttandee;
