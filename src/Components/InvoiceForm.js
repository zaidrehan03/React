import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Switch,
  FormControlLabel,
  Snackbar,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { getJwtToken } from "./UtlisAuth";
import { useLocation } from "react-router-dom";

import { useParams } from 'react-router-dom';

const InvoiceForm = () => {
  const location = useLocation();
  const receivedData = location.state && location.state.data;
  // Check if location.state is null before destructuring
  if (!location.state) {
    console.log("No invoice data available");
  }else{
    console.log(receivedData);  
  }
  // Parse the serialized invoice object back into JSON
  // const parsedInvoice = JSON.parse(invoice);
  // console.log("parsedInvoice");
  // console.log(parsedInvoice);
 

// Safely accessing invoice data from location state
//const invoiceData = state ? state.invoice : null;
const invoiceData =  null;
//console.log("Invoice data:", invoiceData); 

// Form state variables
const [invoiceInfo, setInvoiceInfo] = useState({
  customer: "",
  invoiceTo: "",
  invoiceDate: new Date().toISOString().split("T")[0],
  applyTax: false,
  bankName: "",
  sortCode: "",
  accountNo: "",
});
console.log("Initial invoiceInfo state:", invoiceInfo);

const [items, setItems] = useState([
  { description: "", remarks: "", amount: "" },
]);
console.log("Initial items state:", items);

const [descriptionOptions, setDescriptionOptions] = useState([]);
console.log("Initial descriptionOptions state:", descriptionOptions);

const [snackbarOpen, setSnackbarOpen] = useState(false);
console.log("Initial snackbarOpen state:", snackbarOpen);

const [snackbarMessage, setSnackbarMessage] = useState("");
console.log("Initial snackbarMessage state:", snackbarMessage);

// Form input change handlers
const handleInputChange = (event) => {
  const { name, value, type, checked } = event.target;
  setInvoiceInfo({
    ...invoiceInfo,
    [name]: type === "checkbox" ? checked : value,
  });
};
console.log("Handle input change function");

const handleItemChange = (index, field, value) => {
  const newItems = [...items];
  newItems[index][field] = value;
  setItems(newItems);
};
console.log("Handle item change function");

// Fetch description options
// useEffect(() => {
//   const fetchDescriptions = async () => {
//     const jwtToken = getJwtToken();
//     try {
//       const response = await fetch(
//         "http://18.197.21.71:8084/ipik/DescriptionList",
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${jwtToken}`,
//           },
//         }
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch descriptions");
//       }
//       const data = await response.json();
//       setDescriptionOptions(data.DATA);
//       console.log("Description options fetched:", data.DATA);
//     } catch (error) {
//       console.error("Error fetching descriptions:", error);
//     }
//   };

//   fetchDescriptions();
// }, []);
// console.log("Fetch descriptions effect");

// Populate form state with invoice data received from location state
// useEffect(() => {
//   if (invoiceData) {
//     setInvoiceInfo({
//       customer: invoiceData.customer || "",
//       invoiceTo: invoiceData.invoiceTo || "",
//       invoiceDate: invoiceData.invoiceDate || new Date().toISOString().split("T")[0],
//       applyTax: invoiceData.applyTax || false,
//       bankName: invoiceData.bankName || "",
//       sortCode: invoiceData.sortCode || "",
//       accountNo: invoiceData.accountNo || "",
//     });
//     console.log("Updated invoiceInfo state:", invoiceInfo);

//     setItems(invoiceData.items || []);
//     console.log("Updated items state:", items);
//   }
// }, [invoiceData]);

// Form submission handler
const handleSubmit = (event) => {
  event.preventDefault();
  // Submit logic goes here
  console.log("Form submitted"); // Add this console.log statement
};

console.log("Handle submit function");
  // JSX for the form
  return (
    <Grid container spacing={3} sx={{ backgroundColor: "#fff", padding: "20px" }}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ padding: "20px", marginBottom: "25px" }}>
          <h2>Invoice</h2>
          <TextField
            name="customer"
            label="Customer"
            variant="outlined"
            fullWidth
            value={invoiceInfo.customer}
            onChange={handleInputChange}
            sx={{ marginBottom: "20px" }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            name="invoiceTo"
            label="Invoice To"
            variant="outlined"
            fullWidth
            value={invoiceInfo.invoiceTo}
            onChange={handleInputChange}
            sx={{ marginBottom: "20px" }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            name="invoiceDate"
            label="Invoice Date"
            type="date"
            variant="outlined"
            fullWidth
            value={invoiceInfo.invoiceDate}
            onChange={handleInputChange}
            sx={{ marginBottom: "20px" }}
            InputLabelProps={{ shrink: true }}
          />

          <FormControlLabel
            control={
              <Switch
                checked={invoiceInfo.applyTax}
                onChange={handleInputChange}
                name="applyTax"
              />
            }
            label="Apply Tax"
          />
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ padding: "20px", height: "84%" }}>
          <h2>Bank Details</h2>
          <TextField
            name="bankName"
            label="Bank Name"
            variant="outlined"
            fullWidth
            value={invoiceInfo.bankName}
            onChange={handleInputChange}
            sx={{ marginBottom: "20px" }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            name="sortCode"
            label="Sort Code"
            variant="outlined"
            fullWidth
            value={invoiceInfo.sortCode}
            onChange={handleInputChange}
            sx={{ marginBottom: "20px" }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            name="accountNo"
            label="Account No"
            variant="outlined"
            fullWidth
            value={invoiceInfo.accountNo}
            onChange={handleInputChange}
            sx={{ marginBottom: "20px" }}
            InputLabelProps={{ shrink: true }}
          />
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper elevation={3} sx={{ padding: "20px" }}>
          <h2>Receipt</h2>
          {items.map((item, index) => (
            <Grid
              container
              spacing={2}
              key={index}
              sx={{ marginBottom: "10px" }}
            >
              <Grid item xs={4}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel>Description</InputLabel>
                  <Select
                    value={item.description}
                    onChange={(e) =>
                      handleItemChange(index, "description", e.target.value)
                    }
                  >
                    <MenuItem value="">Select items</MenuItem>
                    {descriptionOptions.map((option) => (
                      <MenuItem key={option.id} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Remarks"
                  variant="outlined"
                  fullWidth
                  value={item.remarks}
                  onChange={(e) =>
                    handleItemChange(index, "remarks", e.target.value)
                  }
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  label="Amount"
                  type="number"
                  variant="outlined"
                  fullWidth
                  value={item.amount}
                  onChange={(e) =>
                    handleItemChange(index, "amount", e.target.value)
                  }
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          ))}
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              setItems([...items, { description: "", remarks: "", amount: "" }])
            }
            sx={{ marginRight: "10px" }}
          >
            Add Item
          </Button>
          <Button variant="contained" color="secondary">
            Remove Item
          </Button>
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ marginLeft: "10px" }}
          >
            Submit
          </Button>

        </Paper>
      </Grid>
    </Grid>
  );
};

export default InvoiceForm;


// import React, { useState, useEffect } from "react";
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

// const InvoiceForm = ({ invoiceData = {}, onSave }) => {
//   const defaultInvoiceData = {
//     customer: " ",
//     invoiceTo: " ",
//     invoiceDate: " ",
//     applyTax: false,
//     items: [],
//   };

//   const [invoiceInfo, setInvoiceInfo] = useState({
//     ...defaultInvoiceData,
//     ...invoiceData,
//     invoiceDate: invoiceData.invoiceDate ? invoiceData.invoiceDate.split("T")[0] : "", // Format invoice date
//   });
//   const [items, setItems] = useState(invoiceData.items || []);

//   const handleInputChange = (event) => {
//     const { name, value, type, checked } = event.target;
//     setInvoiceInfo({
//       ...invoiceInfo,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleItemChange = (index, field, value) => {
//     const newItems = [...items];
//     newItems[index][field] = value;
//     setItems(newItems);
//   };

//   const handleAddItem = () => {
//     setItems([...items, { description: "", remarks: "", amount: "" }]);
//   };

//   const handleDeleteItem = (index) => {
//     const newItems = [...items];
//     newItems.splice(index, 1);
//     setItems(newItems);
//   };

//   const handleSave = () => {
//     const editedInvoice = {
//       ...invoiceInfo,
//       items,
//     };
//     onSave(editedInvoice);
//   };

//   return (
//     <>
//     <Grid item xs={12} md={6}>
//     <Paper elevation={3} sx={{ padding: "20px", marginBottom: "25px" }}>
//       <h2>Invoice</h2>
//       <TextField
//         name="customer"
//         label="Customer"
//         variant="outlined"
//         fullWidth
//         value={
//           location.state.flag === true
//             ? location.state.invoice.companyName
//             : invoiceInfo.customer
//         }
//         onChange={handleInputChange}
//         sx={{ marginBottom: "20px" }}
//         InputLabelProps={{ shrink: true }} // Add this line
//       />
//       <TextField
//         name="invoiceTo"
//         label="Invoice To"
//         variant="outlined"
//         fullWidth
//         value={
//           location.state.flag === true
//             ? location.state.invoice.clientCode
//             : invoiceInfo.invoiceTo
//         }
//         onChange={handleInputChange}
//         sx={{ marginBottom: "20px" }}
//         InputLabelProps={{ shrink: true }} // Add this line
//       />
//       <TextField
//         name="invoiceDate"
//         label="Invoice Date"
//         type="date"
//         variant="outlined"
//         fullWidth
//         // value={
//         //   location.state.flag === true
//         //     ? location.state.invoice.invoice_date
//         //     : invoiceInfo.invoiceDate
//         // }
//         value={invoiceInfo.invoiceDate}
//         onChange={handleInputChange}
//         sx={{ marginBottom: "20px" }}
//         InputLabelProps={{ shrink: true }}
//       />

//       <FormControlLabel
//         control={
//           <Switch
//             checked={invoiceInfo.applyTax}
//             onChange={handleInputChange}
//             name="applyTax"
//           />
//         }
//         label="Apply Tax"
//       />
//     </Paper>
//   </Grid>

//   <Grid item xs={12} md={6}>
//     <Paper elevation={3} sx={{ padding: "20px", height: "84%" }}>
//       <h2>Bank Details</h2>
//       <TextField
//         name="bankName"
//         label="Bank Name"
//         variant="outlined"
//         fullWidth
//         value={
//           location.state.flag === true
//             ? location.state.bankName
//             : invoiceInfo.bankName
//         }
//         // value={invoiceInfo.bankName}
//         onChange={handleInputChange}
//         sx={{ marginBottom: "20px" }}
//         InputLabelProps={{ shrink: true }} // Add this line
//       />
//       <TextField
//         name="sortCode"
//         label="Sort Code"
//         variant="outlined"
//         fullWidth
//         value={invoiceInfo.sortCode}
//         onChange={handleInputChange}
//         sx={{ marginBottom: "20px" }}
//         InputLabelProps={{ shrink: true }} // Add this line
//       />
//       <TextField
//         name="accountNo"
//         label="Account No"
//         variant="outlined"
//         fullWidth
//         value={invoiceInfo.accountNo}
//         onChange={handleInputChange}
//         InputLabelProps={{ shrink: true }} // Add this line
//       />
//     </Paper>
//   </Grid>

//   <Grid item xs={12}>
//     <Paper elevation={3} sx={{ padding: "20px" }}>
//       <h2>Receipt</h2>
//       {items.map((item, index) => (
//         <Grid
//           container
//           spacing={2}
//           key={index}
//           sx={{ marginBottom: "10px" }}
//         >
//           <Grid item xs={4}>
//             <FormControl variant="outlined" fullWidth>
//               <InputLabel id={`description-label-${index}`}>
//                 Description
//               </InputLabel>
//               <Select
//                 labelId={`description-label-${index}`}
//                 label="Description"
//                 value={item.description}
//                 onChange={(e) =>
//                   handleItemChange(index, "description", e.target.value)
//                 }
//               >
//                 <MenuItem value="">Select items</MenuItem>
//                 {Array.isArray(descriptionOptions) &&
//                   descriptionOptions.map((option) => (
//                     <MenuItem key={option.id} value={option.label}>
//                       {option.label}
//                     </MenuItem>
//                   ))}
//               </Select>
//             </FormControl>
//           </Grid>
//           <Grid item xs={4}>
//             <TextField
//               label="Remarks"
//               variant="outlined"
//               fullWidth
//               value={item.remarks}
//               onChange={(e) =>
//                 handleItemChange(index, "remarks", e.target.value)
//               }
//               InputLabelProps={{ shrink: true }} // Add this line
//             />
//           </Grid>
//           <Grid item xs={2}>
//             <TextField
//               label="Amount"
//               type="number"
//               variant="outlined"
//               fullWidth
//               value={item.amount}
//               onChange={(e) =>
//                 handleItemChange(index, "amount", e.target.value)
//               }
//               InputLabelProps={{ shrink: true }} // Add this line
//             />
//           </Grid>
//           <Grid
//             item
//             xs={2}
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             <Button variant="contained" onClick={handleAddItemToTable}>
//               Add Item
//             </Button>
//           </Grid>
//         </Grid>
//       ))}
//     </Paper>
//   </Grid>

//   <Grid item xs={12}>
//     <TableContainer component={Paper}>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>
//               <b>Description</b>
//             </TableCell>
//             <TableCell>
//               <b>Remarks</b>
//             </TableCell>
//             <TableCell>
//               <b>Amount</b>
//             </TableCell>
//             <TableCell>
//               <b>Action</b>
//             </TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {tableItems.map((item, index) => (
//             <TableRow key={index}>
//               <TableCell>{item.description}</TableCell>
//               <TableCell>{item.remarks}</TableCell>
//               <TableCell>{item.amount}</TableCell>
//               <TableCell>
//                 <IconButton
//                   onClick={() => handleDeleteItemFromTable(item.id)}
//                   color="error"
//                 >
//                   <DeleteIcon />
//                 </IconButton>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   </Grid>

//   <Grid item xs={6}>
//     <h3>Subtotal: ${totals.subtotal.toFixed(2)}</h3>
//     <h3>Total: ${totals.total.toFixed(2)}</h3>
//   </Grid>

//   <Grid item xs={12} sx={{ textAlign: "right" }}>
//     <Button variant="contained" color="primary" onClick={saveInvoice}>
//       Save
//     </Button>
//   </Grid>

// </>

//   );
// };
