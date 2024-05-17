// import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
// import {
//   Box,
//   Button,
//   Card,
//   Container,
//   Grid,
//   InputAdornment,
//   Switch,
//   Tab,
//   Tabs,
//   TextField,
//   Typography
// } from "@mui/material";
// import { format } from 'date-fns';
// import { getJwtToken } from "./UtlisAuth";
// import { isValid } from 'date-fns';



// function NewClient() {
//   const [value, setValue] = useState('');
//   const [companyData, setCompanyData] = useState(null);
//   const [jwtToken, setJwtToken] = useState("");
//   const [companyNumber, setCompanyNumber] = useState("");
//   const [companyNumberFilled, setCompanyNumberFilled] = useState(false);

//   useEffect(() => {
//     // Set the default tab to "Company Information" (index 0) when the component mounts
//     setValue(0);
//   }, []); // Empty dependency array to run this effect only once


//   // State variables for user-entered fields
//   const [uniqueTaxRefNo, setUniqueTaxRefNo] = useState('');
//   const [authenticationCode, setAuthenticationCode] =useState('');
//   const [employerPayeReference, setEmployerPayeReference] = useState('');
//   const [gatewayId, setGatewayId] = useState('');
//   const [accountOfficeReference, setAccountOfficeReference] = useState(''); // Initialize state with an empty string
//   const [password, setPassword] = useState("");
//   const [vatNo, setVatNo] = useState('');
//   const [companyType, setCompanyType] = useState("");
//   const [homeTelephone, setHomeTelephone] = useState("");
//   const [workTelephone, setWorkTelephone] = useState("");
//   const [mobileNo, setMobileNo] = useState("");
//   const [emailAddress, setEmailAddress] = useState("");
//   const [niNo, setNiNo] = useState("");
//   const [directorGatewayId, setDirectorGatewayId] = useState('');
//   const [directorUniqueTaxNo, setDirectorUniqueTaxNo] = useState('');
//   const [directorPassword, setDirectorPassword] = useState("");

//   const [isEngagementAvailable, setIsEngagementAvailable] = useState(false);
// const [is64bAvailable, setIs64bAvailable] = useState(false);
// const [isAmlAvailable, setIsAmlAvailable] = useState(false);
// const [isGdrpAvailable, setIsGdrpAvailable] = useState(false);
// const [isIcoAvailable, setIsIcoAvailable] = useState(false);
// const [isIdAndProofOfAddressAvailable, setIsIdAndProofOfAddressAvailable] = useState(false);

//   const [confirmationStatementDueDate, setConfirmationStatementDueDate] =
//     useState("");
//   const [accountDueDate, setAccountDueDate] = useState("");
//   const [vatQeDueDate, setVatQeDueDate] = useState("");
//   const [payrollAmount, setPayrollAmount] = useState('');
//   const [accountFee, setAccountFee] = useState('');
//   const [vatFee, setVatFee] = useState('');
//   const [pensionFee, setPensionFee] = useState('');
//   const [taxReturnFee, setTaxReturnFee] = useState('');
//   const [registerOfficeFee, setRegisterOfficeFee] = useState('');
//   const [confirmationStatementFee, setConfirmationStatementFee] = useState('');
//   const [othersFee, setOthersFee] = useState('');
//   const [currentYearFee, setCurrentYearFee] = useState('');
//   const [osYearEnd20Amount, setOsYearEnd20Amount] = useState('');
//   const [total, setTotal] = useState('');
//   const [oneOffPaymentFee, setOneOffPaymentFee] = useState('');
//   const [directDebitFee, setDirectDebitFee] = useState('');
//   // State variables for director's unique tax reference number
//   const [directorUniqueTaxRefNo, setDirectorUniqueTaxRefNo] = useState("");

//   const [directorData, setDirectorData] = useState({
//     forename: "",
//     surname: "",
//     date_of_birth: "",
//     address: {},
//   });

//   useEffect(() => {
//     const token = getJwtToken();
//     if (token) {
//       setJwtToken(token);
//       const min = 1;
//       const max = 100000;
//       const rand = parseInt(Math.random());
//       console.log(rand);
//     }
//   }, []);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const handleCompanyNumberChange = async (event) => {
//     const number = event.target.value;
//     setCompanyNumber(number); // Store as a string to preserve leading zeros
//     setCompanyNumberFilled(!!number);
//     if (!number) {
//       setCompanyData(null);
//       return;
//     }

//     const apiUrl = `http://18.197.21.71:8084/ipik/ExternalCompaniesInfo?companyId=${number}`;

//     try {
//       const response = await fetch(apiUrl, {
//         headers: {
//           Authorization: `Bearer ${jwtToken}`,
//         },
//       });
//       const data = await response.json();

//       if (data && data.CODE === 1) {
//         setCompanyData(data.DATA[0]);
//         fetchDirectorData(number);
//       } else {
//         console.error("Failed to fetch company data");
//         setCompanyData(null);
//       }
//     } catch (error) {
//       console.error("Error fetching company data:", error);
//       setCompanyData(null);
//     }
//   };

//   const fetchDirectorData = async (number) => {
//     const apiUrl = `http://18.197.21.71:8084/ipik/ExternalCompaniesInfoDetail?companyId=${number}`;

//     try {
//       const response = await fetch(apiUrl, {
//         headers: {
//           Authorization: `Bearer ${jwtToken}`,
//         },
//       });
//       const data = await response.json();

//       if (data && data.CODE === 1 && data.DATA && data.DATA.length > 0) {
//         const director = data.DATA[0].items.find(
//           (item) => item.officer_role === "director"
//         );

//         if (director) {
//           const { name, date_of_birth, address } = director;
//           const [surname, forename] = name
//             .split(",")
//             .map((part) => part.trim());

//           setDirectorData({
//             surname,
//             forename,
//             date_of_birth: formatDateOfBirth(date_of_birth),
//             address,
//           });
//         } else {
//           console.log("Director not found in API data");
//         }
//       } else {
//         console.log("Failed to fetch director data");
//       }
//     } catch (error) {
//       console.log("Error fetching director data:", error);
//     }
//   };

//   const formatDateOfBirth = (date_of_birth) => {
//     if (!date_of_birth) return ""; // Handle case where DOB is not provided
//     const date = new Date(`${date_of_birth.year}-${date_of_birth.month}`);
//     return date.toLocaleDateString(); // Adjust the format as needed
//   };

//   const handleNextButtonClick = () => {
//     // Increment value to move to the next tab
//     setValue(value + 1);
//   };

//   const handleSave = async () => {
//     // Check if companyNumber is empty
//     if (!companyNumber) {
//       console.error("Company number is empty");
//       return;
//     }
//     // Construct the API call
//     const apiUrl = `http://18.197.21.71:8084/ipik/CompaniesSave`;

//     const min = 1;
//     const max = 100000;
//     const uniqueUvid = Math.floor(Math.random() * (max - min + 1)) + min;
    

