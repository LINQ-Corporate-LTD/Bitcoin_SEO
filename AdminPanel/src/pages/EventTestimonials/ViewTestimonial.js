import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Modal, ModalHeader, Form, ModalBody, Label, Input } from "reactstrap";
import "../../assets/css/ApplicationMain.css";
import "../../assets/css/dropzone.css";
const ViewTestimonial = ({ row, viewTestimonialModal, onCloseModal }) => {
  const location = useLocation();
  const [personName, setPersonName] = useState("");
  const [company, setCompany] = useState("");
  const [review, setReview] = useState("");
  let color = "#405189";

  useEffect(() => {
    if (row) {
      setPersonName(row?.personName);
      setCompany(row?.personCompany);
      setReview(row?.personMessage);
    }
  }, [location]);

  return (
    <>
      <Modal
        id="showModal"
        size="md"
        isOpen={viewTestimonialModal}
        toggle={onCloseModal}
        centered
      >
        <ModalHeader className="bg-light p-3" toggle={onCloseModal}>
          <h5 className="modal-title" id="exampleModalLabel">
            View Testimonial
          </h5>
        </ModalHeader>
        <Form action="#">
          <ModalBody>
            <input type="hidden" id="id-field" />
            <div className="row gy-4 mb-3">
              <div className="col-md-12">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Person Name <span className="required_span">*</span>
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Enter Topic"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={personName}
                    disabled
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Company <span className="required_span">*</span>
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Enter Topic"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={company}
                    disabled
                  />
                </div>
              </div>

              <div className="col-md-12">
                <div>
                  <Label htmlFor="amount-field" className="form-label">
                    Review <span className="required_span">*</span>
                  </Label>
                  <div className="input-group" style={{ width: "100%" }}>
                    <div style={{ width: "100%" }}>
                      <textarea
                        className="form-control"
                        placeholder="Enter Review Message"
                        rows="2"
                        autoComplete="off"
                        value={review}
                        disabled
                      ></textarea>
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
export default ViewTestimonial;
