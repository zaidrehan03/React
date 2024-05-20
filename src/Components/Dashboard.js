// import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
// import {
//   Box,
//   Container,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Tabs,
//   Tab,
//   tableCellClasses,
//   Snackbar,
//   IconButton,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import { getJwtToken } from "./UtlisAuth";
// import DeleteIcon from "@mui/icons-material/Delete";
// import ReceiptIcon from "@mui/icons-material/Receipt";
// import { Link } from "react-router-dom";
// import "../Styles/Login.css";
// import Sidebar from "./Sidebar"; // Import Sidebar component

// function CustomTabPanel(props) {
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

// CustomTabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: "#78909c",
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

// export default function Dashboard() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [value, setValue] = useState(0);
//   const [activeCompanies, setActiveCompanies] = useState([]);
//   const [nonActiveCompanies, setNonActiveCompanies] = useState([]);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [snackbarOpen, setSnackbarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   useEffect(() => {
//     fetchCompanies();
//   }, []);

//   const fetchCompanies = async () => {
//     try {
//       const token = getJwtToken();
//       const activeResponse = await fetch(
//         "http://18.197.21.71:8084/ipik/CompaniesList",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (!activeResponse.ok) {
//         throw new Error("Failed to fetch active companies data");
//       }

//       const activeData = await activeResponse.json();
//       console.log("Active Companies List:", activeData.DATA);
//       setActiveCompanies(activeData.DATA);

//       const nonActiveResponse = await fetch(
//         "http://18.197.21.71:8084/ipik/CompaniesListNonActive",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (!nonActiveResponse.ok) {
//         throw new Error("Failed to fetch non-active companies data");
//       }