//     const handleCompanyTypeChange = (event) => {
//       const inputValue = event.target.value;
//       const intValue = parseInt(inputValue, 10); // Convert input value to integer
//       setCompanyType(isNaN(intValue) ? "" : intValue); // Set companyType to integer or empty string if conversion fails
//     };    

//      var uvid = uniqueUvid;
//      var companyNo = companyNumber;
//      var companyName = companyData?.company_name || "";
//      var clientCode = companyData?.client_code || "";
//      var registerOffice = companyData?.registered_office_address?.address_line_1 || "";
//      var uniqueTaxRefNo = companyData?.uniqueTaxRefNo || 0; 
//      var authenticationCode = "";
//      var vatNumber = parseInt(vatNo, 10) || 0;
//      var payeReference = parseInt(employerPayeReference, 10) || 0;
//      var accountOfficeReferenceToSend = accountOfficeReference.trim() !== '' ? accountOfficeReference.trim() : null;
//      var gatewayId = 1211;
//      var password = "password";
//      var directorForename = directorData.forename || "";
//      var directorSurname = directorData.surname || "";
//      var directorDob = format(new Date(directorData.date_of_birth), 'yyyy-MM-dd');
//      var directorHomeAddress = directorData.address ? Object.values(directorData.address).join(", "): "";     
//      var directorHomeTelephone = homeTelephone;
//      var directorWorkTelephone = workTelephone;
//      var directorMobile = mobileNo;
//      var directorEmail = emailAddress;
//      var directorNiNumber = niNo;
//      var directorUniqueTaxRefNo = parseInt(directorUniqueTaxNo, 10) || 0;
//      var directorGatewayId = parseInt(directorGatewayId, 10) || 0;
//      var directorPassword = ""; 
//      var IsEngagementAvailable = 1;
//      var is64bAvailable = 1;
//      var isAmlAvailable = 1;
//      var isGdrpAvailable = 1;
//      var isIcoAvailable = 1;
//      var isIdAndProofOfAddressAvailable = 1;
//      const accountDueDateToSend = accountDueDate && isValid(new Date(accountDueDate)) ? format(new Date(accountDueDate), 'yyyy-MM-dd') : null;
//      const confirmationStatementToSend = confirmationStatementDueDate && isValid(new Date(confirmationStatementDueDate)) ? format(new Date(confirmationStatementDueDate), 'yyyy-MM-dd') : null;
//      const vatQeToSend = vatQeDueDate && isValid(new Date(vatQeDueDate)) ? format(new Date(vatQeDueDate), 'yyyy-MM-dd') : null;
//      var payrollAmountToSend = payrollAmount.trim() !== '' ? parseFloat(payrollAmount) : 0;
//      var pensionAmount = pensionFee || 0;
//      var taxReturnAmount = taxReturnFee || 0;
//      var registerOfficeAmount = registerOfficeFee || 0;
//      var confirmationStatementAmount = confirmationStatementFee || 0; 
//      var registerOfficeAmount = registerOfficeFee || 0;
//      var confirmationStatementAmount = confirmationStatementFee || 0;
//      var othersAmount = othersFee || 0;
//      var companyTypeToSend = companyType;
//      var accountAmount = accountFee || 0;
//      var totalAmount = total || 0;
//      var outstandingFee = companyData && typeof companyData.outstanding_fee === 'number' ? companyData.outstanding_fee : 0;
//      var outstandingCurrenYear = typeof companyData?.outstanding_current_year === 'number' ? companyData.outstanding_current_year : 0;
//      var totalOutstanding = typeof companyData?.total_outstanding === 'number' ? companyData.total_outstanding : 0;
//      var oneOffPayment = oneOffPaymentFee || 0;
//      var directDebit = directDebitFee || 0;
//      var createdBy =123;
//      var outstandingYears = [];
//      var outstandingYearsAmount = [];
//      var directDebit = directDebitFee || 0;
   

//     try {
//       // Make the API call to save data
//        // Make the API call to save data
//        const response = await fetch(
//         apiUrl +
//           "?companyNo=" +
//           companyNo +
//           "&uvid=" +
//           uniqueUvid +
//           "&companyName=" +
//           encodeURIComponent(companyName) +
//           "&clientCode=" +
//           clientCode +
//           "&registerOffice=" +
//           encodeURIComponent(registerOffice) +
//           "&uniqueTaxRefNo=" +
//           uniqueTaxRefNo +
//           "&authenticationCode=" +
//           authenticationCode +
//           "&vatNumber=" +
//           vatNumber +
//           "&payeReference=" +
//           payeReference +
//           "&accountOfficeReference=" +
//           encodeURIComponent(accountOfficeReference) +
//           "&gatewayId=" +
//           gatewayId +
//           "&password=" +
//           password +
//           "&directorForename=" +
//           encodeURIComponent(directorForename) +
//           "&directorSurname=" +
//           encodeURIComponent(directorSurname) +
//           "&directorDob=" +
//           directorDob +
//           "&directorHomeAddress=" +
//           encodeURIComponent(directorHomeAddress) +
//           "&directorHomeTelephone=" +
//           directorHomeTelephone +
//           "&directorWorkTelephone=" +
//           directorWorkTelephone +
//           "&directorMobile=" +
//           directorMobile +
//           "&directorEmail=" +
//           directorEmail +
//           "&directorNiNumber=" +
//           directorNiNumber +
//           "&directorUniqueTaxRefNo=" +
//           directorUniqueTaxRefNo +
//           "&directorGatewayId=" +
//           directorGatewayId +
//           "&directorPassword=" +
//           directorPassword +
//           "&IsEngagementAvailable=" + (isEngagementAvailable ? 1 : 0) +
//           "&is64bAvailable=" + (is64bAvailable ? 1 : 0) +
//           "&isAmlAvailable=" + (isAmlAvailable ? 1 : 0) +
//           "&isGdrpAvailable=" + (isGdrpAvailable ? 1 : 0) +
//           "&isIcoAvailable=" + (isIcoAvailable ? 1 : 0) +
//           "&isIdAndProofOfAddressAvailable=" + (isIdAndProofOfAddressAvailable ? 1 : 0) +      
//           "&accountDueDate=" +
//           accountDueDateToSend +
//           "&confirmationStatement=" +
//           confirmationStatementToSend +
//           "&vatQe=" +
//           vatQeToSend +
//           "&payrollAmount=" +
//           payrollAmountToSend +
//           "&pensionAmount=" +
//           pensionAmount +
//           "&taxReturnAmount=" +
//           taxReturnAmount +
//           "&registerOfficeAmount=" +
//           registerOfficeAmount +
//           "&confirmationStatementAmount=" +
//           confirmationStatementAmount +
//           "&othersAmount=" +
//           othersAmount +
//           "&companyType=" +
//           companyType +
//           "&accountAmount=" +
//           accountAmount +
//           "&vatAmount=" + // Add the vatAmount parameter
//           vatFee + // Use the vatFee state variable as the value for vatAmount
//           "&totalAmount=" +
//           totalAmount +
//           "&outstandingFee=" +
//           outstandingFee +
//           "&outstandingCurrenYear=" +
//           outstandingCurrenYear +
//           "&totalOutstanding=" +
//           totalOutstanding +
//           "&oneOffPayment=" +
//           oneOffPayment +
//           "&directDebit=" +
//           directDebit +
//           "&createdBy=" +
//           createdBy +
//           "&outstandingYears=" +
//           outstandingYears +
//           "&outstandingYearsAmount=" +
//           outstandingYearsAmount,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${jwtToken}`,
//           },
//         }
//       );
      
      
//       const data = await response.json();
//       if (data.CODE === 1) {
//         window.alert("Data saved successfully:", data);
//       } else {
//         window.alert("Error saving data:", data.SYSTEM_MESSAGE);
//       }
//     } catch (error) {
//       window.alert("Error saving data:", error);
//     }
//   };

