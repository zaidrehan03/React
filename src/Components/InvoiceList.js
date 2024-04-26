import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Snackbar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { getJwtToken } from "./UtlisAuth";

function InvoiceList() {
  const [invoices, setInvoices] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvoices = async () => {
      const jwtToken = getJwtToken();
      try {
        const response = await fetch(
          "http://18.197.21.71:8084/ipik/InvoicesList",
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch invoices");
        }
        const data = await response.json();

        setInvoices(
          data.DATA.map((invoice) => ({
            invoiceId: invoice.id,
            clientCode: invoice.client_code,
            companyName: invoice.company_label,
            creationDate: invoice.created_on,
            bankName: invoice.bank_name || "N/A",
            totalAmount: invoice.total_amount,
            netAmount: invoice.net_amount,
          }))
        );
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    fetchInvoices();
  }, []);

  return (
    <>
   
   <div style={{ marginTop: '31px' , marginLeft: '31px', marginRight: '31px' }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Invoice ID</TableCell>
              <TableCell>Client Code</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>Creation Date</TableCell>
              <TableCell>Bank Name</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Actions</TableCell> {/* New column for actions */}
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.invoiceId}>
                <TableCell>{invoice.invoiceId}</TableCell>
                <TableCell>{invoice.clientCode}</TableCell>
                <TableCell>{invoice.companyName}</TableCell>
                <TableCell>{invoice.creationDate}</TableCell>
                <TableCell>{invoice.bankName}</TableCell>
                <TableCell>{invoice.totalAmount}</TableCell>
                <TableCell>
                  <Link
                    to={{
                      pathname: "/InvoiceForm", // Update with the correct pathname for the edit page
                      state: { invoiceId: invoice.invoiceId },
                    }}
                    style={{ textDecoration: "none" }} // Adjust styles as needed
                  >
                    <Button variant="outlined" color="primary">
                      Edit
                    </Button>
                  </Link>
                  {/* <Link
                    to={{
                      pathname: "/PdfView",
                      state: invoice.invoiceId,
                    }}
                    style={{ textDecoration: "none" }} // Adjust styles as needed
                  > */}
                  <Button
                    onClick={() =>
                      navigate("/PdfView", {
                        state: { invoice: invoice.invoiceId },
                      })
                    }
                    variant="outlined"
                    color="primary"
                  >
                    View
                  </Button>
                  {/* </Link> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
      </div>
    </>
  );
}

export default InvoiceList;

// import React, { useState, useEffect } from "react";
// import { useLocation, useSearchParams, Link } from "react-router-dom";
// import {
//   TextField,
//   Button,
//   Paper,
//   Grid,
//   IconButton,
//   Switch,
//   FormControlLabel,
//   TableContainer,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   Snackbar,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { format } from "date-fns";
// import TablePagination from "@mui/material/TablePagination";
// import { getJwtToken } from "./UtlisAuth";

// function generateUniqueId() {
//   return Math.floor(1000 + Math.random() * 9000);
// }

// const InvoiceList = () => {
//   const [invoiceInfo, setInvoiceInfo] = useState({
//     invoiceId: null,
//     customer: "",
//     invoiceTo: "",
//     invoiceDate: new Date().toISOString().split("T")[0],
//     applyTax: false,
//     bankName: "The Royal Bank of Scotland",
//     sortCode: "160042",
//     accountNo: "00636754",
//     items: [],
//   });

//   // Function to handle editing an invoice
//   const handleEdit = (invoice) => {
//     setInvoiceInfo({
//       ...invoiceInfo,
//       customer: invoice.client_code || "",
//       invoiceTo: invoice.bill_to_address || "",
//       invoiceDate: invoice.invoice_date || "",
//       applyTax: parseFloat(invoice.tax_amount?.replace(',', '')) !== 0 || false,
//       bankName: invoice.bank_name || "The Royal Bank of Scotland",
//       sortCode: invoice.bank_sort_code || "160042",
//       accountNo: invoice.bank_account_no || "00636754",
//       items: (invoice.invoice_details || []).map((detail) => ({
//         amount: detail.amount,
//         description: detail.description_label,
//         remarks: detail.remarks,
//       })),
//     });
//   };

//   // Hook to access current location
//   const location = useLocation();

//   // Hook to access search parameters from the URL
//   const [searchParams] = useSearchParams();
//   const companyName = searchParams.get("companyName");
//   const directorHomeAddress = searchParams.get("directorHomeAddress");

//   // State variables for storing description options, snackbar message, and open state
//   const [descriptionOptions, setDescriptionOptions] = useState([]);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");

//   // Effect to fetch description options for the select dropdown in the form
//   useEffect(() => {
//     const fetchDescriptions = async () => {
//       const jwtToken = getJwtToken();
//       try {
//         const response = await fetch(
//           "http://18.197.21.71:8084/ipik/DescriptionList",
//           {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${jwtToken}`,
//             },
//           }
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch descriptions");
//         }
//         const data = await response.json();
//         setDescriptionOptions(data.DATA);
//       } catch (error) {
//         console.error("Error fetching descriptions:", error);
//       }
//     };

//     fetchDescriptions();
//   }, []);

//   // State for storing total amounts
//   const [totals, setTotals] = useState({
//     subtotal: 0,
//     total: 0,
//     feeAgreed: 0,
//   });

//   // Function to update totals based on items
//   const updateTotals = (newItems) => {
//     const subtotal = newItems.reduce(
//       (acc, item) => acc + Number(item.amount),
//       0
//     );

//     const total = invoiceInfo.applyTax ? subtotal * 1.2 : subtotal;
//     setTotals({ ...totals, subtotal, total });
//   };

//   // State for storing individual items in the invoice
//   const [items, setItems] = useState([
//     { description: "", remarks: "", amount: "" },
//   ]);
//   const [tableItems, setTableItems] = useState([]);

//   // Function to handle input change in the main invoice form
//   const handleInputChange = (event) => {
//     const { name, value, type, checked } = event.target;
//     setInvoiceInfo({
//       ...invoiceInfo,
//       [name]: type === "checkbox" ? checked : value,
//     });
//     if (name === "applyTax") {
//       updateTotals(tableItems);
//     }
//   };

//   // Function to handle change in individual item fields
//   const handleItemChange = (index, field, value) => {
//     const newItems = [...items];
//     newItems[index][field] = value;
//     setItems(newItems);
//   };

//   // Function to add item to the table
//   const handleAddItemToTable = () => {
//     const anyFieldEmpty = items.some(
//       (item) => !item.description && !item.remarks && !item.amount
//     );
//     if (anyFieldEmpty) {
//       setSnackbarMessage(
//         "Please fill at least one field before adding an item."
//       );
//       setSnackbarOpen(true);
//     } else {
//       const newTableItems = [
//         ...tableItems,
//         { ...items[0], id: generateUniqueId() },
//       ];
//       setTableItems(newTableItems);
//       setItems([{ description: "", remarks: "", amount: "" }]);
//       updateTotals(newTableItems);
//     }
//   };

//   // Function to delete item from the table
//   const handleDeleteItemFromTable = (id) => {
//     const newTableItems = tableItems.filter((item) => item.id !== id);
//     setTableItems(newTableItems);
//     updateTotals(newTableItems);
//   };

// // Function to save the invoice
//   const saveInvoice = async () => {
//   const jwtToken = getJwtToken();
//   const isUpdating = invoiceInfo.invoiceId && invoiceInfo.invoiceId > 0;
//   const invoiceData = {
//     createdBy: 123,
//     invoiceNo: 1,
//     invoiceId: isUpdating ? invoiceInfo.invoiceId : 0,
//     taxAmount: invoiceInfo.applyTax ? totals.subtotal * 0.2 : 0,
//     netAmount: totals.total,
//     invoiceDate: invoiceInfo.invoiceDate,
//     companyId: 93,
//     billToAddress: invoiceInfo.invoiceTo,
//     companyPoNo: "companyPoNo",
//     termsId: 1,
//     termsDays: 20,
//     salespersonName: "salespersonName",
//     totalAmount: totals.subtotal,
//     uvid: generateUniqueId(),
//     invoiceDescriptionId: items.map((item) => item.descriptionId),
//     invoiceRemarks: items.map((item) => item.remarks),
//     invoiceQuantity: items.map((item) => item.quantity),
//     invoicePrice: items.map((item) => item.price),
//     invoiceAmount: items.map((item) => item.amount),
//   };

//   const queryParams = new URLSearchParams(invoiceData).toString();
//   const url = `http://18.197.21.71:8084/ipik/InvoiceSave?${queryParams}`;

//   try {
//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${jwtToken}`,
//       },
//     });
//     if (!response.ok) {
//       throw new Error("Failed to save invoice");
//     }
//     setSnackbarMessage(
//       isUpdating
//         ? "Invoice updated successfully"
//         : "Invoice saved successfully"
//     );
//     setSnackbarOpen(true);
//   } catch (error) {
//     console.error("Error saving invoice:", error);
//     setSnackbarMessage("Failed to save invoice");
//     setSnackbarOpen(true);
//   }
// };

// // Function to close the snackbar
// const handleCloseSnackbar = () => {
//   setSnackbarOpen(false);
// };

// // State to store the list of invoices
// const [invoices, setInvoices] = useState([]);

// // Effect to fetch invoices from the backend
// useEffect(() => {
//   const fetchInvoices = async () => {
//     const jwtToken = getJwtToken();
//     try {
//       const response = await fetch(
//         "http://18.197.21.71:8084/ipik/InvoicesList",
//         {
//           headers: {
//             Authorization: `Bearer ${jwtToken}`,
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to fetch invoices");
//       }
//       const data = await response.json();

//       // Process and set the fetched invoice data to state
//       setInvoices(
//         data.DATA.map((invoice) => ({
//           invoiceId: invoice.id,
//           clientCode: invoice.client_code,
//           companyName: invoice.company_label,
//           creationDate: invoice.created_on,
//           bankName: invoice.bank_name || "N/A",
//           invoiceDate: invoice.invoice_date,
//           totalAmount: invoice.total_amount,
//           netAmount: invoice.net_amount,
//         }))
//       );
//     } catch (error) {
//       console.error("Error fetching invoices:", error);
//     }
//   };

//   fetchInvoices();
// }, [location.state]);

// // State variables for pagination
// const isAccessedFromNavbar = searchParams.get("from") === "navbar";
// const [page, setPage] = useState(0);
// const [rowsPerPage, setRowsPerPage] = useState(5);

// // Function to handle change in page
// const handleChangePage = (event, newPage) => {
//   setPage(newPage);
// };

// // Function to handle change in rows per page
// const handleChangeRowsPerPage = (event) => {
//   setRowsPerPage(parseInt(event.target.value, 10));
//   setPage(0);
// };

//   // JSX structure for rendering the component
//   return (
//     <Grid
//       container
//       spacing={3}
//       sx={{ backgroundColor: "#fff", padding: "20px" }}
//     >
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//         message={snackbarMessage}
//       />
//       {isAccessedFromNavbar ? (
//         <Grid item xs={12}>
//           <TableContainer component={Paper}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Invoice ID</TableCell>
//                   <TableCell>Client Code</TableCell>
//                   <TableCell>Company Name</TableCell>
//                   <TableCell>Creation Date</TableCell>
//                   <TableCell>Bank Name</TableCell>
//                   <TableCell>Action</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {invoices
//                   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                   .map((invoice) => (
//                     <TableRow key={invoice.invoiceId}>
//                       <TableCell>{invoice.invoiceId}</TableCell>
//                       <TableCell>{invoice.clientCode}</TableCell>
//                       <TableCell>{invoice.companyName}</TableCell>
//                       <TableCell>{invoice.creationDate}</TableCell>
//                       <TableCell>{invoice.bankName}</TableCell>
//                       <TableCell>{invoice.totalAmount}</TableCell>
//                       <TableCell>
//                       <div>
//       <h1>Component 1</h1>
//       {/* <Link to={{ pathname: '/InvoiceForm', state: { data: dataToSend } }}>Go to Component 2</Link> */}

//       <Link
//   to={{
//     pathname: '/InvoiceForm',
//     state: {
//       data: invoiceInfo, // Pass the invoiceInfo state
//       flag: true // Indicate that the data is coming from the list component
//     }
//   }}
// >
//  Edit
// </Link>

//                         </div>
//                         <Link
//   to={{
//     pathname: '/PdfView',
//     state: { invoiceId: invoice.invoiceId },
//   }}
//   style={{ textDecoration: 'none' }} // Adjust styles as needed
// >
//   <Button variant="outlined" color="primary" onClick={() => console.log("Invoice ID:", invoice.invoiceId)}>
//     View
//   </Button>
// </Link>

//                       </TableCell>
//                     </TableRow>
//                   ))}
//               </TableBody>
//             </Table>
//             <TablePagination
//               rowsPerPageOptions={[5, 10, 25, 50]}
//               component="div"
//               count={invoices.length}
//               rowsPerPage={rowsPerPage}
//               page={page}
//               onPageChange={handleChangePage}
//               onRowsPerPageChange={handleChangeRowsPerPage}
//             />
//           </TableContainer>
//         </Grid>
//       ) : (
//         <>
//           <Grid item xs={12} md={6}>
//             <Paper elevation={3} sx={{ padding: "20px", marginBottom: "25px" }}>
//               <h2>Invoice</h2>
//               <TextField
//                 name="customer"
//                 label="Customer"
//                 variant="outlined"
//                 fullWidth
//                 value={
//                   location.state.flag === true
//                     ? location.state.invoice.companyName
//                     : invoiceInfo.customer
//                 }
//                 onChange={handleInputChange}
//                 sx={{ marginBottom: "20px" }}
//                 InputLabelProps={{ shrink: true }} // Add this line
//               />
//               <TextField
//                 name="invoiceTo"
//                 label="Invoice To"
//                 variant="outlined"
//                 fullWidth
//                 value={
//                   location.state.flag === true
//                     ? location.state.invoice.clientCode
//                     : invoiceInfo.invoiceTo
//                 }
//                 onChange={handleInputChange}
//                 sx={{ marginBottom: "20px" }}
//                 InputLabelProps={{ shrink: true }} // Add this line
//               />
//               <TextField
//                 name="invoiceDate"
//                 label="Invoice Date"
//                 type="date"
//                 variant="outlined"
//                 fullWidth
//                 // value={
//                 //   location.state.flag === true
//                 //     ? location.state.invoice.invoice_date
//                 //     : invoiceInfo.invoiceDate
//                 // }
//                 value={invoiceInfo.invoiceDate}
//                 onChange={handleInputChange}
//                 sx={{ marginBottom: "20px" }}
//                 InputLabelProps={{ shrink: true }}
//               />

//               <FormControlLabel
//                 control={
//                   <Switch
//                     checked={invoiceInfo.applyTax}
//                     onChange={handleInputChange}
//                     name="applyTax"
//                   />
//                 }
//                 label="Apply Tax"
//               />
//             </Paper>
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <Paper elevation={3} sx={{ padding: "20px", height: "84%" }}>
//               <h2>Bank Details</h2>
//               <TextField
//                 name="bankName"
//                 label="Bank Name"
//                 variant="outlined"
//                 fullWidth
//                 value={
//                   location.state.flag === true
//                     ? location.state.bankName
//                     : invoiceInfo.bankName
//                 }
//                 // value={invoiceInfo.bankName}
//                 onChange={handleInputChange}
//                 sx={{ marginBottom: "20px" }}
//                 InputLabelProps={{ shrink: true }} // Add this line
//               />
//               <TextField
//                 name="sortCode"
//                 label="Sort Code"
//                 variant="outlined"
//                 fullWidth
//                 value={invoiceInfo.sortCode}
//                 onChange={handleInputChange}
//                 sx={{ marginBottom: "20px" }}
//                 InputLabelProps={{ shrink: true }} // Add this line
//               />
//               <TextField
//                 name="accountNo"
//                 label="Account No"
//                 variant="outlined"
//                 fullWidth
//                 value={invoiceInfo.accountNo}
//                 onChange={handleInputChange}
//                 InputLabelProps={{ shrink: true }} // Add this line
//               />
//             </Paper>
//           </Grid>

//           <Grid item xs={12}>
//             <Paper elevation={3} sx={{ padding: "20px" }}>
//               <h2>Receipt</h2>
//               {items.map((item, index) => (
//                 <Grid
//                   container
//                   spacing={2}
//                   key={index}
//                   sx={{ marginBottom: "10px" }}
//                 >
//                   <Grid item xs={4}>
//                     <FormControl variant="outlined" fullWidth>
//                       <InputLabel id={`description-label-${index}`}>
//                         Description
//                       </InputLabel>
//                       <Select
//                         labelId={`description-label-${index}`}
//                         label="Description"
//                         value={item.description}
//                         onChange={(e) =>
//                           handleItemChange(index, "description", e.target.value)
//                         }
//                       >
//                         <MenuItem value="">Select items</MenuItem>
//                         {Array.isArray(descriptionOptions) &&
//                           descriptionOptions.map((option) => (
//                             <MenuItem key={option.id} value={option.label}>
//                               {option.label}
//                             </MenuItem>
//                           ))}
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={4}>
//                     <TextField
//                       label="Remarks"
//                       variant="outlined"
//                       fullWidth
//                       value={item.remarks}
//                       onChange={(e) =>
//                         handleItemChange(index, "remarks", e.target.value)
//                       }
//                       InputLabelProps={{ shrink: true }} // Add this line
//                     />
//                   </Grid>
//                   <Grid item xs={2}>
//                     <TextField
//                       label="Amount"
//                       type="number"
//                       variant="outlined"
//                       fullWidth
//                       value={item.amount}
//                       onChange={(e) =>
//                         handleItemChange(index, "amount", e.target.value)
//                       }
//                       InputLabelProps={{ shrink: true }} // Add this line
//                     />
//                   </Grid>
//                   <Grid
//                     item
//                     xs={2}
//                     sx={{
//                       display: "flex",
//                       justifyContent: "center",
//                       alignItems: "center",
//                     }}
//                   >
//                     <Button variant="contained" onClick={handleAddItemToTable}>
//                       Add Item
//                     </Button>
//                   </Grid>
//                 </Grid>
//               ))}
//             </Paper>
//           </Grid>

//           <Grid item xs={12}>
//             <TableContainer component={Paper}>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>
//                       <b>Description</b>
//                     </TableCell>
//                     <TableCell>
//                       <b>Remarks</b>
//                     </TableCell>
//                     <TableCell>
//                       <b>Amount</b>
//                     </TableCell>
//                     <TableCell>
//                       <b>Action</b>
//                     </TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {tableItems.map((item, index) => (
//                     <TableRow key={index}>
//                       <TableCell>{item.description}</TableCell>
//                       <TableCell>{item.remarks}</TableCell>
//                       <TableCell>{item.amount}</TableCell>
//                       <TableCell>
//                         <IconButton
//                           onClick={() => handleDeleteItemFromTable(item.id)}
//                           color="error"
//                         >
//                           <DeleteIcon />
//                         </IconButton>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Grid>

//           <Grid item xs={6}>
//             <h3>Subtotal: ${totals.subtotal.toFixed(2)}</h3>
//             <h3>Total: ${totals.total.toFixed(2)}</h3>
//           </Grid>

//           <Grid item xs={12} sx={{ textAlign: "right" }}>
//             <Button variant="contained" color="primary" onClick={saveInvoice}>
//               Save
//             </Button>
//           </Grid>
//         </>
//       )}
//     </Grid>
//   );
// };

// export default InvoiceList;

// EXTRA CODE

// import React, { useState, useEffect } from "react";
// import { useLocation, useSearchParams, Link } from "react-router-dom";
// import {
//   Button,
//   Grid,
//   IconButton,
//   Paper,
//   Snackbar,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import TablePagination from "@mui/material/TablePagination";
// import { getJwtToken } from "./UtlisAuth";
// import NewClient from "./NewClient"; // Import your form component here

// const InvoiceList = () => {
//   const location = useLocation();
//   const [invoices, setInvoices] = useState([]);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const navigate = useNavigate();

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   useEffect(() => {
//     const fetchInvoices = async () => {
//       const jwtToken = getJwtToken();
//       try {
//         const response = await fetch(
//           "http://18.197.21.71:8084/ipik/InvoicesList",
//           {
//             headers: {
//               Authorization: `Bearer ${jwtToken}`,
//             },
//           }
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch invoices");
//         }
//         const data = await response.json();

//         setInvoices(
//           data.DATA.map((invoice) => ({
//             invoiceId: invoice.id,
//             clientCode: invoice.client_code,
//             companyName: invoice.company_label,
//             creationDate: invoice.created_on,
//             bankName: invoice.bank_name || "N/A",
//             totalAmount: invoice.total_amount,
//           }))
//         );
//       } catch (error) {
//         console.error("Error fetching invoices:", error);
//       }
//     };

//     fetchInvoices();
//   }, []);

//   const handleEditClick = async (invoiceId) => {
//     try {
//       const jwtToken = getJwtToken();
//       const response = await fetch(
//         `http://18.197.21.71:8084/ipik/InvoicesList?id=${invoiceId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${jwtToken}`,
//           },
//         }
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch invoice details");
//       }
//       const invoiceData = await response.json();
//       const invoice = invoiceData.DATA[0]; // Assuming the API returns only one invoice

//       // Navigate to the form with the invoice data
//       navigate("/new-client", { state: { invoice } });
//     } catch (error) {
//       console.error("Error fetching invoice details:", error);
//       setSnackbarMessage("Failed to fetch invoice details");
//       setSnackbarOpen(true);
//     }
//   };

//   const handleCloseSnackbar = () => {
//     setSnackbarOpen(false);
//   };

//   return (
//     <Grid container spacing={3}>
//       <Grid item xs={12}>
//         <Snackbar
//           open={snackbarOpen}
//           autoHideDuration={6000}
//           onClose={handleCloseSnackbar}
//           message={snackbarMessage}
//         />
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Invoice ID</TableCell>
//                 <TableCell>Client Code</TableCell>
//                 <TableCell>Company Name</TableCell>
//                 <TableCell>Creation Date</TableCell>
//                 <TableCell>Bank Name</TableCell>
//                 <TableCell>Total Amount</TableCell>
//                 <TableCell>Action</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {invoices
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((invoice) => (
//                   <TableRow key={invoice.invoiceId}>
//                     <TableCell>{invoice.invoiceId}</TableCell>
//                     <TableCell>{invoice.clientCode}</TableCell>
//                     <TableCell>{invoice.companyName}</TableCell>
//                     <TableCell>{invoice.creationDate}</TableCell>
//                     <TableCell>{invoice.bankName}</TableCell>
//                     <TableCell>{invoice.totalAmount}</TableCell>
//                     <TableCell>
//                       <Button
//                         variant="outlined"
//                         color="primary"
//                         onClick={() => handleEditClick(invoice.invoiceId)}
//                       >
//                         Edit
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//             </TableBody>
//           </Table>
//           <TablePagination
//             rowsPerPageOptions={[5, 10, 25]}
//             component="div"
//             count={invoices.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </TableContainer>
//       </Grid>
//       <Grid item xs={12}>
//         <NewClient />
//       </Grid>
//     </Grid>
//   );
// };

// export default InvoiceList;
