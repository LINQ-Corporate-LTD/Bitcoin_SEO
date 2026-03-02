import React, { useState, useEffect, useRef } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import countryList from "react-select-country-list";
import { useLocation, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { getNames } from "country-list";
import Autocomplete from "@mui/material/Autocomplete";
import { MuiTelInput } from "mui-tel-input";
import Button from "@mui/material/Button";
import "../assets/css/AddSponsorDelegateForm.css";
import { FormControl, FormHelperText } from "@mui/material";
const logo =
  "https://harsh7541.pythonanywhere.com/media/mediabitcoin_logo_white.png";
const plusIcon =
  "https://www.desalination-resource-recovery.com/images/icons/plus.png";
const closeBtn =
  "https://www.desalination-resource-recovery.com/images/icons/del-cross.png";
const countries = getNames();

const AddSponsorDelegateForm = () => {
  const location = useLocation();
  console.log("location: ", location);
  const navigate = useNavigate();
  const phoneInputRef = useRef(null);
  const selectedPackage = location?.state?.selectedPackage;
  console.log("selectedPackage: ", selectedPackage);
  const [delegateCount, setDelegateCount] = useState(1);
  const [delegates, setDelegates] = useState([
    {
      id: 1,
      firstName: "",
      lastName: "",
      position: "",
      email: "",
      mobile: "",
    },
  ]);

  const [companyData, setCompanyData] = useState({
    companyName: "",
    webAddress: "",
    address: "",
    country: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const [companyErrors, setCompanyErrors] = useState({
    companyName: false,
    webAddress: false,
    address: false,
    country: false,
    city: false,
    state: false,
    postalCode: false,
  });

  const [delegateErrors, setDelegateErrors] = useState({});
  const [termsAgreement, setTermsAgreement] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const [validationErrors, setValidationErrors] = useState({});

  const portalId = "4000965";
  const formGuid = "1e2e18e4-1877-4d07-9a22-6c2dbca5c2f8";

  // Get country options from react-select-country-list
  const countryOptions = [
    { value: "", label: "Select a country" },
    ...countryList().getData(),
  ];

  // Handle company data changes
  const handleCompanyDataChange = (field, value) => {
    setCompanyData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear validation error for this field
    if (companyErrors[field]) {
      setCompanyErrors((prev) => ({
        ...prev,
        [field]: false,
      }));
    }
  };

  // Handle delegate data changes
  const handleDelegateChange = (delegateId, field, value) => {
    setDelegates((prev) =>
      prev.map((delegate) =>
        delegate.id === delegateId ? { ...delegate, [field]: value } : delegate
      )
    );

    // Clear validation error for this field
    if (submitAttempted) {
      const errorKey = `delegate_${delegateId}_${field}`;
      if (value.trim() !== "" || (field === "email" && isValidEmail(value))) {
        setDelegateErrors((prev) => ({
          ...prev,
          [errorKey]: false,
        }));
      }
    }
  };

  // Add new delegate (copy of first delegate structure)
  const addDelegate = () => {
    const newDelegateId = delegateCount + 1;
    const newDelegate = {
      id: newDelegateId,
      firstName: "",
      lastName: "",
      position: "",
      email: "",
      mobile: "",
    };

    setDelegates((prev) => [...prev, newDelegate]);
    setDelegateCount(newDelegateId);
  };

  // Remove delegate
  const removeDelegate = (delegateId) => {
    setDelegates((prev) =>
      prev.filter((delegate) => delegate.id !== delegateId)
    );
  };

  // Form validation
  const validateForm = () => {
    const newCompanyErrors = {};
    const newDelegateErrors = {};
    let isValid = true;

    // Validate company data
    const requiredCompanyFields = [
      "companyName",
      "address",
      "country",
      "city",
      "postalCode",
    ];
    requiredCompanyFields.forEach((field) => {
      if (!companyData[field] || !companyData[field].trim()) {
        newCompanyErrors[field] = true;
        isValid = false;
      } else {
        newCompanyErrors[field] = false;
      }
    });

    // Validate delegates
    delegates.forEach((delegate) => {
      const requiredDelegateFields = [
        "firstName",
        "lastName",
        "position",
        "email",
        "mobile",
      ];

      requiredDelegateFields.forEach((field) => {
        const errorKey = `delegate_${delegate.id}_${field}`;
        if (!delegate[field] || !delegate[field].trim()) {
          newDelegateErrors[errorKey] = true;
          isValid = false;
        } else if (field === "email" && !isValidEmail(delegate[field])) {
          newDelegateErrors[errorKey] = true;
          isValid = false;
        } else {
          newDelegateErrors[errorKey] = false;
        }
      });
    });

    // Validate terms agreement
    if (!termsAgreement) {
      setTermsError(true);
      isValid = false;
    } else {
      setTermsError(false);
    }

    setCompanyErrors(newCompanyErrors);
    setDelegateErrors(newDelegateErrors);

    return isValid;
  };

  // Email validation helper
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitAttempted(true);

    if (validateForm()) {
      const formData = {
        company: companyData,
        delegates: delegates,
        termsAgreement: termsAgreement,
      };
      console.log("formData: ", formData);

      const invoiceNumber = `WDRM25TBC-${Math.floor(
        1000 + Math.random() * 9000
      )}`;

      // Static values
      const disposition = "Confirmed";
      const emailStatus = "Confirmed Old";

      // Function to submit to HubSpot (no delay)
      async function submitCompanyDelegatesToHubSpot(formData) {
        const submissions = formData.delegates.map(async (delegate) => {
          const payload = {
            fields: [
              { name: "company", value: formData.company.companyName },
              { name: "state", value: formData.company.state },
              { name: "address", value: formData.company.address },
              { name: "country", value: formData.company.country },
              { name: "city", value: formData.company.city },
              { name: "zip", value: formData.company.postalCode },
              { name: "website", value: formData.company.webAddress },
              { name: "lastname", value: delegate.lastName },
              { name: "firstname", value: delegate.firstName },
              { name: "booking_form_phone_number", value: delegate.mobile },
              { name: "jobtitle", value: delegate.position },
              { name: "email", value: delegate.email },
              { name: "invoice_number", value: invoiceNumber },
              { name: "disposition_wdrm_2025", value: disposition },
              { name: "email_status_wdrm_2025", value: emailStatus },
            ],
            context: {
              pageUri: window.location.href,
              pageName: document.title,
            },
          };

          try {
            const response = await fetch(
              `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
              }
            );
            const result = await response.json();
            console.log(
              `✅ Submitted ${delegate.firstName} ${delegate.lastName}:`,
              result
            );
          } catch (error) {
            console.error(`❌ Error submitting ${delegate.firstName}:`, error);
          }
        });

        // Run all submissions simultaneously
        await Promise.all(submissions);

        console.log(`🎟️ Company: ${formData.company.companyName}`);
        console.log(`🧾 Invoice Number: ${invoiceNumber}`);
      }

      // Run the submission
      submitCompanyDelegatesToHubSpot(formData);

      // Navigate to booking-form and pass the data via state
      navigate("/sponsor-booking", {
        state: {
          selectedPackage: selectedPackage,
          companyData: companyData,
          delegates: delegates,
          termsAgreement: termsAgreement,
          uniqueInvoiceNo: invoiceNumber,
        },
      });
    }
  };

  // Helper function to get delegate field error
  const getDelegateFieldError = (delegateId, field) => {
    const errorKey = `delegate_${delegateId}_${field}`;
    return submitAttempted && delegateErrors[errorKey];
  };

  // Helper function to get delegate field error message
  const getDelegateFieldErrorMessage = (delegateId, field) => {
    const hasError = getDelegateFieldError(delegateId, field);
    if (!hasError) return "";

    switch (field) {
      case "firstName":
        return "First name is required";
      case "lastName":
        return "Last name is required";
      case "position":
        return "Position is required";
      case "email":
        const delegate = delegates.find((d) => d.id === delegateId);
        if (!delegate?.email || !delegate.email.trim()) {
          return "Email address is required";
        } else if (!isValidEmail(delegate.email)) {
          return "Please enter a valid email address";
        }
        return "";
      case "mobile":
        return "Mobile number is required";
      default:
        return "";
    }
  };

  return (
    <div id="root">
      <div className="PageForm_container__NA5Wr">
        <div className="PageForm_header__7W2Cz">
          <div
            className="PageForm_headerInner__sdlhn"
            style={{ maxWidth: "1070px" }}
          >
            <img onClick={() => navigate("/")} src={logo} alt="site logo"></img>
          </div>
        </div>
        <div className="SponsorFormV2_container__d5aHK">
          <div>
            <div className="SponsorFormV2_companyDetails__0Q7OJ">
              <form
                action="#"
                className="WDRM_2025_sponsor_form form_WDRM"
                data-hs-cf-bound="true"
                onSubmit={handleSubmit}
              >
                <div className="SponsorFormV2_companyForm__5tp+y">
                  <div className="SponsorFormV2_bar__B7FvC">
                    <h2>Company details</h2>
                  </div>
                  <div className="SponsorFormV2_companyFormInner__yCIzq">
                    <div className="SponsorFormV2_formRow__FjlEf">
                      <TextField
                        label="Company name"
                        type="companyName"
                        variant="standard"
                        className="SponsorFormV2_bottomMargin__IOIQ4"
                        sx={{
                          "&.MuiFormControl-root": {
                            margin: "0px 25px 0px 0px",
                          },
                          "& .MuiInputLabel-root": {
                            fontSize: "18px",
                            fontWeight: 600,
                            color: "#5e5e5e !important",
                          },
                          "& .MuiInput-underline:after": {
                            borderBottomColor: "#9d9d9d",
                          },
                        }}
                        id="companyName"
                        value={companyData.companyName}
                        onChange={(e) =>
                          handleCompanyDataChange("companyName", e.target.value)
                        }
                        fullWidth
                        error={submitAttempted && companyErrors.companyName}
                        helperText={
                          submitAttempted && companyErrors.companyName
                            ? "Company name is required"
                            : ""
                        }
                        slotProps={{
                          formHelperText: {
                            sx: {
                              fontSize: "14px",
                              marginLeft: 0,
                              marginTop: "3px",
                              color: "#d32f2f !important", // Red color for error text
                            },
                          },
                        }}
                      />

                      <br></br>
                      <TextField
                        label="Web address"
                        type="webAddress"
                        variant="standard"
                        sx={{
                          "& .MuiInputLabel-root": {
                            fontSize: "18px",
                            fontWeight: 600,
                            color: "#5e5e5e !important",
                          },
                          "& .MuiInput-underline:after": {
                            borderBottomColor: "#9d9d9d",
                          },
                        }}
                        id="webAddress"
                        value={companyData.webAddress}
                        onChange={(e) =>
                          handleCompanyDataChange("webAddress", e.target.value)
                        }
                        fullWidth
                      />
                    </div>
                    <div className="SponsorFormV2_formRow__FjlEf">
                      <TextField
                        label="Address"
                        type="address"
                        variant="standard"
                        className="SponsorFormV2_bottomMargin__IOIQ4"
                        sx={{
                          "&.MuiFormControl-root": {
                            margin: "0px 25px 0px 0px",
                          },
                          "& .MuiInputLabel-root": {
                            fontSize: "18px",
                            fontWeight: 600,
                            color: "#5e5e5e !important",
                          },
                          "& .MuiInput-underline:after": {
                            borderBottomColor: "#9d9d9d",
                          },
                        }}
                        id="address"
                        value={companyData.address}
                        onChange={(e) =>
                          handleCompanyDataChange("address", e.target.value)
                        }
                        fullWidth
                        error={submitAttempted && companyErrors.address}
                        helperText={
                          submitAttempted && companyErrors.address
                            ? "Address is required"
                            : ""
                        }
                        slotProps={{
                          formHelperText: {
                            sx: {
                              fontSize: "14px",
                              marginLeft: 0,
                              marginTop: "3px",
                              color: "#d32f2f !important", // Red color for error text
                            },
                          },
                        }}
                      />
                      <br></br>
                      {/* <Autocomplete
                        options={countries}
                        getOptionLabel={(option) => option || ""} // For array of strings
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Choose a country"
                            variant="standard"
                            sx={{
                              "& .MuiInputLabel-root": {
                                fontSize: "18px",
                                fontWeight: 600,
                                color: "#5e5e5e !important",
                              },
                              "& .MuiInput-underline:after": {
                                borderBottomColor: "#9d9d9d",
                              },
                            }}
                          />
                        )}
                        error={submitAttempted && companyErrors.country}
                        helperText={
                          submitAttempted && companyErrors.country
                            ? "Country is required"
                            : ""
                        }
                        slotProps={{
                          formHelperText: {
                            sx: {
                              fontSize: "14px",
                              marginLeft: 0,
                              marginTop: "3px",
                              color: "#d32f2f !important", // Red color for error text
                            },
                          },
                        }}
                        id="country"
                        value={companyData.country}
                        onChange={(event, newValue) => {
                          console.log("country: ", newValue);
                          handleCompanyDataChange("country", newValue); // newValue will be the selected string
                        }}
                        fullWidth
                      /> */}
                      {/* <Autocomplete
                        options={countries}
                        getOptionLabel={(option) => option || ""}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Choose a country"
                            variant="standard"
                            sx={{
                              "& .MuiInputLabel-root": {
                                fontSize: "18px",
                                fontWeight: 600,
                                color: "#5e5e5e !important",
                              },
                              "& .MuiInput-underline:after": {
                                borderBottomColor: "#9d9d9d",
                              },
                              "& .MuiInput-underline:before": {
                                borderBottomColor:
                                  submitAttempted && companyErrors.country
                                    ? "#d32f2f !important"
                                    : "#9d9d9d",
                              },
                              "& .MuiInputBase-input": {
                                color:
                                  submitAttempted && companyErrors.country
                                    ? "#d32f2f"
                                    : "inherit",
                              },
                            }}
                          />
                        )}
                        id="country"
                        value={companyData.country}
                        onChange={(event, newValue) => {
                          handleCompanyDataChange("country", newValue);
                        }}
                        fullWidth
                      />
                      {submitAttempted && companyErrors.country && (
                        <div
                          style={{
                            fontSize: "14px",
                            marginLeft: 0,
                            marginTop: "3px",
                            color: "#d32f2f",
                          }}
                        >
                          Country is required
                        </div>
                      )} */}
                      <FormControl
                        fullWidth
                        error={submitAttempted && companyErrors.country}
                        variant="standard"
                      >
                        <Autocomplete
                          options={countries}
                          getOptionLabel={(option) => option || ""}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Choose a country"
                              variant="standard"
                              error={submitAttempted && companyErrors.country}
                              sx={{
                                "& .MuiInputLabel-root": {
                                  fontSize: "18px",
                                  fontWeight: 600,
                                  color: "#5e5e5e !important",
                                },
                                "& .MuiInput-underline:after": {
                                  borderBottomColor: "#9d9d9d",
                                },
                                "& .MuiInput-underline:before": {
                                  borderBottomColor:
                                    submitAttempted && companyErrors.country
                                      ? "#d32f2f !important"
                                      : "#9d9d9d",
                                },
                                "& .MuiInputBase-input": {
                                  color:
                                    submitAttempted && companyErrors.country
                                      ? "#d32f2f"
                                      : "inherit",
                                },
                              }}
                            />
                          )}
                          id="country"
                          value={companyData.country}
                          onChange={(event, newValue) => {
                            handleCompanyDataChange("country", newValue);
                          }}
                        />
                        {submitAttempted && companyErrors.country && (
                          <FormHelperText
                            sx={{
                              fontSize: "14px",
                              marginLeft: 0,
                              marginTop: "3px",
                              color: "#d32f2f !important",
                            }}
                          >
                            Country is required
                          </FormHelperText>
                        )}
                      </FormControl>
                    </div>
                    <div className="SponsorFormV2_formRow__FjlEf">
                      <div className="SponsorFormV2_formColumn__iF-+D">
                        <TextField
                          label="City"
                          type="city"
                          variant="standard"
                          sx={{
                            "&.MuiFormControl-root": {
                              margin: "0px 25px 0px 0px",
                            },
                            "& .MuiInputLabel-root": {
                              fontSize: "18px",
                              fontWeight: 600,
                              color: "#5e5e5e !important",
                            },
                            "& .MuiInput-underline:after": {
                              borderBottomColor: "#9d9d9d",
                            },
                          }}
                          id="city"
                          value={companyData.city}
                          onChange={(e) =>
                            handleCompanyDataChange("city", e.target.value)
                          }
                          fullWidth
                          error={submitAttempted && companyErrors.city}
                          helperText={
                            submitAttempted && companyErrors.city
                              ? "City is required"
                              : ""
                          }
                          slotProps={{
                            formHelperText: {
                              sx: {
                                fontSize: "14px",
                                marginLeft: 0,
                                marginTop: "3px",
                                color: "#d32f2f !important", // Red color for error text
                              },
                            },
                          }}
                        />
                        <TextField
                          label={
                            <>
                              <span style={{ color: "#5e5e5e" }}>
                                State
                                <span
                                  style={{
                                    fontSize: "10px",
                                    fontWeight: 500,
                                    color: "#5e5e5e !important",
                                  }}
                                >
                                  (Optional)
                                </span>
                              </span>
                            </>
                          }
                          variant="standard"
                          sx={{
                            "& .MuiInputLabel-root": {
                              fontSize: "18px",
                              fontWeight: 600,
                              color: "#5e5e5e !important",
                            },
                            "& .MuiInput-underline:after": {
                              borderBottomColor: "#9d9d9d",
                            },
                          }}
                          id="state"
                          value={companyData.state}
                          onChange={(e) =>
                            handleCompanyDataChange("state", e.target.value)
                          }
                          fullWidth
                        />
                      </div>
                      <TextField
                        label="Postal/Zip code"
                        type="postal/zip code"
                        variant="standard"
                        className="SponsorFormV2_bottomMargin__IOIQ4"
                        sx={{
                          "& .MuiInputLabel-root": {
                            fontSize: "18px",
                            fontWeight: 600,
                            color: "#5e5e5e !important",
                          },
                          "& .MuiInput-underline:after": {
                            borderBottomColor: "#9d9d9d",
                          },
                        }}
                        id="postalCode"
                        value={companyData.postalCode}
                        onChange={(e) =>
                          handleCompanyDataChange("postalCode", e.target.value)
                        }
                        fullWidth
                        error={submitAttempted && companyErrors.postalCode}
                        helperText={
                          submitAttempted && companyErrors.postalCode
                            ? "Postal code is required"
                            : ""
                        }
                        slotProps={{
                          formHelperText: {
                            sx: {
                              fontSize: "14px",
                              marginLeft: 0,
                              marginTop: "3px",
                              color: "#d32f2f !important", // Red color for error text
                            },
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  {delegates.map((delegate, index) => (
                    <div
                      key={delegate.id}
                      className="SponsorFormV2_delegateForm__SqzqY"
                    >
                      <div className="SponsorFormV2_bar__B7FvC">
                        <h2>Delegate {index + 1}</h2>
                        {index > 0 && (
                          <div className="SponsorFormV2_delbtnContainer__+Ju4Q">
                            <Button
                              className="SponsorFormV2_delBtn__tsq7H"
                              onClick={() => removeDelegate(delegate.id)}
                            >
                              <img src={closeBtn} alt="closeBtn"></img>
                            </Button>
                          </div>
                        )}
                      </div>
                      <div className="SponsorFormV2_delegateFormInner__OBITg">
                        <div>
                          <div>
                            <div className="SponsorFormV2_formRow__FjlEf">
                              <div className="SponsorFormV2_formColumn__iF-+D">
                                <TextField
                                  label="First name"
                                  type="firstName"
                                  variant="standard"
                                  sx={{
                                    "&.MuiFormControl-root": {
                                      margin: "0px 25px 0px 0px",
                                    },
                                    "& .MuiInputLabel-root": {
                                      fontSize: "18px",
                                      fontWeight: 600,
                                      color: "#5e5e5e !important",
                                    },
                                    "& .MuiInput-underline:after": {
                                      borderBottomColor: "#9d9d9d",
                                    },
                                  }}
                                  value={delegate.firstName}
                                  onChange={(e) =>
                                    handleDelegateChange(
                                      delegate.id,
                                      "firstName",
                                      e.target.value
                                    )
                                  }
                                  fullWidth
                                  error={getDelegateFieldError(
                                    delegate.id,
                                    "firstName"
                                  )}
                                  helperText={getDelegateFieldErrorMessage(
                                    delegate.id,
                                    "firstName"
                                  )}
                                  slotProps={{
                                    formHelperText: {
                                      sx: {
                                        fontSize: "14px",
                                        marginLeft: 0,
                                        marginTop: "3px",
                                        color: "#d32f2f !important",
                                      },
                                    },
                                  }}
                                />
                                <TextField
                                  label="Last name"
                                  type="lastName"
                                  variant="standard"
                                  sx={{
                                    "& .MuiInputLabel-root": {
                                      fontSize: "18px",
                                      fontWeight: 600,
                                      color: "#5e5e5e !important",
                                    },
                                    "& .MuiInput-underline:before": {
                                      borderBottomColor: "#9d9d9d",
                                    },
                                    "& .MuiInput-underline:after": {
                                      borderBottomColor: "#9d9d9d",
                                    },
                                  }}
                                  value={delegate.lastName}
                                  onChange={(e) =>
                                    handleDelegateChange(
                                      delegate.id,
                                      "lastName",
                                      e.target.value
                                    )
                                  }
                                  fullWidth
                                  error={getDelegateFieldError(
                                    delegate.id,
                                    "lastName"
                                  )}
                                  helperText={getDelegateFieldErrorMessage(
                                    delegate.id,
                                    "lastName"
                                  )}
                                  slotProps={{
                                    formHelperText: {
                                      sx: {
                                        fontSize: "14px",
                                        marginLeft: 0,
                                        marginTop: "3px",
                                        color: "#d32f2f !important",
                                      },
                                    },
                                  }}
                                />
                              </div>
                              <div className="SponsorFormV2_inputRow__S3+0n">
                                <MuiTelInput
                                  ref={phoneInputRef}
                                  variant="standard"
                                  label="Mobile"
                                  defaultCountry="US"
                                  sx={{
                                    "& .MuiButtonBase-root": {
                                      outline: "none",
                                      position: "relative",
                                      paddingRight: "16px",
                                    },
                                    "& .MuiButtonBase-root::after": {
                                      content: '""',
                                      position: "absolute",
                                      right: "1px",
                                      top: "50%",
                                      transform: "translateY(-50%)",
                                      borderLeft: "4px solid transparent",
                                      borderRight: "4px solid transparent",
                                      borderTop: "5px solid #5e5e5e",
                                      pointerEvents: "none",
                                    },
                                    "& .MuiInputLabel-root": {
                                      fontSize: "18px",
                                      fontWeight: 600,
                                      color: "#5e5e5e !important",
                                    },
                                    "& .MuiInput-underline:before": {
                                      borderBottomColor: "#9d9d9d",
                                    },
                                    "& .MuiInput-underline:after": {
                                      borderBottomColor: "#9d9d9d",
                                    },
                                  }}
                                  value={delegate.mobile}
                                  onChange={(value, info) => {
                                    const minValue = "+1";
                                    if (
                                      !value ||
                                      value.length < minValue.length
                                    ) {
                                      handleDelegateChange(
                                        delegate.id,
                                        "mobile",
                                        minValue
                                      );
                                      return;
                                    }

                                    const nationalNumber =
                                      info?.nationalNumber || "";
                                    const digitsOnly = nationalNumber.replace(
                                      /\D/g,
                                      ""
                                    );
                                    if (digitsOnly.length <= 10) {
                                      handleDelegateChange(
                                        delegate.id,
                                        "mobile",
                                        value
                                      );
                                    }
                                  }}
                                  onFocus={(event) => {
                                    setTimeout(() => {
                                      const input = event.target;
                                      if (input.selectionStart < 3) {
                                        input.setSelectionRange(3, 3);
                                      }
                                    }, 0);
                                  }}
                                  inputProps={{
                                    onKeyDown: (event) => {
                                      const input = event.target;
                                      const cursorPosition =
                                        input.selectionStart;

                                      if (
                                        (event.key === "Backspace" ||
                                          event.key === "Delete") &&
                                        cursorPosition <= 3
                                      ) {
                                        event.preventDefault();
                                      }

                                      if (
                                        ["ArrowLeft", "Home"].includes(
                                          event.key
                                        ) &&
                                        cursorPosition <= 3
                                      ) {
                                        event.preventDefault();
                                        input.setSelectionRange(3, 3);
                                      }
                                    },
                                  }}
                                  fullWidth
                                  error={getDelegateFieldError(
                                    delegate.id,
                                    "mobile"
                                  )}
                                  helperText={getDelegateFieldErrorMessage(
                                    delegate.id,
                                    "mobile"
                                  )}
                                  slotProps={{
                                    formHelperText: {
                                      sx: {
                                        fontSize: "14px",
                                        marginLeft: 0,
                                        marginTop: "3px",
                                        color: "#d32f2f !important",
                                      },
                                    },
                                  }}
                                />
                              </div>
                            </div>
                            <div className="SponsorFormV2_formRow__FjlEf">
                              <TextField
                                label="Position"
                                type="position"
                                variant="standard"
                                className="SponsorFormV2_bottomMargin__IOIQ4"
                                sx={{
                                  "&.MuiFormControl-root": {
                                    margin: "0px 25px 0px 0px",
                                  },
                                  "& .MuiInputLabel-root": {
                                    fontSize: "18px",
                                    fontWeight: 600,
                                    color: "#5e5e5e !important",
                                  },
                                  "& .MuiInput-underline:after": {
                                    borderBottomColor: "#9d9d9d",
                                  },
                                }}
                                value={delegate.position}
                                onChange={(e) =>
                                  handleDelegateChange(
                                    delegate.id,
                                    "position",
                                    e.target.value
                                  )
                                }
                                fullWidth
                                error={getDelegateFieldError(
                                  delegate.id,
                                  "position"
                                )}
                                helperText={getDelegateFieldErrorMessage(
                                  delegate.id,
                                  "position"
                                )}
                                slotProps={{
                                  formHelperText: {
                                    sx: {
                                      fontSize: "14px",
                                      marginLeft: 0,
                                      marginTop: "3px",
                                      color: "#d32f2f !important",
                                    },
                                  },
                                }}
                              />
                              <br></br>
                              <TextField
                                label="Email address"
                                type="emailAddress"
                                variant="standard"
                                sx={{
                                  "& .MuiInputLabel-root": {
                                    fontSize: "18px",
                                    fontWeight: 600,
                                    color: "#5e5e5e !important",
                                  },
                                  "& .MuiInput-underline:after": {
                                    borderBottomColor: "#9d9d9d",
                                  },
                                }}
                                value={delegate.email}
                                onChange={(e) =>
                                  handleDelegateChange(
                                    delegate.id,
                                    "email",
                                    e.target.value
                                  )
                                }
                                fullWidth
                                error={getDelegateFieldError(
                                  delegate.id,
                                  "email"
                                )}
                                helperText={getDelegateFieldErrorMessage(
                                  delegate.id,
                                  "email"
                                )}
                                slotProps={{
                                  formHelperText: {
                                    sx: {
                                      fontSize: "14px",
                                      marginLeft: 0,
                                      marginTop: "3px",
                                      color: "#d32f2f !important",
                                    },
                                  },
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="SponsorFormV2_addbtnContainer__IVtkM">
                  <Button
                    variant="contained"
                    className="SponsorFormV2_delBtn__tsq7H"
                    onClick={addDelegate}
                  >
                    <img src={plusIcon} alt="plusIcon"></img>
                    Add Delegate
                  </Button>
                </div>
                <div className="SponsorFormV2_submitContainer__byUkC">
                  <div>
                    <input
                      type="checkbox"
                      checked={termsAgreement}
                      onChange={(e) => {
                        setTermsAgreement(e.target.checked);
                        if (submitAttempted && e.target.checked) {
                          setTermsError(false);
                        }
                      }}
                    ></input>
                    <label
                      style={{
                        color: submitAttempted && termsError ? "#b00020" : "",
                      }}
                    >
                      Please tick to confirm your agreement to the&nbsp;
                      <a
                        href="/terms-and-conditions"
                        style={{
                          color: submitAttempted && termsError ? "#b00020" : "",
                          borderColor:
                            submitAttempted && termsError ? "#b00020" : "",
                        }}
                      >
                        terms and conditions
                      </a>
                      {/* {submitAttempted && termsError && (
                        <span
                          style={{
                            display: "block",
                            fontSize: "14px",
                            color: "#d32f2f",
                            marginTop: "3px",
                          }}
                        >
                          You must agree to the terms and conditions
                        </span>
                      )} */}
                    </label>
                  </div>
                  <input
                    type="submit"
                    className="SponsorFormV2_submitBtn__96h2O"
                    value="Submit"
                    // onClick={() => navigate("/booking-form")}
                  ></input>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="PageForm_footer__hOO1l">
          <div
            className="PageForm_footerInner__5Enax"
            style={{ maxWidth: "1070px" }}
          >
            <p>
              <span onClick={() => navigate("/privacy-policy")}>
                Privacy Policy
              </span>
              <span className="PageForm_divide__vwhn0">|</span>
              ABCD Company
            </p>
            <p>©2026 Bitcoin Innovation & Market 
Evolution 2026</p>
          </div>
        </div>
      </div>
    </div>
    // <div className="bg-gray-50 min-h-screen">
    //   <style jsx>{`
    //     .form-section-header {
    //       background-color: #e5e7eb;
    //       color: #374151;
    //       font-weight: 600;
    //       padding: 12px 20px;
    //       margin-bottom: 0;
    //       border-radius: 8px 8px 0 0;
    //     }

    //     .form-section-content {
    //       background-color: white;
    //       padding: 30px 20px;
    //       border-radius: 0 0 8px 8px;
    //       border: 1px solid #e5e7eb;
    //       border-top: none;
    //     }

    //     /* Common styles for input containers to ensure consistent height */
    //     .input-container {
    //       position: relative;
    //       padding-top: 20px; /* Space for the floating/static label */
    //       margin-bottom: 20px; /* Space between input groups */
    //     }

    //     /* Floating Label Input Styles */
    //     .floating-label {
    //       position: absolute;
    //       left: 0;
    //       top: 20px; /* Initial position: aligned with input text */
    //       color: #6b7280;
    //       font-weight: 500;
    //       transition: all 0.3s ease;
    //       pointer-events: none;
    //       z-index: 1;
    //     }

    //     .floating-input,
    //     .floating-select {
    //       border: none;
    //       border-bottom: 2px solid #d1d5db;
    //       border-radius: 0;
    //       padding: 8px 0; /* Padding for text */
    //       background: transparent;
    //       transition: border-color 0.3s ease;
    //       width: 100%;
    //       outline: none;
    //       font-size: 16px;
    //     }

    //     .floating-input:focus {
    //       border-bottom-color: #3b82f6;
    //       box-shadow: none;
    //       background: transparent;
    //     }

    //     .floating-input:focus + .floating-label,
    //     .floating-input:not(:placeholder-shown) + .floating-label,
    //     .floating-input.has-value + .floating-label {
    //       top: 0px; /* Move to top */
    //       font-size: 12px;
    //       color: #3b82f6;
    //     }

    //     /* Country Select without floating label */
    //     .country-select-group {
    //       position: relative; /* Needed for consistent padding-top */
    //       padding-top: 20px; /* Align with other inputs */
    //       margin-bottom: 20px;
    //     }

    //     .floating-select {
    //       border: none;
    //       border-bottom: 2px solid #d1d5db;
    //       border-radius: 0;
    //       padding: 8px 0;
    //       background: transparent;
    //       transition: border-color 0.3s ease;
    //       width: 100%;
    //       outline: none;
    //       font-size: 16px;
    //       appearance: none;
    //       background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
    //       background-position: right 0 center;
    //       background-repeat: no-repeat;
    //       background-size: 16px 12px;
    //       padding-right: 20px;
    //     }

    //     .floating-select:focus {
    //       border-bottom-color: #3b82f6;
    //       box-shadow: none;
    //       background: transparent;
    //     }

    //     .floating-input.is-invalid,
    //     .floating-select.is-invalid {
    //       border-bottom-color: #dc3545 !important;
    //     }

    //     .floating-input.is-invalid + .floating-label {
    //       color: #dc3545 !important;
    //     }

    //     .btn-add-delegate {
    //       background-color: #1f2937;
    //       color: white;
    //       border: none;
    //       padding: 10px 20px;
    //       border-radius: 6px;
    //       font-weight: 500;
    //       transition: background-color 0.3s ease;
    //       cursor: pointer;
    //     }

    //     .btn-add-delegate:hover {
    //       background-color: #111827;
    //     }

    //     .btn-submit {
    //       background-color: #1f2937;
    //       color: white;
    //       border: none;
    //       padding: 12px 30px;
    //       border-radius: 6px;
    //       font-weight: 500;
    //       min-width: 120px;
    //       cursor: pointer;
    //     }

    //     .btn-submit:hover {
    //       background-color: #111827;
    //     }

    //     .delegate-section {
    //       margin-bottom: 20px;
    //     }

    //     .remove-delegate-btn {
    //       background-color: #dc3545;
    //       color: white;
    //       border: none;
    //       padding: 8px 12px;
    //       border-radius: 4px;
    //       font-size: 14px;
    //       cursor: pointer;
    //       transition: background-color 0.3s ease;
    //     }

    //     .remove-delegate-btn:hover {
    //       background-color: #c82333;
    //     }

    //     .delegate-header {
    //       display: flex;
    //       align-items: center;
    //       background-color: #e5e7eb;
    //       border-radius: 8px 8px 0 0;
    //     }

    //     .delegate-title {
    //       flex: 1;
    //       color: #374151;
    //       font-weight: 600;
    //       padding: 12px 20px;
    //       margin: 0;
    //     }

    //     .terms-link {
    //       color: #3b82f6;
    //       text-decoration: underline;
    //     }

    //     .terms-link:hover {
    //       color: #2563eb;
    //     }

    //     .form-check-input {
    //       margin-right: 8px;
    //     }

    //     /* Mobile input with static label at top and consistent height */
    //     .mobile-input-group {
    //       position: relative;
    //       padding-top: 20px; /* Space for the static label */
    //       margin-bottom: 20px; /* Space between input groups */
    //     }

    //     .mobile-static-label {
    //       position: absolute;
    //       left: 0;
    //       top: 0px; /* Always at top */
    //       color: #6b7280;
    //       font-weight: 500;
    //       font-size: 12px; /* Smaller font size */
    //       z-index: 1;
    //     }

    //     .mobile-static-label.error {
    //       color: #dc3545;
    //     }

    //     .PhoneInput {
    //       display: flex;
    //       align-items: flex-end; /* Align content to the bottom */
    //       width: 100%;
    //     }

    //     .PhoneInputInput {
    //       border: none;
    //       border-bottom: 2px solid #d1d5db;
    //       border-radius: 0;
    //       padding: 8px 0; /* Consistent padding */
    //       background: transparent;
    //       transition: border-color 0.3s ease;
    //       width: 100%;
    //       outline: none;
    //       font-size: 16px;
    //       font-family: inherit;
    //     }

    //     .PhoneInputInput:focus {
    //       border-bottom-color: #3b82f6;
    //       box-shadow: none;
    //       background: transparent;
    //     }

    //     .PhoneInputInput.is-invalid {
    //       border-bottom-color: #dc3545 !important;
    //     }

    //     .PhoneInputCountrySelect {
    //       border: none;
    //       border-bottom: 2px solid #d1d5db;
    //       border-radius: 0;
    //       padding: 8px 0; /* Consistent padding */
    //       background: transparent;
    //       transition: border-color 0.3s ease;
    //       margin-right: 10px;
    //       outline: none;
    //       font-size: 16px;
    //       font-family: inherit;
    //     }

    //     .PhoneInputCountrySelect:focus {
    //       border-bottom-color: #3b82f6;
    //       box-shadow: none;
    //       background: transparent;
    //     }

    //     .PhoneInputCountryIcon {
    //       margin-right: 5px;
    //     }

    //     .PhoneInputCountrySelectArrow {
    //       margin-left: 5px;
    //     }

    //     @media (max-width: 768px) {
    //       .form-section-content {
    //         padding: 20px 15px;
    //       }
    //     }
    //   `}</style>
    //   <div
    //     style={{
    //       alignItems: "center",
    //       backgroundColor: "#181818",
    //       display: "flex",
    //       justifyContent: "center",
    //       minHeight: "70px",
    //       width: "100%",
    //     }}
    //   >
    //     <div
    //       className="container mx-auto "
    //       style={{
    //         display: "flex",
    //         justifyContent: "center",
    //       }}
    //     >
    //       <img
    //         src="https://www.desalination-resource-recovery.com/api/images/logo/1742534509561.png"
    //         alt="Site logo"
    //         style={{ cursor: "pointer", width: "140px" }}
    //         onClick={() => navigate("/")}
    //       ></img>
    //     </div>
    //   </div>
    //   <div className="container mx-auto px-4 mt-4 mb-4">
    //     <div className="flex justify-center">
    //       <div className="w-full max-w-4xl">
    //         <form onSubmit={handleSubmit} className="space-y-6">
    //           {/* Company Details Section */}
    //           <div className="form-section">
    //             <h3 className="form-section-header">Company details</h3>
    //             <div className="form-section-content">
    //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    //                 <div className="input-container">
    //                   {" "}
    //                   {/* Changed from floating-label-group */}
    //                   <input
    //                     type="text"
    //                     className={`floating-input ${
    //                       validationErrors.companyName ? "is-invalid" : ""
    //                     } ${companyData.companyName ? "has-value" : ""}`}
    //                     id="companyName"
    //                     value={companyData.companyName}
    //                     onChange={(e) =>
    //                       handleCompanyDataChange("companyName", e.target.value)
    //                     }
    //                     placeholder=" "
    //                     required
    //                   />
    //                   <label htmlFor="companyName" className="floating-label">
    //                     Company name
    //                   </label>
    //                 </div>
    //                 <div className="input-container">
    //                   {" "}
    //                   {/* Changed from floating-label-group */}
    //                   <input
    //                     type="url"
    //                     className={`floating-input ${
    //                       companyData.webAddress ? "has-value" : ""
    //                     }`}
    //                     id="webAddress"
    //                     value={companyData.webAddress}
    //                     onChange={(e) =>
    //                       handleCompanyDataChange("webAddress", e.target.value)
    //                     }
    //                     placeholder=" "
    //                   />
    //                   <label htmlFor="webAddress" className="floating-label">
    //                     Web address
    //                   </label>
    //                 </div>
    //               </div>

    //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    //                 <div className="input-container">
    //                   {" "}
    //                   {/* Changed from floating-label-group */}
    //                   <input
    //                     type="text"
    //                     className={`floating-input ${
    //                       validationErrors.address ? "is-invalid" : ""
    //                     } ${companyData.address ? "has-value" : ""}`}
    //                     id="address"
    //                     value={companyData.address}
    //                     onChange={(e) =>
    //                       handleCompanyDataChange("address", e.target.value)
    //                     }
    //                     placeholder=" "
    //                     required
    //                   />
    //                   <label htmlFor="address" className="floating-label">
    //                     Address
    //                   </label>
    //                 </div>
    //                 <div className="country-select-group">
    //                   {" "}
    //                   {/* This group remains as is, but now has padding-top */}
    //                   <select
    //                     className={`floating-select ${
    //                       validationErrors.country ? "is-invalid" : ""
    //                     }`}
    //                     id="country"
    //                     value={companyData.country}
    //                     onChange={(e) =>
    //                       handleCompanyDataChange("country", e.target.value)
    //                     }
    //                     required
    //                   >
    //                     {countryOptions.map((option) => (
    //                       <option key={option.value} value={option.value}>
    //                         {option.label}
    //                       </option>
    //                     ))}
    //                   </select>
    //                 </div>
    //               </div>

    //               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    //                 <div className="input-container">
    //                   {" "}
    //                   {/* Changed from floating-label-group */}
    //                   <input
    //                     type="text"
    //                     className={`floating-input ${
    //                       validationErrors.city ? "is-invalid" : ""
    //                     } ${companyData.city ? "has-value" : ""}`}
    //                     id="city"
    //                     value={companyData.city}
    //                     onChange={(e) =>
    //                       handleCompanyDataChange("city", e.target.value)
    //                     }
    //                     placeholder=" "
    //                     required
    //                   />
    //                   <label htmlFor="city" className="floating-label">
    //                     City
    //                   </label>
    //                 </div>
    //                 <div className="input-container">
    //                   {" "}
    //                   {/* Changed from floating-label-group */}
    //                   <input
    //                     type="text"
    //                     className={`floating-input ${
    //                       companyData.state ? "has-value" : ""
    //                     }`}
    //                     id="state"
    //                     value={companyData.state}
    //                     onChange={(e) =>
    //                       handleCompanyDataChange("state", e.target.value)
    //                     }
    //                     placeholder=" "
    //                   />
    //                   <label htmlFor="state" className="floating-label">
    //                     State <span className="text-gray-500">(optional)</span>
    //                   </label>
    //                 </div>
    //                 <div className="input-container">
    //                   {" "}
    //                   {/* Changed from floating-label-group */}
    //                   <input
    //                     type="text"
    //                     className={`floating-input ${
    //                       validationErrors.postalCode ? "is-invalid" : ""
    //                     } ${companyData.postalCode ? "has-value" : ""}`}
    //                     id="postalCode"
    //                     value={companyData.postalCode}
    //                     onChange={(e) =>
    //                       handleCompanyDataChange("postalCode", e.target.value)
    //                     }
    //                     placeholder=" "
    //                     required
    //                   />
    //                   <label htmlFor="postalCode" className="floating-label">
    //                     Postal/Zip code
    //                   </label>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>

    //           {/* Delegates Container */}
    //           <div id="delegatesContainer">
    //             {delegates.map((delegate, index) => (
    //               <div
    //                 key={delegate.id}
    //                 className="form-section delegate-section"
    //               >
    //                 <div className="delegate-header">
    //                   <h3 className="delegate-title">Delegate {index + 1}</h3>
    //                   {index > 0 && (
    //                     <button
    //                       type="button"
    //                       className="remove-delegate-btn mr-3"
    //                       onClick={() => removeDelegate(delegate.id)}
    //                     >
    //                       <i className="fas fa-trash-alt mr-1"></i>Delete
    //                     </button>
    //                   )}
    //                 </div>
    //                 <div className="form-section-content">
    //                   {/* First row: First name, Last name, Mobile */}
    //                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
    //                     <div className="input-container">
    //                       {" "}
    //                       {/* Changed from floating-label-group */}
    //                       <input
    //                         type="text"
    //                         className={`floating-input ${
    //                           validationErrors[
    //                             `delegate_${delegate.id}_firstName`
    //                           ]
    //                             ? "is-invalid"
    //                             : ""
    //                         } ${delegate.firstName ? "has-value" : ""}`}
    //                         id={`firstName${delegate.id}`}
    //                         value={delegate.firstName}
    //                         onChange={(e) =>
    //                           handleDelegateChange(
    //                             delegate.id,
    //                             "firstName",
    //                             e.target.value
    //                           )
    //                         }
    //                         placeholder=" "
    //                         required
    //                       />
    //                       <label
    //                         htmlFor={`firstName${delegate.id}`}
    //                         className="floating-label"
    //                       >
    //                         First name
    //                       </label>
    //                     </div>
    //                     <div className="input-container">
    //                       {" "}
    //                       {/* Changed from floating-label-group */}
    //                       <input
    //                         type="text"
    //                         className={`floating-input ${
    //                           validationErrors[
    //                             `delegate_${delegate.id}_lastName`
    //                           ]
    //                             ? "is-invalid"
    //                             : ""
    //                         } ${delegate.lastName ? "has-value" : ""}`}
    //                         id={`lastName${delegate.id}`}
    //                         value={delegate.lastName}
    //                         onChange={(e) =>
    //                           handleDelegateChange(
    //                             delegate.id,
    //                             "lastName",
    //                             e.target.value
    //                           )
    //                         }
    //                         placeholder=" "
    //                         required
    //                       />
    //                       <label
    //                         htmlFor={`lastName${delegate.id}`}
    //                         className="floating-label"
    //                       >
    //                         Last name
    //                       </label>
    //                     </div>
    //                     <div className="mobile-input-group">
    //                       {" "}
    //                       {/* This group remains as is, but now has padding-top */}
    //                       <label
    //                         className={`mobile-static-label ${
    //                           validationErrors[`delegate_${delegate.id}_mobile`]
    //                             ? "error"
    //                             : ""
    //                         }`}
    //                       >
    //                         Mobile
    //                       </label>
    //                       <PhoneInput
    //                         international
    //                         countryCallingCodeEditable={false}
    //                         defaultCountry="US"
    //                         value={delegate.mobile}
    //                         onChange={(value) =>
    //                           handleDelegateChange(
    //                             delegate.id,
    //                             "mobile",
    //                             value || ""
    //                           )
    //                         }
    //                         className={
    //                           validationErrors[`delegate_${delegate.id}_mobile`]
    //                             ? "is-invalid"
    //                             : ""
    //                         }
    //                         inputComponent={({ className, ...props }) => (
    //                           <input
    //                             {...props}
    //                             className={`PhoneInputInput ${
    //                               validationErrors[
    //                                 `delegate_${delegate.id}_mobile`
    //                               ]
    //                                 ? "is-invalid"
    //                                 : ""
    //                             }`}
    //                           />
    //                         )}
    //                       />
    //                     </div>
    //                   </div>

    //                   {/* Second row: Position, Email */}
    //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    //                     <div className="input-container">
    //                       {" "}
    //                       {/* Changed from floating-label-group */}
    //                       <input
    //                         type="text"
    //                         className={`floating-input ${
    //                           validationErrors[
    //                             `delegate_${delegate.id}_position`
    //                           ]
    //                             ? "is-invalid"
    //                             : ""
    //                         } ${delegate.position ? "has-value" : ""}`}
    //                         id={`position${delegate.id}`}
    //                         value={delegate.position}
    //                         onChange={(e) =>
    //                           handleDelegateChange(
    //                             delegate.id,
    //                             "position",
    //                             e.target.value
    //                           )
    //                         }
    //                         placeholder=" "
    //                         required
    //                       />
    //                       <label
    //                         htmlFor={`position${delegate.id}`}
    //                         className="floating-label"
    //                       >
    //                         Position
    //                       </label>
    //                     </div>
    //                     <div className="input-container">
    //                       {" "}
    //                       {/* Changed from floating-label-group */}
    //                       <input
    //                         type="email"
    //                         className={`floating-input ${
    //                           validationErrors[`delegate_${delegate.id}_email`]
    //                             ? "is-invalid"
    //                             : ""
    //                         } ${delegate.email ? "has-value" : ""}`}
    //                         id={`email${delegate.id}`}
    //                         value={delegate.email}
    //                         onChange={(e) =>
    //                           handleDelegateChange(
    //                             delegate.id,
    //                             "email",
    //                             e.target.value
    //                           )
    //                         }
    //                         placeholder=" "
    //                         required
    //                       />
    //                       <label
    //                         htmlFor={`email${delegate.id}`}
    //                         className="floating-label"
    //                       >
    //                         Email address
    //                       </label>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //             ))}
    //           </div>

    //           {/* Add Delegate Button */}
    //           <div className="mb-4">
    //             <button
    //               type="button"
    //               className="btn-add-delegate"
    //               onClick={addDelegate}
    //             >
    //               <i className="fas fa-plus mr-2"></i>Add Delegate
    //             </button>
    //           </div>

    //           {/* Terms and Submit Section */}
    //           <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
    //             <div className="flex items-start mb-3 md:mb-0">
    //               <input
    //                 type="checkbox"
    //                 className={`form-check-input ${
    //                   validationErrors.termsAgreement ? "is-invalid" : ""
    //                 }`}
    //                 id="termsAgreement"
    //                 checked={termsAgreement}
    //                 onChange={(e) => setTermsAgreement(e.target.checked)}
    //                 required
    //               />
    //               <label
    //                 className="form-check-label ml-2"
    //                 htmlFor="termsAgreement"
    //               >
    //                 Please tick to confirm your agreement to the{" "}
    //                 <a href="#" className="terms-link">
    //                   terms and conditions
    //                 </a>
    //               </label>
    //             </div>
    //             <button
    //               type="submit"
    //               className="btn-submit"
    //               onClick={() => navigate("/booking-form")}
    //             >
    //               Submit
    //             </button>
    //           </div>
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    //   <div
    //     style={{
    //       alignItems: "center",
    //       backgroundColor: "#181818",
    //       display: "flex",
    //       justifyContent: "center",
    //       height: "80px",
    //       width: "100%",
    //     }}
    //   >
    //     <div
    //       style={{
    //         maxWidth: "1070px",
    //         alignItems: "center",
    //         display: "flex",
    //         justifyContent: "space-between",
    //         width: "90%",
    //       }}
    //     >
    //       <p
    //         style={{
    //           color: "#fff",
    //           fontSize: "14px",
    //           fontWeight: "500",
    //           margin: "0",
    //           padding: "0",
    //         }}
    //       >
    //         <span>Privacy Policy</span>
    //         <span class="PageForm_divide__vwhn0">|</span>IQ International PTe.
    //         LTD
    //       </p>
    //       <p
    //         style={{
    //           color: "#fff",
    //           fontSize: "14px",
    //           fontWeight: "500",
    //           margin: "0",
    //           padding: "0",
    //         }}
    //       >
    //         ©2025 Desalination &amp; Resource Recovery 2025
    //       </p>
    //     </div>
    //   </div>
    // </div>
  );
};

export default AddSponsorDelegateForm;