//   function CustomTabPanel(props) {
//     const { children, value, index, ...other } = props;
//     return (
//       <div
//         role="tabpanel"
//         hidden={value !== index}
//         id={`simple-tabpanel-${index}`}
//         aria-labelledby={`simple-tab-${index}`}
//         {...other}
//       >
//         {value === index && (
//           <Box sx={{ p: 3 }}>
//             <Typography>{children}</Typography>
//           </Box>
//         )}
//       </div>
//     );
//   }

//   CustomTabPanel.propTypes = {
//     children: PropTypes.node,
//     index: PropTypes.number.isRequired,
//     value: PropTypes.number.isRequired,
//   };

//   return (
//     <Box sx={{ width: "100%" }}>
//       <Container maxWidth="lg">
//         <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//           <br />
//           <Tabs
//             value={value}
//             onChange={handleChange}
//             aria-label="basic tabs example">
//             <Tab label="Company Information" />
//             <Tab label="Director Information" />
//             <Tab label="Compliance Documents" />
//             <Tab label="Due Dates" />
//             <Tab label="Fee Details" />
//           </Tabs>
//         </Box>
//         <Card style={{ marginTop: "30px" }}>
//           {/* Company No input field */}
//           <TabPanel value={value} index={0}>
//             <Grid container spacing={2}>
//               <Grid item xs={6}>
//                 <TextField
//                   id="company-number"
//                   label="Company No"
//                   type="number"
//                   variant="filled"
//                   fullWidth
//                   onChange={handleCompanyNumberChange}
//                   value={companyNumber}
//                 />
//               </Grid>
//               {/* Other fields populated with company data */}
//               <Grid item xs={6}>
//               <TextField
//   id="client-code"
//   label="Client Code"
//   variant="filled"
//   fullWidth
//   value={companyData?.client_code ? companyData.client_code : ''}
//   InputProps={{
//     readOnly: true,
//   }}
// />

// </Grid>

//               <Grid item xs={6}>
//                 <TextField
//                   id="client-code"
//                   label="Client Code"
//                   variant="filled"
//                   fullWidth
//                   value={companyData?.client_code || 0}
//                   InputProps={{
//                     readOnly: true,
//                   }}
//                 />
//               </Grid>

//               <Grid item xs={6}>
//                 <TextField
//                   id="register-office"
//                   label="Register Office"
//                   variant="filled"
//                   fullWidth
//                   value={
//                     companyData?.registered_office_address?.address_line_1 || ""
//                   }
//                   InputProps={{
//                     readOnly: true,
//                   }}
//                 />
//               </Grid>
             
//               <Grid item xs={6}>
//   <TextField
//     id="unique-tax"
//     label="Unique Tax Reference No"
//     variant="filled"
//     fullWidth
//     value={uniqueTaxRefNo}
//     onChange={(e) => setUniqueTaxRefNo(e.target.value)}
//   />
// </Grid>

//               <Grid item xs={6}>
//                 <TextField
//                   id="authentication-code"
//                   label="Authentication Code"
//                   type="number"
//                   variant="filled"
//                   fullWidth
//                   value={authenticationCode}
//                   onChange={(e) => setAuthenticationCode(e.target.value)}
//                 />
//               </Grid>

//               <Grid item xs={6}>
//                 <TextField
//                   id="employer-paye-reference"
//                   label="Employer PAYE Reference"
//                   type="search"
//                   variant="filled"
//                   fullWidth
//                   value={employerPayeReference}
//                   onChange={(e) => setEmployerPayeReference(e.target.value)}
//                 />
//               </Grid>

//               <Grid item xs={6}>
//                 <TextField
//                   id="gateway-id"
//                   label="Gateway ID"
//                   type="search"
//                   variant="filled"
//                   fullWidth
//                   value={gatewayId}
//                   onChange={(e) => setGatewayId(e.target.value)}
//                 />
//               </Grid>

//               <Grid item xs={6}>
//        <TextField
//         id="account-office-reference"
//         label="Account Office Reference"
//         type="search"
//         variant="filled"
//         fullWidth
//         value={accountOfficeReference}
//         onChange={(e) => setAccountOfficeReference(e.target.value)}
//        />
//      </Grid>

//               <Grid item xs={6}>
//                 <TextField
//                   id="password"
//                   label="Password"
//                   type="password"
//                   variant="filled"
//                   fullWidth
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//               </Grid>

//               <Grid item xs={6}>
//                 <TextField
//                   id="vat-no"
//                   label="VAT No"
//                   type="search"
//                   variant="filled"
//                   fullWidth
//                   value={vatNo}
//                   onChange={(e) => setVatNo(e.target.value)}
//                 />
//               </Grid>
// <Grid item xs={6}>
//   <TextField
//     id="company-type"
//     label="Company Type"
//     type="search"
//     variant="filled"
//     fullWidth
//     value={companyType}
//     onChange={(e) => {
//       const value = e.target.value;
//       // Validate if the value is a valid integer before setting it in the state
//       if (/^\d+$/.test(value) || value === '') {
//         setCompanyType(value);
//       }
//     }}
//   />
// </Grid>
//             </Grid>
//             <br />

//             <Grid item xs={12}>
//               <Button
//                 variant="contained"
//                 onClick={handleNextButtonClick}
//                 disabled={!companyNumberFilled}
//               >
//                 Next
//               </Button>
//             </Grid>
//           </TabPanel>

//           <TabPanel value={value} index={1}>
//             {/* Director Information Tab Content */}
//             <Grid container spacing={2}>
//               <Grid item xs={6}>
//                 <TextField
//                   id="forename"
//                   label="Forename"
//                   variant="filled"
//                   fullWidth
//                   value={directorData.forename || ""}
//                   InputProps={{
//                     readOnly: true,
//                   }}
//                 />
//               </Grid>

//               <Grid item xs={6}>
//                 <TextField
//                   id="surname"
//                   label="Surname"
//                   variant="filled"
//                   fullWidth
//                   value={directorData.surname || ""}
//                   InputProps={{
//                     readOnly: true,
//                   }}
//                 />
//               </Grid>

