import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import countryList from "react-select-country-list";
import { useNavigate } from "react-router-dom";
import "../assets/css/AddDelegateForm.css";
import TextField from "@mui/material/TextField";
import { getNames } from "country-list";
import Autocomplete from "@mui/material/Autocomplete";
import { MuiTelInput } from "mui-tel-input";
import Button from "@mui/material/Button";
import { FormControl, FormHelperText } from "@mui/material";
import { useApiData } from "../../src/common/ApiContext";
const logo =
  "https://harsh7541.pythonanywhere.com/media/mediabitcoin_logo_white.png";
const plusIcon =
  "https://www.desalination-resource-recovery.com/images/icons/plus.png";
const closeBtn =
  "https://www.desalination-resource-recovery.com/images/icons/del-cross.png";
const countries = getNames();

const CompanyRegistrationForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedPackage = location?.state?.selectedCard;
  const selectedQty = location?.state?.quantity;
  console.log("selectedQty: ", selectedQty);
  console.log("selectedPackage: ", selectedPackage);
  const phoneInputRef = useRef(null);
  const {
    homeVideoSettings,
    eventDetails,
    eventGeneralSettings,
    themeSettings,
  } = useApiData();
  const createDelegate = (id) => ({
    id,
    firstName: "",
    lastName: "",
    position: "",
    email: "",
    mobile: "",
  });

  // Initialize delegates based on selectedQty
  const initializeDelegates = () => {
    if (selectedQty === 0 || !selectedQty) {
      // If selectedQty is 0 or undefined/null, create one delegate
      return [createDelegate(1)];
    } else {
      // If selectedQty is 1 or greater, create selectedQty number of delegates
      const delegatesArray = [];
      for (let i = 1; i <= selectedQty; i++) {
        delegatesArray.push(createDelegate(i));
      }
      return delegatesArray;
    }
  };

  const [delegates, setDelegates] = useState(initializeDelegates());
  console.log("delegates: ", delegates);

  const [delegateCount, setDelegateCount] = useState(
    selectedQty && selectedQty > 0 ? selectedQty : 1,
  );

  const portalId = "4000965";
  const formGuid = "1e2e18e4-1877-4d07-9a22-6c2dbca5c2f8";

  useEffect(() => {
    const initialDelegates = initializeDelegates();
    setDelegates(initialDelegates);
    setDelegateCount(selectedQty && selectedQty > 0 ? selectedQty : 1);
  }, [selectedQty]);

  const [companyData, setCompanyData] = useState({
    companyName: "",
    webAddress: "",
    address: "",
    country: "",
    city: "",
    state: "",
    postalCode: "",
  });
  console.log("companyData: ", companyData);
  const [companyErrors, setCompanyErrors] = useState({
    companyName: false,
    webAddress: false,
    address: false,
    country: false,
    city: false,
    state: false,
    postalCode: false,
  });
  // Delegate validation errors
  const [delegateErrors, setDelegateErrors] = useState({});
  // Terms agreement validation
  const [termsError, setTermsError] = useState(false);
  // Form submission attempted flag
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const [termsAgreement, setTermsAgreement] = useState(false);
  // const validateField = (fieldName, value) => {
  //   const isRequired = !value || value.trim() === "";
  //   setErrors((prev) => ({
  //     ...prev,
  //     [fieldName]: isRequired,
  //   }));
  //   return !isRequired;
  // };
  const [validationErrors, setValidationErrors] = useState({});

  // Get country options from react-select-country-list
  const countryOptions = [
    { value: "", label: "Select a country" },
    ...countryList().getData(),
  ];

  // Handle company data changes
  // const handleCompanyDataChange = (field, value) => {
  //   setCompanyData((prev) => ({
  //     ...prev,
  //     [field]: value,
  //   }));

  //   // Clear error when field becomes valid (only if form submission was attempted)
  //   if (validationErrors[field]) {
  //     setValidationErrors((prev) => ({
  //       ...prev,
  //       [field]: false,
  //     }));
  //   }
  // };

  const handleCompanyDataChange = (field, value) => {
    setCompanyData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when field becomes valid (only if form submission was attempted)
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
        delegate.id === delegateId ? { ...delegate, [field]: value } : delegate,
      ),
    );

    // Clear validation error for this field (only if form submission was attempted)
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

  const addDelegate = () => {
    const newDelegateId = delegateCount + 1;
    const newDelegate = createDelegate(newDelegateId);

    setDelegates((prev) => [...prev, newDelegate]);
    setDelegateCount(newDelegateId);
  };

  // Remove delegate
  const removeDelegate = (delegateId) => {
    setDelegates((prev) =>
      prev.filter((delegate) => delegate.id !== delegateId),
    );

    // Remove errors for this delegate
    if (submitAttempted) {
      setDelegateErrors((prev) => {
        const newErrors = { ...prev };
        Object.keys(newErrors).forEach((key) => {
          if (key.startsWith(`delegate_${delegateId}_`)) {
            delete newErrors[key];
          }
        });
        return newErrors;
      });
    }
  };

  // Email validation helper
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // const validateForm = () => {
  //   const newCompanyErrors = {};
  //   const newDelegateErrors = {};
  //   let isValid = true;

  //   // Validate company data
  //   const requiredCompanyFields = [
  //     "companyName",
  //     "address",
  //     "country",
  //     "city",
  //     "postalCode",
  //   ];
  //   requiredCompanyFields.forEach((field) => {
  //     if (!companyData[field] || !companyData[field].trim()) {
  //       newCompanyErrors[field] = true;
  //       isValid = false;
  //     } else {
  //       newCompanyErrors[field] = false;
  //     }
  //   });

  //   // Set webAddress and state as not required (always false)
  //   newCompanyErrors.webAddress = false;
  //   newCompanyErrors.state = false;

  //   // Validate delegates
  //   delegates.forEach((delegate) => {
  //     const requiredDelegateFields = [
  //       "firstName",
  //       "lastName",
  //       "position",
  //       "email",
  //       "mobile",
  //     ];

  //     requiredDelegateFields.forEach((field) => {
  //       const errorKey = `delegate_${delegate.id}_${field}`;
  //       if (!delegate[field] || !delegate[field].trim()) {
  //         newDelegateErrors[errorKey] = true;
  //         isValid = false;
  //       } else if (field === "email" && !isValidEmail(delegate[field])) {
  //         newDelegateErrors[errorKey] = true;
  //         isValid = false;
  //       } else {
  //         newDelegateErrors[errorKey] = false;
  //       }
  //     });
  //   });

  //   // Validate terms agreement
  //   if (!termsAgreement) {
  //     setTermsError(true);
  //     isValid = false;
  //   } else {
  //     setTermsError(false);
  //   }

  //   setCompanyErrors(newCompanyErrors);
  //   setDelegateErrors(newDelegateErrors);

  //   return isValid;
  // };

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

    // Add your delegate validation logic here...
    // (your existing delegate validation code)

    // SET THE STATE - This was missing!
    setCompanyErrors(newCompanyErrors);
    setDelegateErrors(newDelegateErrors); // if you have this state

    return isValid;
  };

  // Handle form submission
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setSubmitAttempted(true);

  //   if (validateForm()) {
  //     const formData = {
  //       company: companyData,
  //       delegates: delegates,
  //       termsAgreement: termsAgreement,
  //     };
  //     console.log("formData: ", formData);

  //     const invoiceNumber = `BIME26ABC-${Math.floor(
  //       1000 + Math.random() * 9000
  //     )}`;
  //     // Static values
  //     const disposition = "Confirmed";
  //     const emailStatus = "Confirmed Old";

  //     // Function to submit to HubSpot (no delay)
  //     async function submitCompanyDelegatesToHubSpot(formData) {
  //       const submissions = formData.delegates.map(async (delegate) => {
  //         const payload = {
  //           fields: [
  //             { name: "company", value: formData.company.companyName },
  //             { name: "state", value: formData.company.state },
  //             { name: "address", value: formData.company.address },
  //             { name: "country", value: formData.company.country },
  //             { name: "city", value: formData.company.city },
  //             { name: "zip", value: formData.company.postalCode },
  //             { name: "website", value: formData.company.webAddress },
  //             { name: "lastname", value: delegate.lastName },
  //             { name: "firstname", value: delegate.firstName },
  //             { name: "booking_form_phone_number", value: delegate.mobile },
  //             { name: "jobtitle", value: delegate.position },
  //             { name: "email", value: delegate.email },
  //             { name: "invoice_number", value: invoiceNumber },
  //             { name: "disposition_wdrm_2025", value: disposition },
  //             { name: "email_status_wdrm_2025", value: emailStatus },
  //           ],
  //           context: {
  //             pageUri: window.location.href,
  //             pageName: document.title,
  //           },
  //         };

  //         try {
  //           const response = await fetch(
  //             `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
  //             {
  //               method: "POST",
  //               headers: { "Content-Type": "application/json" },
  //               body: JSON.stringify(payload),
  //             }
  //           );
  //           const result = await response.json();
  //           console.log(
  //             `✅ Submitted ${delegate.firstName} ${delegate.lastName}:`,
  //             result
  //           );
  //         } catch (error) {
  //           console.error(`❌ Error submitting ${delegate.firstName}:`, error);
  //         }
  //       });

  //       // Run all submissions simultaneously
  //       await Promise.all(submissions);

  //       console.log(`🎟️ Company: ${formData.company.companyName}`);
  //       console.log(`🧾 Invoice Number: ${invoiceNumber}`);
  //     }

  //     // Run the submission
  //     submitCompanyDelegatesToHubSpot(formData);

  //     // Navigate to booking-form and pass the data via state
  //     navigate("/booking-form", {
  //       state: {
  //         selectedPackage: selectedPackage,
  //         companyData: companyData,
  //         delegates: delegates,
  //         termsAgreement: termsAgreement,
  //         uniqueInvoiceNo: invoiceNumber,

  //       },
  //     });
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitAttempted(true);

    if (validateForm()) {
      const formData = {
        company: companyData,
        delegates: delegates,
        termsAgreement: termsAgreement,
      };
      console.log("formData: ", formData);

      // const invoiceNumber = `BIME26ABC-${Math.floor(
      //   1000 + Math.random() * 9000,
      // )}`;

      // ADD THIS ✅
      let invoiceNumber;
      try {
        const invoiceRes = await fetch(
          "https://harsh7541.pythonanywhere.com/admin1/generate-invoice-no/"
        );
        const invoiceData = await invoiceRes.json();
        invoiceNumber = invoiceData.invoiceNo;
      } catch (error) {
        console.error("❌ Failed to generate invoice number:", error);
        alert("Could not generate invoice number. Please try again.");
        return; // Stop submission if invoice generation fails
      }
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
              },
            );
            const result = await response.json();
            console.log(
              `✅ Submitted ${delegate.firstName} ${delegate.lastName}:`,
              result,
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

      // Function to send email
      async function sendBookingEmail() {
        // Build HTML content for email
        let htmlContent = `
        <div style='width: 60%; background-color: transparent; color: black;'>
          <table style='width: 100%; border-collapse: collapse;'>
            <tr><td colspan='2' style='font-weight: bold; padding: 8px; background-color: #f0f0f0;'>Company Details</td></tr>
            <tr><td style='width: 50%; padding: 8px;'>Company Name:</td><td style='width: 50%; padding: 8px;'>${companyData.companyName}</td></tr>
            <tr><td style='width: 50%; padding: 8px;'>Web Address:</td><td style='width: 50%; padding: 8px;'>${companyData.webAddress}</td></tr>
            <tr><td style='width: 50%; padding: 8px;'>Address:</td><td style='width: 50%; padding: 8px;'>${companyData.address}</td></tr>
            <tr><td style='width: 50%; padding: 8px;'>City:</td><td style='width: 50%; padding: 8px;'>${companyData.city}</td></tr>
            <tr><td style='width: 50%; padding: 8px;'>Country:</td><td style='width: 50%; padding: 8px;'>${companyData.country}</td></tr>
            <tr><td style='width: 50%; padding: 8px;'>Postal Code:</td><td style='width: 50%; padding: 8px;'>${companyData.postalCode}</td></tr>
            <tr><td style='width: 50%; padding: 8px;'>State:</td><td style='width: 50%; padding: 8px;'>${companyData.state}</td></tr>
            <tr><td style='width: 50%; padding: 8px;'>Invoice no:</td><td style='width: 50%; padding: 8px;'>${invoiceNumber}</td></tr>
      `;

        // Add each delegate
        delegates.forEach((delegate, index) => {
          htmlContent += `
            <tr><td colspan='2' style='font-weight: bold; padding: 8px; background-color: #f0f0f0;'>Delegate ${index + 1} Details:</td></tr>
            <tr><td style='width: 50%; padding: 8px;'>Email:</td><td style='width: 50%; padding: 8px;'>${delegate.email}</td></tr>
            <tr><td style='width: 50%; padding: 8px;'>First Name:</td><td style='width: 50%; padding: 8px;'>${delegate.firstName}</td></tr>
            <tr><td style='width: 50%; padding: 8px;'>Last Name:</td><td style='width: 50%; padding: 8px;'>${delegate.lastName}</td></tr>
            <tr><td style='width: 50%; padding: 8px;'>Phone Number:</td><td style='width: 50%; padding: 8px;'>${delegate.mobile}</td></tr>
            <tr><td style='width: 50%; padding: 8px;'>Position:</td><td style='width: 50%; padding: 8px;'>${delegate.position}</td></tr>
        `;
        });

        htmlContent += `
          </table>
        </div>
      `;

        // Prepare email payload
        const emailPayload = {
          // toemail: "sam.razura@iq-hub.com,chris.smith@iq-hub.com,leo.newman@iq-hub.com,arthur.pina@iq-hub.com,ks@iq-hub.com,ken.peters@iq-hub.com,",
          toemail: "sam.razura@iq-hub.com,benny.scott@iq-hub.com,",
          cc: "",
          subject: "BIME - Booking Form Step 1",
          html: htmlContent,
        };

        try {
          const emailResponse = await fetch(
            "https://harsh7541.pythonanywhere.com/admin1/sendmail",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(emailPayload),
            },
          );

          const emailResult = await emailResponse.json();

          if (emailResult.status === "success") {
            console.log("✅ Email sent successfully");
          } else {
            console.error("❌ Email sending failed:", emailResult.message);
          }
        } catch (error) {
          console.error("❌ Error sending email:", error);
        }
      }

      // Function to submit to Zoho webhook
      async function submitToZoho() {
        const today = new Date();
        const dateFormatted = today.toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        });
        const pacPrice = selectedPackage?.deligatePackagePrice
        const numDelegates = delegates?.length
        const preTaxAmount = pacPrice * numDelegates
        const taxPercent = parseFloat(
          eventGeneralSettings?.purchaseTaxPercent || 0,
        );
        const taxAmount = (preTaxAmount * taxPercent) / 100;
        const totalAmount = preTaxAmount + taxAmount;

        const zohoPayload = {
          webhookTrigger: {
            payload: {
              StateRegion: formData.company.state || "",
              Discount: "0",
              Address: formData.company.address || "-",
              DelegateCompanyName: formData.company.companyName || "",
              PreTaxAmount: { preTaxAmount },
              PostalCode: formData.company.postalCode || "0",
              CompanyWebAddress: formData.company.webAddress || "",
              City: formData.company.city || "",
              DiscountCode: "",
              TotalAmount: { totalAmount },
              Date: dateFormatted,
              TaxAmount: { taxAmount },
              Packages: selectedPackage?.deligatePackageName || "",
              Currency: "USD",
              Eventname: "Bitcoin Innovation & Market Evolution",
              Country: formData.company.country || "",
              Delegates: formData.delegates.map((delegate) => ({
                Email: delegate.email,
                Position: delegate.position || "-",
                FirstName: delegate.firstName,
                PhoneNumber: delegate.mobile,
                LastName: delegate.lastName,
              })),
              TotalAmountFormatted: { totalAmount },
              InvoiceNumber: invoiceNumber,
              FormName: "Booking Form",
              FormURL: "https://www.bitcoin-innovation-market-evolution.online/adddelegate",
              AddOnsTotalAmount: "0",
              Eventcode: "BIME",
            },
          },
        };

        try {
          const zohoResponse = await fetch(
            "https://harsh7541.pythonanywhere.com/admin1/sendtozoho",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(zohoPayload),
            },
          );
          const zohoResult = await zohoResponse.json();
          console.log("✅ Zoho submission successful:", zohoResult);
        } catch (error) {
          console.error("❌ Error submitting to Zoho:", error);
        }
      }

      try {
        // Run HubSpot submission, email sending, and Zoho in parallel
        await Promise.all([
          submitCompanyDelegatesToHubSpot(formData),
          sendBookingEmail(),
          submitToZoho(),
        ]);
        // Navigate to booking-form after both complete
        navigate("/booking-form", {
          state: {
            selectedPackage: selectedPackage,
            companyData: companyData,
            delegates: delegates,
            termsAgreement: termsAgreement,
            uniqueInvoiceNo: invoiceNumber,
          },
        });
      } catch (error) {
        console.error("❌ Error in submission process:", error);
        // Optionally show error message to user
        alert("There was an error submitting your booking. Please try again.");
      }
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
        <div className="BookingFormV2_container__XPZAc">
          <div>
            <div className="BookingFormV2_companyDetails__gy3Kt">
              <form
                action="#"
                className="WDRM_2025_booking_form form_WDRM"
                data-hs-cf-bound="true"
                onSubmit={handleSubmit}
              >
                <div className="BookingFormV2_companyForm__2HuYv">
                  <div className="BookingFormV2_bar__KQ2vi">
                    <h2>Company details</h2>
                  </div>
                  <div className="BookingFormV2_companyFormInner__pqUBT">
                    <div className="BookingFormV2_formRow__06cJs">
                      <TextField
                        label="Company name"
                        type="companyName"
                        variant="standard"
                        className="BookingFormV2_bottomMargin__NlvW-"
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
                    <div className="BookingFormV2_formRow__06cJs">
                      <div className="BookingFormV2_formColumn__mzhg0">
                        <TextField
                          label="Address"
                          type="address"
                          variant="standard"
                          className="BookingFormV2_bottomMargin__NlvW-"
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
                      </div>
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
                    <div className="BookingFormV2_formRow__06cJs">
                      <div className="BookingFormV2_formColumn__mzhg0">
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
                        className="BookingFormV2_bottomMargin__NlvW-"
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
                      className="BookingFormV2_delegateForm__7l3nY"
                    >
                      <div className="BookingFormV2_bar__KQ2vi">
                        <h2>Delegate {index + 1}</h2>
                        {index > 0 && (
                          <div className="BookingFormV2_delbtnContainer__g7D+b">
                            <Button
                              className="BookingFormV2_delBtn__3MPla"
                              onClick={() => removeDelegate(delegate.id)}
                            >
                              <img src={closeBtn} alt="closeBtn"></img>
                            </Button>
                          </div>
                        )}
                      </div>
                      <div className="BookingFormV2_delegateFormInner__PM9nL">
                        <div>
                          <div>
                            <div className="BookingFormV2_formRow__06cJs">
                              <div className="BookingFormV2_formColumn__mzhg0">
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
                                      e.target.value,
                                    )
                                  }
                                  fullWidth
                                  error={getDelegateFieldError(
                                    delegate.id,
                                    "firstName",
                                  )}
                                  helperText={getDelegateFieldErrorMessage(
                                    delegate.id,
                                    "firstName",
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
                                      e.target.value,
                                    )
                                  }
                                  fullWidth
                                  error={getDelegateFieldError(
                                    delegate.id,
                                    "lastName",
                                  )}
                                  helperText={getDelegateFieldErrorMessage(
                                    delegate.id,
                                    "lastName",
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
                              <div className="BookingFormV2_inputRow__-6MII">
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
                                        minValue,
                                      );
                                      return;
                                    }

                                    const nationalNumber =
                                      info?.nationalNumber || "";
                                    const digitsOnly = nationalNumber.replace(
                                      /\D/g,
                                      "",
                                    );
                                    if (digitsOnly.length <= 10) {
                                      handleDelegateChange(
                                        delegate.id,
                                        "mobile",
                                        value,
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
                                          event.key,
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
                                    "mobile",
                                  )}
                                  helperText={getDelegateFieldErrorMessage(
                                    delegate.id,
                                    "mobile",
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
                            <div className="BookingFormV2_formRow__06cJs">
                              <TextField
                                label="Position"
                                type="position"
                                variant="standard"
                                className="BookingFormV2_bottomMargin__NlvW-"
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
                                    e.target.value,
                                  )
                                }
                                fullWidth
                                error={getDelegateFieldError(
                                  delegate.id,
                                  "position",
                                )}
                                helperText={getDelegateFieldErrorMessage(
                                  delegate.id,
                                  "position",
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
                                    e.target.value,
                                  )
                                }
                                fullWidth
                                error={getDelegateFieldError(
                                  delegate.id,
                                  "email",
                                )}
                                helperText={getDelegateFieldErrorMessage(
                                  delegate.id,
                                  "email",
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
                <div className="BookingFormV2_addbtnContainer__AsQQo">
                  <Button
                    variant="contained"
                    className="BookingFormV2_delBtn__3MPla"
                    onClick={addDelegate}
                  >
                    <img src={plusIcon} alt="plusIcon"></img>
                    Add Delegate
                  </Button>
                </div>
                <div className="BookingFormV2_submitContainer__qnA3B">
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
                    className="BookingFormV2_submitBtn__nFF03"
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
            <p>©2026 Bitcoin Innovation & Market Evolution 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyRegistrationForm;
