import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Modal, ModalHeader, Form, ModalBody, Label, Input } from "reactstrap";
import "../../assets/css/ApplicationMain.css";
import "../../assets/css/dropzone.css";
import "../../assets/css/ckeditor.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const ViewIndustryTrend = ({ row, viewIndustryTrendModal, onCloseModal }) => {
  const location = useLocation();
  const [trendTitle, setTrendTitle] = useState("");
  const [trendShortDescription, setTrendShortDescription] = useState("");
  const [trendLongDescription, setTrendLongDescription] = useState("");
  let color = "#405189";

  useEffect(() => {
    if (row) {
      setTrendTitle(row?.trendTitle);
      setTrendShortDescription(row?.trendShortDescription?.replace(/^"(.*)"$/, "$1"));
      setTrendLongDescription(row?.trendLongDescription?.replace(/^"(.*)"$/, "$1"));
    }
  }, [location]);

  return (
    <>
      <Modal
        id="showModal"
        size="lg"
        isOpen={viewIndustryTrendModal}
        toggle={onCloseModal}
        centered
      >
        <ModalHeader className="bg-light p-3" toggle={onCloseModal}>
          <h5 className="modal-title" id="exampleModalLabel">
            View Industry Trend
          </h5>
        </ModalHeader>
        <Form action="#">
          <ModalBody>
            <input type="hidden" id="id-field" />
            <div className="row gy-4 mb-3">
              <div className="col-md-12">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Trend Title <span className="required_span">*</span>
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Enter Topic"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={trendTitle}
                    disabled
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div>
                  <Label htmlFor="amount-field" className="form-label">
                    Trend Short Description{" "}
                    <span className="required_span">*</span>
                  </Label>
                  <div className="input-group" style={{ width: "100%" }}>
                    <div style={{ width: "100%" }}>
                      <CKEditor
                        editor={ClassicEditor}
                        data={trendShortDescription}
                        name="trendShortDescription"
                        onChange={(event, editor) => {
                          const ipdata = editor.getData();
                          setTrendShortDescription(ipdata);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div>
                  <Label htmlFor="amount-field" className="form-label">
                    Trend Long Description{" "}
                    <span className="required_span">*</span>
                  </Label>
                  <div className="input-group" style={{ width: "100%" }}>
                    <div style={{ width: "100%" }}>
                      <CKEditor
                        editor={ClassicEditor}
                        data={trendLongDescription}
                        name="trendLongDescription"
                        onChange={(event, editor) => {
                          const ipdata = editor.getData();
                          setTrendLongDescription(ipdata);
                        }}
                      />
                    </div>
                  </div>
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
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default ViewIndustryTrend;