//               <Grid item xs={6}>
//   <TextField
//     id="director-date-of-birth"
//     label="Date Of Birth"
//     variant="filled"
//     fullWidth
//     value={directorData.date_of_birth || ""}
//     onChange={(event) => {
//       setDirectorData({ ...directorData, date_of_birth: event.target.value });
//     }}
//   />
// </Grid>
//               <Grid item xs={6}>
//                 <TextField
//                   id="director-address"
//                   label="Home Address"
//                   variant="filled"
//                   fullWidth
//                   value={
//                     directorData.address
//                       ? Object.values(directorData.address).join(", ")
//                       : ""
//                   }
//                   InputProps={{
//                     readOnly: true,
//                   }}
//                 />
//               </Grid>

//               <Grid item xs={6}>
//                 <TextField
//                   id="home-telephone"
//                   label="Home Telephone No"
//                   variant="filled"
//                   fullWidth
//                   value={homeTelephone}
//                   onChange={(e) => setHomeTelephone(e.target.value)}
//                 />
//               </Grid>

//               <Grid item xs={6}>
//                 <TextField
//                   id="work-telephone"
//                   label="Work Telephone No"
//                   variant="filled"
//                   fullWidth
//                   value={workTelephone}
//                   onChange={(e) => setWorkTelephone(e.target.value)}
//                 />
//               </Grid>

//               <Grid item xs={6}>
//                 <TextField
//                   id="mobile-no"
//                   label="Mobile No"
//                   variant="filled"
//                   fullWidth
//                   value={mobileNo}
//                   onChange={(e) => setMobileNo(e.target.value)}
//                 />
//               </Grid>

//               <Grid item xs={6}>
//                 <TextField
//                   id="email-address"
//                   label="Email Address"
//                   type="email"
//                   variant="filled"
//                   fullWidth
//                   value={emailAddress}
//                   onChange={(e) => setEmailAddress(e.target.value)}
//                 />
//               </Grid>

//               <Grid item xs={6}>
//                 <TextField
//                   id="ni-no"
//                   label="NI No"
//                   type="search"
//                   variant="filled"
//                   fullWidth
//                   value={niNo}
//                   onChange={(e) => setNiNo(e.target.value)}
//                 />
//               </Grid>

//               <Grid item xs={6}>
//                 <TextField
//                   id="director-gateway-id"
//                   label="Gateway ID"
//                   type="search"
//                   variant="filled"
//                   fullWidth
//                   value={directorGatewayId}
//                   onChange={(e) => setDirectorGatewayId(e.target.value)}
//                 />
//               </Grid>

//               <Grid item xs={6}>
//                 <TextField
//                   id="director-unique-tax-no"
//                   label="Unique Tax No"
//                   type="search"
//                   variant="filled"
//                   fullWidth
//                   value={directorUniqueTaxNo}
//                   onChange={(e) => setDirectorUniqueTaxNo(e.target.value)}
//                 />
//               </Grid>

//               <Grid item xs={6}>
//                 <TextField
//                   id="director-password"
//                   label="Password"
//                   type="search"
//                   variant="filled"
//                   fullWidth
//                   value={directorPassword}
//                   onChange={(e) => setDirectorPassword(e.target.value)}
//                 />
//               </Grid>

//               <br />
//               <Grid item xs={12}>
//                 <Button variant="contained" onClick={handleNextButtonClick}>
//                   Next
//                 </Button>
//               </Grid>
//             </Grid>

           
//           </TabPanel>

//           <CustomTabPanel value={value} index={2}>
//   <Grid container spacing={2}>
//     {/* Compliance Documents */}
//     <Grid item xs={6}>
//       <Typography>Engagement Letter</Typography>
//     </Grid>
//     <Grid item xs={6}>
//       No <Switch color="primary" checked={isEngagementAvailable} onChange={(e) => setIsEngagementAvailable(e.target.checked)} /> Yes
//     </Grid>

//     <Grid item xs={6}>
//       <Typography>64-8</Typography>
//     </Grid>
//     <Grid item xs={6}>
//       No <Switch color="primary" checked={is64bAvailable} onChange={(e) => setIs64bAvailable(e.target.checked)} /> Yes
//     </Grid>

//     <Grid item xs={6}>
//       <Typography>AML</Typography>
//     </Grid>
//     <Grid item xs={6}>
//       No <Switch color="primary" checked={isAmlAvailable} onChange={(e) => setIsAmlAvailable(e.target.checked)} /> Yes
//     </Grid>

//     <Grid item xs={6}>
//       <Typography>GDPR</Typography>
//     </Grid>
//     <Grid item xs={6}>
//       No <Switch color="primary" checked={isGdrpAvailable} onChange={(e) => setIsGdrpAvailable(e.target.checked)} /> Yes
//     </Grid>

//     <Grid item xs={6}>
//       <Typography>ICO</Typography>
//     </Grid>
//     <Grid item xs={6}>
//       No <Switch color="primary" checked={isIcoAvailable} onChange={(e) => setIsIcoAvailable(e.target.checked)} /> Yes
//     </Grid>

//     <Grid item xs={6}>
//       <Typography>ID & Proof of Address</Typography>
//     </Grid>
//     <Grid item xs={6}>
//       No <Switch color="primary" checked={isIdAndProofOfAddressAvailable} onChange={(e) => setIsIdAndProofOfAddressAvailable(e.target.checked)} /> Yes
//     </Grid>
//   </Grid>
//   <Grid item xs={12}>
//     <Button
//       variant="contained"
//       onClick={handleNextButtonClick}
//     >
//       Next
//     </Button>
//   </Grid>
// </CustomTabPanel>


//           <CustomTabPanel value={value} index={3}>
//   <Grid container spacing={3}> {/* Increase spacing between grid items */}
//     {/* Due Dates */}
//     <Grid item xs={12} md={6}> {/* Adjust the width for different screen sizes */}
//       <TextField
//         id="confirmation-statement-due-date"
//         label="Confirmation Statement Due Date"
//         type="date"
//         variant="outlined" 
//         fullWidth
//         value={confirmationStatementDueDate}
//         onChange={(e) => setConfirmationStatementDueDate(e.target.value)}
//         InputLabelProps={{ shrink: true }} 
//       />
//     </Grid>

//     <Grid item xs={12} md={6}>
//       <TextField
//         id="account-due-date"
//         label="Account Due Date"
//         type="date"
//         variant="outlined"
//         fullWidth
//         value={accountDueDate}
//         onChange={(e) => setAccountDueDate(e.target.value)}
//         InputLabelProps={{ shrink: true }}
//       />
//     </Grid>

//     <Grid item xs={12}>
//       <TextField
//         id="vat-qe-due-date"
//         label="VAT Q/E Due Date"
//         type="date"
//         variant="outlined"
//         fullWidth
//         value={vatQeDueDate}
//         onChange={(e) => setVatQeDueDate(e.target.value)}
//         InputLabelProps={{ shrink: true }}
//       />
//     </Grid>
//   </Grid>
//   <Grid item xs={12} style={{ marginTop: '20px' }}> {/* Add some margin above the button */}
//     <Button
//       variant="contained"
//       onClick={handleNextButtonClick}
//     >
//       Next
//     </Button>
//   </Grid>
// </CustomTabPanel>