//       const nonActiveData = await nonActiveResponse.json();
//       console.log("Non-Active Companies List:", nonActiveData.DATA);
//       setNonActiveCompanies(nonActiveData.DATA);
//     } catch (error) {
//       console.error("Error fetching companies:", error);
//     }
//   };

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const markCompanyInactive = async (companyId) => {
//     try {
//       const token = getJwtToken();
//       const response = await fetch(
//         `http://18.197.21.71:8084/ipik/MarkCompanyInactive?companyId=${companyId}`,
//         {
//           method: "PUT",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to mark company as inactive");
//       }

//       setSnackbarMessage("Company marked as inactive");
//       setSnackbarOpen(true);

//       // Fetch the updated company lists
//       await fetchCompanies();
//     } catch (error) {
//       console.error("Error marking company as inactive:", error);
//     }
//   };

//   const handleSnackbarClose = (event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }
//     setSnackbarOpen(false);
//   };

//   const a11yProps = (index) => {
//     return {
//       id: `simple-tab-${index}`,
//       "aria-controls": `simple-tabpanel-${index}`,
//     };
//   };

//   const handleDelete = async (companyId) => {
//     try {
//       const token = getJwtToken();
//       const response = await fetch(
//         `http://18.197.21.71:8084/ipik/MarkCompanyDeleted?companyId=${companyId}`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to delete company");
//       }

//       setSnackbarMessage("Company deleted successfully");
//       setSnackbarOpen(true);

//       // Fetch the updated company lists
//       await fetchCompanies();
//     } catch (error) {
//       console.error("Error deleting company:", error);
//     }
//   };

//   return (
//     <Box sx={{ flexGrow: 1, marginLeft: sidebarOpen ? "30vh" : 0 }}>
//       <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
//       <Container>
//         <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//           <br />
//           <Tabs
//             value={value}
//             onChange={handleChange}
//             aria-label="basic tabs example"
//           >
//             <Tab label="Active Company List" {...a11yProps(0)} />
//             <Tab label="Non Active Company List" {...a11yProps(1)} />
//           </Tabs>
//         </Box>

//         <CustomTabPanel value={value} index={0}>
//           <TableContainer component={Paper}>
//             <Table sx={{ minWidth: 700 }} aria-label="customized table">

//               <TableHead>
//                 <TableRow style={{ whiteSpace: "nowrap", textAlign: "center" }}>
//                   <StyledTableCell>Client Code</StyledTableCell>
//                   <StyledTableCell>Company Name</StyledTableCell>
//                   <StyledTableCell>Company No</StyledTableCell>
//                   <StyledTableCell>Reg Office</StyledTableCell>
//                   <StyledTableCell>Director</StyledTableCell>
//                   <StyledTableCell>Account Due Date</StyledTableCell>
//                   <StyledTableCell>Conf.statement</StyledTableCell>
//                   <StyledTableCell>Vat Q/E Date</StyledTableCell>
//                   <StyledTableCell>Action</StyledTableCell>
//                 </TableRow>
//               </TableHead>

//               <TableBody>
//                 {activeCompanies.map((company) => (
//                   <StyledTableRow key={company.id}>
//                     <StyledTableCell>{company.client_code}</StyledTableCell>
//                     <StyledTableCell>{company.company_name}</StyledTableCell>
//                     <StyledTableCell>{company.company_no}</StyledTableCell>
//                     <StyledTableCell>{company.register_office}</StyledTableCell>
//                     <StyledTableCell>
//                       {company.director_forename}
//                     </StyledTableCell>
//                     <StyledTableCell>
//                       {company.accounts_due_date}
//                     </StyledTableCell>
//                     <StyledTableCell>
//                       {company.confirmation_statement}
//                     </StyledTableCell>
//                     <StyledTableCell>{company.vat_qe}</StyledTableCell>
//                     <StyledTableCell
//                       style={{
//                         display: "flex",
//                         justifyContent: "center",
//                         alignItems: "center",
//                       }}
//                     >
//                       <div style={{ marginRight: "10px" }}>

//                         <Link
//                           to={`/invoice-list?companyName=${encodeURIComponent(
//                             company.company_name
//                           )}&directorHomeAddress=${encodeURIComponent( 
//                             company.register_office
//                           )}&invoiceId=${company.invoiceId} `}
//                           style={{ textDecoration: "none" }}
//                           state={{ flag: false }}
//                         >
//                           <IconButton
//                             aria-label="invoice"
//                             style={{ color: "#1976d2" }}
//                           >
//                             <ReceiptIcon />
//                           </IconButton>
//                         </Link>

//                       </div>
//                       <div>
//                         <IconButton
//                           color="error"
//                           aria-label="delete"
//                           onClick={() => markCompanyInactive(company.id)}
//                         >
//                           <DeleteIcon />
//                         </IconButton>
//                       </div>
//                     </StyledTableCell>
//                   </StyledTableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </CustomTabPanel>

//         <CustomTabPanel value={value} index={1}>
//           <TableContainer component={Paper}>
//             <Table sx={{ minWidth: 700 }} aria-label="customized table">
//               <TableHead>
//                 <TableRow style={{ whiteSpace: "nowrap" }}>
//                   <StyledTableCell>Client Code</StyledTableCell>
//                   <StyledTableCell>Company Name</StyledTableCell>
//                   <StyledTableCell>Company No</StyledTableCell>
//                   <StyledTableCell>Reg Office</StyledTableCell>
//                   <StyledTableCell>Director</StyledTableCell>
//                   <StyledTableCell>Account Due Date</StyledTableCell>
//                   <StyledTableCell>Conf.statement</StyledTableCell>
//                   <StyledTableCell>Vat Q/E Date</StyledTableCell>
//                   <StyledTableCell>Action</StyledTableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {nonActiveCompanies.map((company) => (
//                   <StyledTableRow key={company.id}>
//                     <StyledTableCell>{company.client_code}</StyledTableCell>
//                     <StyledTableCell>{company.company_name}</StyledTableCell>
//                     <StyledTableCell>{company.company_no}</StyledTableCell>
//                     <StyledTableCell>{company.register_office}</StyledTableCell>
//                     <StyledTableCell>
//                       {company.director_forename}
//                     </StyledTableCell>
//                     <StyledTableCell>
//                       {company.accounts_due_date}
//                     </StyledTableCell>
//                     <StyledTableCell>
//                       {company.confirmation_statement}
//                     </StyledTableCell>
//                     <StyledTableCell>{company.vat_qe}</StyledTableCell>
//                     <StyledTableCell>
//                       <IconButton
//                         color="error"
//                         aria-label="delete"
//                         onClick={() => handleDelete(company.id)}
//                       >
//                         <DeleteIcon />
//                       </IconButton>
//                     </StyledTableCell>
//                   </StyledTableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </CustomTabPanel>
//       </Container>

//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={handleSnackbarClose}
//         message={snackbarMessage}
//       />
//     </Box>
//   );
// }


import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  tableCellClasses,
  Snackbar,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { getJwtToken } from "./UtlisAuth";
import DeleteIcon from "@mui/icons-material/Delete";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { Link } from "react-router-dom";
import "../Styles/Login.css";
import Sidebar from "./Sidebar"; // Import Sidebar component

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#78909c",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [activeCompanies, setActiveCompanies] = useState([]);
  const [nonActiveCompanies, setNonActiveCompanies] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const token = getJwtToken();
      const activeResponse = await fetch(
        "https://18.197.21.71:8084/ipik/CompaniesList",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!activeResponse.ok) {
        throw new Error("Failed to fetch active companies data");
      }

      const activeData = await activeResponse.json();
      console.log("Active Companies List:", activeData.DATA);
      setActiveCompanies(activeData.DATA);

      const nonActiveResponse = await fetch(
        "https://18.197.21.71:8084/ipik/CompaniesListNonActive",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!nonActiveResponse.ok) {
        throw new Error("Failed to fetch non-active companies data");
      }

      const nonActiveData = await nonActiveResponse.json();
      console.log("Non-Active Companies List:", nonActiveData.DATA);
      setNonActiveCompanies(nonActiveData.DATA);
    } catch (error) {
      console.error("Error fetching companies:", error);
      setSnackbarMessage(error.message);
      setSnackbarOpen(true);
    }
  };

  const handleChange = (event, newValue) => {
    console.log("Tab changed to:", newValue); // Debug log
    setValue(newValue);
  };

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };

  const markCompanyInactive = async (companyId) => {
    try {
      const token = getJwtToken();
      const response = await fetch(
        `https://18.197.21.71:8084/ipik/MarkCompanyInactive?companyId=${companyId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to mark company as inactive");
      }

      setSnackbarMessage("Company marked as inactive");
      setSnackbarOpen(true);

      // Fetch the updated company lists
      await fetchCompanies();
    } catch (error) {
      console.error("Error marking company as inactive:", error);
      setSnackbarMessage(error.message);
      setSnackbarOpen(true);
    }
  };

  const handleDelete = async (companyId) => {
    try {
      const token = getJwtToken();
      const response = await fetch(
        `https://18.197.21.71:8084/ipik/MarkCompanyDeleted?companyId=${companyId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete company");
      }

      setSnackbarMessage("Company deleted successfully");
      setSnackbarOpen(true);

      // Fetch the updated company lists
      await fetchCompanies();
    } catch (error) {
      console.error("Error deleting company:", error);
      setSnackbarMessage(error.message);
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1, marginLeft: sidebarOpen ? "30vh" : 0 }}>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <Container>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <br />
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Active Company List" {...a11yProps(0)} />
            <Tab label="Non Active Company List" {...a11yProps(1)} />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          {/* Active companies table */}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                  <StyledTableCell>Client Code</StyledTableCell>
                  <StyledTableCell>Company Name</StyledTableCell>
                  <StyledTableCell>Company No</StyledTableCell>
                  <StyledTableCell>Reg Office</StyledTableCell>
                  <StyledTableCell>Director</StyledTableCell>
                  <StyledTableCell>Account Due Date</StyledTableCell>
                  <StyledTableCell>Conf.statement</StyledTableCell>
                  <StyledTableCell>Vat Q/E Date</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activeCompanies.map((company) => (
                  <StyledTableRow key={company.id}>
                    <StyledTableCell>{company.client_code}</StyledTableCell>
                    <StyledTableCell>{company.company_name}</StyledTableCell>
                    <StyledTableCell>{company.company_no}</StyledTableCell>
                    <StyledTableCell>{company.register_office}</StyledTableCell>
                    <StyledTableCell>{company.director_forename}</StyledTableCell>
                    <StyledTableCell>{company.accounts_due_date}</StyledTableCell>
                    <StyledTableCell>{company.confirmation_statement}</StyledTableCell>
                    <StyledTableCell>{company.vat_qe}</StyledTableCell>
                    <StyledTableCell style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}>
                      <div style={{ marginRight: "10px" }}>
                        <Link to={`/invoice-list?companyName=${encodeURIComponent(
                          company.company_name
                        )}&directorHomeAddress=${encodeURIComponent(
                          company.register_office
                        )}&invoiceId=${company.invoiceId}`} style={{ textDecoration: "none" }}
                          state={{ flag: false }}>
                          <IconButton aria-label="invoice" style={{ color: "#1976d2" }}>
                            <ReceiptIcon />
                          </IconButton>
                        </Link>
                      </div>
                      <div>
                        <IconButton color="error" aria-label="delete" onClick={() => markCompanyInactive(company.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          {/* Non-active companies table */}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow style={{ whiteSpace: "nowrap" }}>
                  <StyledTableCell>Client Code</StyledTableCell>
                  <StyledTableCell>Company Name</StyledTableCell>
                  <StyledTableCell>Company No</StyledTableCell>
                  <StyledTableCell>Reg Office</StyledTableCell>
                  <StyledTableCell>Director</StyledTableCell>
                  <StyledTableCell>Account Due Date</StyledTableCell>
                  <StyledTableCell>Conf.statement</StyledTableCell>
                  <StyledTableCell>Vat Q/E Date</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {nonActiveCompanies.map((company) => (
                  <StyledTableRow key={company.id}>
                    <StyledTableCell>{company.client_code}</StyledTableCell>
                    <StyledTableCell>{company.company_name}</StyledTableCell>
                    <StyledTableCell>{company.company_no}</StyledTableCell>
                    <StyledTableCell>{company.register_office}</StyledTableCell>
                    <StyledTableCell>{company.director_forename}</StyledTableCell>
                    <StyledTableCell>{company.accounts_due_date}</StyledTableCell>
                    <StyledTableCell>{company.confirmation_statement}</StyledTableCell>
                    <StyledTableCell>{company.vat_qe}</StyledTableCell>
                    <StyledTableCell>
                      <IconButton color="error" aria-label="delete" onClick={() => handleDelete(company.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CustomTabPanel>
      </Container>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Box>
  );
}