//           <CustomTabPanel value={value} index={4}>
//             <Grid container spacing={2}>
//               {/* Fee Details */}
//               <Grid item xs={6}>
//                 <TextField
//                   id="account-fee"
//                   label="Account Fee"
//                   variant="filled"
//                   fullWidth
//                   value={accountFee}
//                   onChange={(e) => setAccountFee(e.target.value)}
//                 />
//               </Grid>

//               <Grid item xs={6}>
//                 <TextField
//                   id="vat-fee"
//                   label="VAT Fee"
//                   variant="filled"
//                   fullWidth
//                   value={vatFee}
//                   onChange={(e) => setVatFee(e.target.value)}
//                 />
//               </Grid>

//               <Grid item xs={6}>
//                 <TextField
//                   id="pension-fee"
//                   label="Pension Fee"
//                   variant="filled"
//                   fullWidth
//                   value={pensionFee}
//                   onChange={(e) => setPensionFee(e.target.value)}
//                 />
//               </Grid>

//               <Grid item xs={6}>
//                 <TextField
//                   id="tax-return-fee"
//                   label="Tax Return Fee"
//                   variant="filled"
//                   fullWidth
//                   value={taxReturnFee}
//                   onChange={(e) => setTaxReturnFee(e.target.value)}
//                 />
//               </Grid>

//               <Grid item xs={6}>
//                 <TextField
//                   id="register-office-fee"
//                   label="Register Office Fee"
//                   variant="filled"
//                   fullWidth
//                   value={registerOfficeFee}
//                   onChange={(e) => setRegisterOfficeFee(e.target.value)}
//                 />
//               </Grid>
              

//               <Grid item xs={6}>
//                 <TextField
//                   id="confirmation-statement-fee"
//                   label="Confirmation Statement Fee"
//                   variant="filled"
//                   fullWidth
//                   value={confirmationStatementFee}
//                   onChange={(e) => setConfirmationStatementFee(e.target.value)}
//                 />
//               </Grid>

//               <Grid item xs={6}>
//                 <TextField
//                   id="others-fee"
//                   label="Others Fee"
//                   variant="filled"
//                   fullWidth
//                   value={othersFee}
//                   onChange={(e) => setOthersFee(e.target.value)}
//                 />
//               </Grid>

//               {/* Outstanding Details */}
//               <Grid item xs={12}>
//                 <Typography variant="h6" gutterBottom>
//                   Outstanding Details
//                 </Typography>
//               </Grid>

//               <Grid item xs={6}>
//                 <TextField
//                   id="current-year-fee"
//                   label="Current Year Fee"
//                   variant="filled"
//                   fullWidth
//                   value={currentYearFee}
//                   onChange={(e) => setCurrentYearFee(e.target.value)}
//                 />
//               </Grid>

//               <Grid item xs={6}>
//                 <TextField
//                   id="os-year-end-20-amount"
//                   label="O/S Year End 20 Amount"
//                   variant="filled"
//                   fullWidth
//                   value={osYearEnd20Amount}
//                   onChange={(e) => setOsYearEnd20Amount(e.target.value)}
//                 />
//               </Grid>

//               <Grid item xs={6}>
//                 <TextField
//                   id="total"
//                   label="Total"
//                   variant="filled"
//                   fullWidth
//                   value={total}
//                   onChange={(e) => setTotal(e.target.value)}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">£</InputAdornment>
//                     ),
//                   }}
//                 />
//               </Grid>

//               <Grid item xs={6}>
//                 <TextField
//                   id="one-off-payment-fee"
//                   label="One Off Payment Fee"
//                   variant="filled"
//                   fullWidth
//                   value={oneOffPaymentFee}
//                   onChange={(e) => setOneOffPaymentFee(e.target.value)}
//                 />
//               </Grid>

//               <Grid item xs={6}>
//                 <TextField
//                   id="direct-debit-fee"
//                   label="Direct Debit Fee"
//                   variant="filled"
//                   fullWidth
//                   value={directDebitFee}
//                   onChange={(e) => setDirectDebitFee(e.target.value)}
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={handleSave}
//                 >
//                   Save
//                 </Button>
//               </Grid>
//             </Grid>
//           </CustomTabPanel>
//         </Card>
//       </Container>
//     </Box>
//   );
// }

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// export default NewClient;


import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  InputAdornment,
  Switch,
  Tab,
  Tabs,
  TextField,
  Typography
} from "@mui/material";
import { format } from 'date-fns';
import { getJwtToken } from "./UtlisAuth";
import { isValid } from 'date-fns';

function NewClient() {
  const [value, setValue] = useState(0);
  const [companyData, setCompanyData] = useState(null);
  const [jwtToken, setJwtToken] = useState("");
  const [companyNumber, setCompanyNumber] = useState("");
  const [companyNumberFilled, setCompanyNumberFilled] = useState(false);

  // State variables for user-entered fields
  const [uniqueTaxRefNo, setUniqueTaxRefNo] = useState('');
  const [authenticationCode, setAuthenticationCode] = useState('');
  const [employerPayeReference, setEmployerPayeReference] = useState('');
  const [gatewayId, setGatewayId] = useState('');
  const [accountOfficeReference, setAccountOfficeReference] = useState(''); // Initialize state with an empty string
  const [password, setPassword] = useState("");
  const [vatNo, setVatNo] = useState('');
  const [companyType, setCompanyType] = useState("");
  const [homeTelephone, setHomeTelephone] = useState("");
  const [workTelephone, setWorkTelephone] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [niNo, setNiNo] = useState("");
  const [directorUniqueTaxNo, setDirectorUniqueTaxNo] = useState('');
  const [directorGatewayId, setDirectorGatewayId] = useState('');
  const [directorPassword, setDirectorPassword] = useState("");

  const [isEngagementAvailable, setIsEngagementAvailable] = useState(false);
  const [is64bAvailable, setIs64bAvailable] = useState(false);
  const [isAmlAvailable, setIsAmlAvailable] = useState(false);
  const [isGdrpAvailable, setIsGdrpAvailable] = useState(false);
  const [isIcoAvailable, setIsIcoAvailable] = useState(false);
  const [isIdAndProofOfAddressAvailable, setIsIdAndProofOfAddressAvailable] = useState(false);

  const [confirmationStatementDueDate, setConfirmationStatementDueDate] = useState("");
  const [accountDueDate, setAccountDueDate] = useState("");
  const [vatQeDueDate, setVatQeDueDate] = useState("");
  const [accountFee, setAccountFee] = useState('');
  const [vatFee, setVatFee] = useState('');
  const [pensionFee, setPensionFee] = useState('');
  const [taxReturnFee, setTaxReturnFee] = useState('');
  const [registerOfficeFee, setRegisterOfficeFee] = useState('');
  const [confirmationStatementFee, setConfirmationStatementFee] = useState('');
  const [othersFee, setOthersFee] = useState('');
  const [currentYearFee, setCurrentYearFee] = useState('');
  const [osYearEnd20Amount, setOsYearEnd20Amount] = useState('');
  const [total, setTotal] = useState('');
  const [oneOffPaymentFee, setOneOffPaymentFee] = useState('');
  const [directDebitFee, setDirectDebitFee] = useState('');

  const [directorData, setDirectorData] = useState({
    forename: "",
    surname: "",
    date_of_birth: "",
    address: {},
  });

  useEffect(() => {
    // Set the default tab to "Company Information" (index 0) when the component mounts
    setValue(0);
  }, []); // Empty dependency array to run this effect only once

  useEffect(() => {
    const token = getJwtToken();
    if (token) {
      setJwtToken(token);
    }
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCompanyNumberChange = async (event) => {
    const number = event.target.value;
    setCompanyNumber(number); // Store as a string to preserve leading zeros
    setCompanyNumberFilled(!!number);
    if (!number) {
      setCompanyData(null);
      return;
    }

    const apiUrl = `http://18.197.21.71:8084/ipik/ExternalCompaniesInfo?companyId=${number}`;

    try {
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      const data = await response.json();

      if (data && data.CODE === 1) {
        setCompanyData(data.DATA[0]);
        fetchDirectorData(number);
      } else {
        console.error("Failed to fetch company data");
        setCompanyData(null);
      }
    } catch (error) {
      console.error("Error fetching company data:", error);
      setCompanyData(null);
    }
  };

  const fetchDirectorData = async (number) => {
    const apiUrl = `http://18.197.21.71:8084/ipik/ExternalCompaniesInfoDetail?companyId=${number}`;

    try {
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      const data = await response.json();

      if (data && data.CODE === 1 && data.DATA && data.DATA.length > 0) {
        const director = data.DATA[0].items.find(
          (item) => item.officer_role === "director"
        );

        if (director) {
          const { name, date_of_birth, address } = director;
          const [surname, forename] = name
            .split(",")
            .map((part) => part.trim());

          setDirectorData({
            surname,
            forename,
            date_of_birth: formatDateOfBirth(date_of_birth),
            address,
          });
        } else {
          console.log("Director not found in API data");
        }
      } else {
        console.log("Failed to fetch director data");
      }
    } catch (error) {
      console.log("Error fetching director data:", error);
    }
  };

  const formatDateOfBirth = (date_of_birth) => {
    if (!date_of_birth) return ""; // Handle case where DOB is not provided
    const date = new Date(`${date_of_birth.year}-${date_of_birth.month}`);
    return date.toLocaleDateString(); // Adjust the format as needed
  };

  const handleNextButtonClick = () => {
    // Increment value to move to the next tab
    setValue(value + 1);
  };

  const handleSave = async () => {
    // Check if companyNumber is empty
    if (!companyNumber) {
      console.error("Company number is empty");
      return;
    }
    // Construct the API call
    const apiUrl = `http://18.197.21.71:8084/ipik/CompaniesSave`;

    const min = 1;
    const max = 100000;
    const uniqueUvid = Math.floor(Math.random() * (max - min + 1)) + min;

    var companyNo = companyNumber;
    var companyName = companyData?.company_name || "";
    var clientCode = companyData?.client_code || "";
    var registerOffice = companyData?.registered_office_address?.address_line_1 || "";
    var uniqueTaxRefNo = companyData?.uniqueTaxRefNo || 0;
    var authenticationCode = "";
    var vatNumber = parseInt(vatNo, 10) || 0;
    var payeReference = parseInt(employerPayeReference, 10) || 0;
    var accountOfficeReferenceToSend = accountOfficeReference.trim() !== '' ? accountOfficeReference.trim() : null;
    var gatewayId = 1211;
    var password = "password";
    var directorForename = directorData.forename || "";
    var directorSurname = directorData.surname || "";
    var directorDob = format(new Date(directorData.date_of_birth), 'yyyy-MM-dd');
    var directorHomeAddress = directorData.address ? Object.values(directorData.address).join(", ") : "";
    var directorHomeTelephone = homeTelephone;
    var directorWorkTelephone = workTelephone;
    var directorMobile = mobileNo;
    var directorEmail = emailAddress;
    var directorNiNumber = niNo;
    var directorUniqueTaxRefNo = parseInt(directorUniqueTaxNo, 10) || 0;
    var directorGatewayIdParsed = parseInt(directorGatewayId, 10) || 0;
    var directorPassword = "";
    var IsEngagementAvailable = 1;
    var is64bAvailable = 1;
    var isAmlAvailable = 1;
    var isGdrpAvailable = 1;
    var isIcoAvailable = 1;
    var isIdAndProofOfAddressAvailable = 1;
    const accountDueDateToSend = accountDueDate && isValid(new Date(accountDueDate)) ? format(new Date(accountDueDate), 'yyyy-MM-dd') : null;
    const confirmationStatementToSend = confirmationStatementDueDate && isValid(new Date(confirmationStatementDueDate)) ? format(new Date(confirmationStatementDueDate), 'yyyy-MM-dd') : null;
    const vatQeToSend = vatQeDueDate && isValid(new Date(vatQeDueDate)) ? format(new Date(vatQeDueDate), 'yyyy-MM-dd') : null;
    var pensionAmount = pensionFee || 0;
    var taxReturnAmount = taxReturnFee || 0;
    var registerOfficeAmount = registerOfficeFee || 0;
    var confirmationStatementAmount = confirmationStatementFee || 0;
    var othersAmount = othersFee || 0;
    var companyTypeToSend = companyType;
    var accountAmount = accountFee || 0;
    var totalAmount = total || 0;
    var outstandingFee = companyData && typeof companyData.outstanding_fee === 'number' ? companyData.outstanding_fee : 0;
    var outstandingCurrenYear = typeof companyData?.outstanding_current_year === 'number' ? companyData.outstanding_current_year : 0;
    var totalOutstanding = typeof companyData?.total_outstanding === 'number' ? companyData.total_outstanding : 0;
    var oneOffPayment = oneOffPaymentFee || 0;
    var directDebit = directDebitFee || 0;
    var createdBy = 123;
    var outstandingYears = [];
    var outstandingYearsAmount = [];

    try {
      // Make the API call to save data
      const response = await fetch(
        apiUrl +
        "?companyNo=" +
        companyNo +
        "&uvid=" +
        uniqueUvid +
        "&companyName=" +
        encodeURIComponent(companyName) +
        "&clientCode=" +
        clientCode +
        "&registerOffice=" +
        encodeURIComponent(registerOffice) +
        "&uniqueTaxRefNo=" +
        uniqueTaxRefNo +
        "&authenticationCode=" +
        authenticationCode +
        "&vatNumber=" +
        vatNumber +
        "&payeReference=" +
        payeReference +
        "&accountOfficeReference=" +
        encodeURIComponent(accountOfficeReferenceToSend) +
        "&gatewayId=" +
        gatewayId +
        "&password=" +
        password +
        "&directorForename=" +
        encodeURIComponent(directorForename) +
        "&directorSurname=" +
        encodeURIComponent(directorSurname) +
        "&directorDob=" +
        directorDob +
        "&directorHomeAddress=" +
        encodeURIComponent(directorHomeAddress) +
        "&directorHomeTelephone=" +
        directorHomeTelephone +
        "&directorWorkTelephone=" +
        directorWorkTelephone +
        "&directorMobile=" +
        directorMobile +
        "&directorEmail=" +
        directorEmail +
        "&directorNiNumber=" +
        directorNiNumber +
        "&directorUniqueTaxRefNo=" +
        directorUniqueTaxRefNo +
        "&directorGatewayId=" +
        directorGatewayIdParsed +
        "&directorPassword=" +
        directorPassword +
        "&IsEngagementAvailable=" + (IsEngagementAvailable ? 1 : 0) +
        "&is64bAvailable=" + (is64bAvailable ? 1 : 0) +
        "&isAmlAvailable=" + (isAmlAvailable ? 1 : 0) +
        "&isGdrpAvailable=" + (isGdrpAvailable ? 1 : 0) +
        "&isIcoAvailable=" + (isIcoAvailable ? 1 : 0) +
        "&isIdAndProofOfAddressAvailable=" + (isIdAndProofOfAddressAvailable ? 1 : 0) +
        "&accountDueDate=" +
        accountDueDateToSend +
        "&confirmationStatement=" +
        confirmationStatementToSend +
        "&vatQe=" +
        vatQeToSend +
        "&pensionAmount=" +
        pensionAmount +
        "&taxReturnAmount=" +
        taxReturnAmount +
        "&registerOfficeAmount=" +
        registerOfficeAmount +
        "&confirmationStatementAmount=" +
        confirmationStatementAmount +
        "&othersAmount=" +
        othersAmount +
        "&companyType=" +
        companyTypeToSend +
        "&accountAmount=" +
        accountAmount +
        "&vatAmount=" + // Add the vatAmount parameter
        vatFee + // Use the vatFee state variable as the value for vatAmount
        "&totalAmount=" +
        totalAmount +
        "&outstandingFee=" +
        outstandingFee +
        "&outstandingCurrenYear=" +
        outstandingCurrenYear +
        "&totalOutstanding=" +
        totalOutstanding +
        "&oneOffPayment=" +
        oneOffPayment +
        "&directDebit=" +
        directDebit +
        "&createdBy=" +
        createdBy +
        "&outstandingYears=" +
        outstandingYears +
        "&outstandingYearsAmount=" +
        outstandingYearsAmount,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      const data = await response.json();
      if (data.CODE === 1) {
        window.alert("Data saved successfully:", data);
      } else {
        window.alert("Error saving data:", data.SYSTEM_MESSAGE);
      }
    } catch (error) {
      window.alert("Error saving data:", error);
    }
  };

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Container maxWidth="lg">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <br />
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example">
            <Tab label="Company Information" />
            <Tab label="Director Information" />
            <Tab label="Compliance Documents" />
            <Tab label="Due Dates" />
            <Tab label="Fee Details" />
          </Tabs>
        </Box>
        <Card style={{ marginTop: "30px" }}>
          {/* Company No input field */}
          <CustomTabPanel value={value} index={0}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  id="company-number"
                  label="Company No"
                  type="number"
                  variant="filled"
                  fullWidth
                  onChange={handleCompanyNumberChange}
                  value={companyNumber}
                />
              </Grid>
              {/* Other fields populated with company data */}
              <Grid item xs={6}>
                <TextField
                  id="client-code"
                  label="Client Code"
                  variant="filled"
                  fullWidth
                  value={companyData?.client_code ? companyData.client_code : ''}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="register-office"
                  label="Register Office"
                  variant="filled"
                  fullWidth
                  value={
                    companyData?.registered_office_address?.address_line_1 || ""
                  }
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="unique-tax"
                  label="Unique Tax Reference No"
                  variant="filled"
                  fullWidth
                  value={uniqueTaxRefNo}
                  onChange={(e) => setUniqueTaxRefNo(e.target.value)}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="authentication-code"
                  label="Authentication Code"
                  type="number"
                  variant="filled"
                  fullWidth
                  value={authenticationCode}
                  onChange={(e) => setAuthenticationCode(e.target.value)}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="employer-paye-reference"
                  label="Employer PAYE Reference"
                  type="search"
                  variant="filled"
                  fullWidth
                  value={employerPayeReference}
                  onChange={(e) => setEmployerPayeReference(e.target.value)}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="gateway-id"
                  label="Gateway ID"
                  type="search"
                  variant="filled"
                  fullWidth
                  value={gatewayId}
                  onChange={(e) => setGatewayId(e.target.value)}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="account-office-reference"
                  label="Account Office Reference"
                  type="search"
                  variant="filled"
                  fullWidth
                  value={accountOfficeReference}
                  onChange={(e) => setAccountOfficeReference(e.target.value)}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  variant="filled"
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="vat-no"
                  label="VAT No"
                  type="search"
                  variant="filled"
                  fullWidth
                  value={vatNo}
                  onChange={(e) => setVatNo(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="company-type"
                  label="Company Type"
                  type="search"
                  variant="filled"
                  fullWidth
                  value={companyType}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Validate if the value is a valid integer before setting it in the state
                    if (/^\d+$/.test(value) || value === '') {
                      setCompanyType(value);
                    }
                  }}
                />
              </Grid>
            </Grid>
            <br />

            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={handleNextButtonClick}
                disabled={!companyNumberFilled}
              >
                Next
              </Button>
            </Grid>
          </CustomTabPanel>

          <CustomTabPanel value={value} index={1}>
            {/* Director Information Tab Content */}
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  id="forename"
                  label="Forename"
                  variant="filled"
                  fullWidth
                  value={directorData.forename || ""}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="surname"
                  label="Surname"
                  variant="filled"
                  fullWidth
                  value={directorData.surname || ""}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="director-date-of-birth"
                  label="Date Of Birth"
                  variant="filled"
                  fullWidth
                  value={directorData.date_of_birth || ""}
                  onChange={(event) => {
                    setDirectorData({ ...directorData, date_of_birth: event.target.value });
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="director-address"
                  label="Home Address"
                  variant="filled"
                  fullWidth
                  value={
                    directorData.address
                      ? Object.values(directorData.address).join(", ")
                      : ""
                  }
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="home-telephone"
                  label="Home Telephone No"
                  variant="filled"
                  fullWidth
                  value={homeTelephone}
                  onChange={(e) => setHomeTelephone(e.target.value)}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="work-telephone"
                  label="Work Telephone No"
                  variant="filled"
                  fullWidth
                  value={workTelephone}
                  onChange={(e) => setWorkTelephone(e.target.value)}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="mobile-no"
                  label="Mobile No"
                  variant="filled"
                  fullWidth
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="email-address"
                  label="Email Address"
                  type="email"
                  variant="filled"
                  fullWidth
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="ni-no"
                  label="NI No"
                  type="search"
                  variant="filled"
                  fullWidth
                  value={niNo}
                  onChange={(e) => setNiNo(e.target.value)}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="director-gateway-id"
                  label="Gateway ID"
                  type="search"
                  variant="filled"
                  fullWidth
                  value={directorGatewayId}
                  onChange={(e) => setDirectorGatewayId(e.target.value)}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="director-unique-tax-no"
                  label="Unique Tax No"
                  type="search"
                  variant="filled"
                  fullWidth
                  value={directorUniqueTaxNo}
                  onChange={(e) => setDirectorUniqueTaxNo(e.target.value)}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="director-password"
                  label="Password"
                  type="search"
                  variant="filled"
                  fullWidth
                  value={directorPassword}
                  onChange={(e) => setDirectorPassword(e.target.value)}
                />
              </Grid>

              <br />
              <Grid item xs={12}>
                <Button variant="contained" onClick={handleNextButtonClick}>
                  Next
                </Button>
              </Grid>
            </Grid>
          </CustomTabPanel>

          <CustomTabPanel value={value} index={2}>
            <Grid container spacing={2}>
              {/* Compliance Documents */}
              <Grid item xs={6}>
                <Typography>Engagement Letter</Typography>
              </Grid>
              <Grid item xs={6}>
                No <Switch color="primary" checked={isEngagementAvailable} onChange={(e) => setIsEngagementAvailable(e.target.checked)} /> Yes
              </Grid>

              <Grid item xs={6}>
                <Typography>64-8</Typography>
              </Grid>
              <Grid item xs={6}>
                No <Switch color="primary" checked={is64bAvailable} onChange={(e) => setIs64bAvailable(e.target.checked)} /> Yes
              </Grid>

              <Grid item xs={6}>
                <Typography>AML</Typography>
              </Grid>
              <Grid item xs={6}>
                No <Switch color="primary" checked={isAmlAvailable} onChange={(e) => setIsAmlAvailable(e.target.checked)} /> Yes
              </Grid>

              <Grid item xs={6}>
                <Typography>GDPR</Typography>
              </Grid>
              <Grid item xs={6}>
                No <Switch color="primary" checked={isGdrpAvailable} onChange={(e) => setIsGdrpAvailable(e.target.checked)} /> Yes
              </Grid>

              <Grid item xs={6}>
                <Typography>ICO</Typography>
              </Grid>
              <Grid item xs={6}>
                No <Switch color="primary" checked={isIcoAvailable} onChange={(e) => setIsIcoAvailable(e.target.checked)} /> Yes
              </Grid>

              <Grid item xs={6}>
                <Typography>ID & Proof of Address</Typography>
              </Grid>
              <Grid item xs={6}>
                No <Switch color="primary" checked={isIdAndProofOfAddressAvailable} onChange={(e) => setIsIdAndProofOfAddressAvailable(e.target.checked)} /> Yes
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={handleNextButtonClick}
              >
                Next
              </Button>
            </Grid>
          </CustomTabPanel>

          <CustomTabPanel value={value} index={3}>
            <Grid container spacing={3}>
              {/* Due Dates */}
              <Grid item xs={12} md={6}>
                <TextField
                  id="confirmation-statement-due-date"
                  label="Confirmation Statement Due Date"
                  type="date"
                  variant="outlined"
                  fullWidth
                  value={confirmationStatementDueDate}
                  onChange={(e) => setConfirmationStatementDueDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  id="account-due-date"
                  label="Account Due Date"
                  type="date"
                  variant="outlined"
                  fullWidth
                  value={accountDueDate}
                  onChange={(e) => setAccountDueDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="vat-qe-due-date"
                  label="VAT Q/E Due Date"
                  type="date"
                  variant="outlined"
                  fullWidth
                  value={vatQeDueDate}
                  onChange={(e) => setVatQeDueDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} style={{ marginTop: '20px' }}>
              <Button
                variant="contained"
                onClick={handleNextButtonClick}
              >
                Next
              </Button>
            </Grid>
          </CustomTabPanel>

          <CustomTabPanel value={value} index={4}>
            <Grid container spacing={2}>
              {/* Fee Details */}
              <Grid item xs={6}>
                <TextField
                  id="account-fee"
                  label="Account Fee"
                  variant="filled"
                  fullWidth
                  value={accountFee}
                  onChange={(e) => setAccountFee(e.target.value)}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="vat-fee"
                  label="VAT Fee"
                  variant="filled"
                  fullWidth
                  value={vatFee}
                  onChange={(e) => setVatFee(e.target.value)}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="pension-fee"
                  label="Pension Fee"
                  variant="filled"
                  fullWidth
                  value={pensionFee}
                  onChange={(e) => setPensionFee(e.target.value)}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="tax-return-fee"
                  label="Tax Return Fee"
                  variant="filled"
                  fullWidth
                  value={taxReturnFee}
                  onChange={(e) => setTaxReturnFee(e.target.value)}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="register-office-fee"
                  label="Register Office Fee"
                  variant="filled"
                  fullWidth
                  value={registerOfficeFee}
                  onChange={(e) => setRegisterOfficeFee(e.target.value)}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="confirmation-statement-fee"
                  label="Confirmation Statement Fee"
                  variant="filled"
                  fullWidth
                  value={confirmationStatementFee}
                  onChange={(e) => setConfirmationStatementFee(e.target.value)}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="others-fee"
                  label="Others Fee"
                  variant="filled"
                  fullWidth
                  value={othersFee}
                  onChange={(e) => setOthersFee(e.target.value)}
                />
              </Grid>

              {/* Outstanding Details */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Outstanding Details
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="current-year-fee"
                  label="Current Year Fee"
                  variant="filled"
                  fullWidth
                  value={currentYearFee}
                  onChange={(e) => setCurrentYearFee(e.target.value)}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="os-year-end-20-amount"
                  label="O/S Year End 20 Amount"
                  variant="filled"
                  fullWidth
                  value={osYearEnd20Amount}
                  onChange={(e) => setOsYearEnd20Amount(e.target.value)}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="total"
                  label="Total"
                  variant="filled"
                  fullWidth
                  value={total}
                  onChange={(e) => setTotal(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">£</InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="one-off-payment-fee"
                  label="One Off Payment Fee"
                  variant="filled"
                  fullWidth
                  value={oneOffPaymentFee}
                  onChange={(e) => setOneOffPaymentFee(e.target.value)}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="direct-debit-fee"
                  label="Direct Debit Fee"
                  variant="filled"
                  fullWidth
                  value={directDebitFee}
                  onChange={(e) => setDirectDebitFee(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </CustomTabPanel>
        </Card>
      </Container>
    </Box>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default NewClient;
