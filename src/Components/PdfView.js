// // import React, { useState, useEffect } from 'react';
// // import { useLocation } from 'react-router-dom';
// // import { Snackbar } from '@mui/material';
// // import { getJwtToken } from './UtlisAuth';

// // function PdfView() {
// //   const location = useLocation();
// //   const [invoiceId, setInvoiceId] = useState(null);
// //   const [snackbarOpen, setSnackbarOpen] = useState(false);
// //   const [snackbarMessage, setSnackbarMessage] = useState('');

// //   console.log(location)

// //   useEffect(() => {
// //     if (location.state && location.state.invoice) {
// //       console.log('Invoice ID:', location.state.invoice);
// //       setInvoiceId(location.state.invoice);
// //     }
// //   }, [location.state]);

// //   useEffect(() => {
// //     if (invoiceId) {
// //       console.log('Fetching PDF for invoice ID:', invoiceId);
// //       handleGeneratePdf();
// //     }
// //   }, [invoiceId]);

// //   const handleGeneratePdf = async () => {
// //     try {
// //       const jwtToken = getJwtToken();
// //       const response = await fetch(`http://18.197.21.71:8084/ipik/InvoicePDF?invoiceId=${invoiceId}`, {
// //         headers: {
// //           Authorization: `Bearer ${jwtToken}`,
// //         },
// //       });
// //       if (!response.ok) {
// //         throw new Error('Failed to fetch PDF');
// //       }
// //       console.log('PDF fetched successfully:', response); // Log successful response
// //       const url = URL.createObjectURL(response.data);
// //       window.open(url);
// //     } catch (error) {
// //       console.error('Error fetching PDF:', error);
// //       handleSnackbarError('Failed to fetch PDF');
// //     }
// //   };

// //   const handleSnackbarError = (errorMessage) => {
// //     console.error(errorMessage); // Log error message
// //     setSnackbarMessage(errorMessage);
// //     setSnackbarOpen(true);
// //   };

// //   const handleCloseSnackbar = () => {
// //     setSnackbarOpen(false);
// //   };

// //   return (
// //     <Snackbar
// //       open={snackbarOpen}
// //       autoHideDuration={6000}
// //       onClose={handleCloseSnackbar}
// //       message={snackbarMessage}
// //     />
// //   );
// // }

// // export default PdfView;

// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { Snackbar } from '@mui/material';
// import { getJwtToken } from './UtlisAuth';

// function PdfView() {
//   const location = useLocation();
//   const [invoiceId, setInvoiceId] = useState(null);
//   const [pdfUrl, setPdfUrl] = useState(null);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');

//   useEffect(() => {
//     if (location.state && location.state.invoice) {
//       console.log('Invoice ID:', location.state.invoice);
//       setInvoiceId(location.state.invoice);
//     }
//   }, [location.state]);

//   useEffect(() => {
//     if (invoiceId) {
//       console.log('Fetching PDF for invoice ID:', invoiceId);
//       handleGeneratePdf();
//     }
//   }, [invoiceId]);

//   const handleGeneratePdf = async () => {
//     try {
//       const jwtToken = getJwtToken();
//       const response = await fetch(`http://18.197.21.71:8084/ipik/InvoicePDF?invoiceId=${invoiceId}`, {
//         headers: {
//           Authorization: `Bearer ${jwtToken}`,
//         },
//       });
//       if (!response.ok) {
//         throw new Error('Failed to fetch PDF');
//       }
//       console.log('PDF fetched successfully:', response);
//       // Assuming the response contains the image data
//       const blob = await response.blob();
//       console.log('Blob:', blob);
//       const url = URL.createObjectURL(blob);
//       console.log('Image URL:', url);
//       setPdfUrl(url);
//     } catch (error) {
//       console.error('Error fetching PDF:', error);
//       handleSnackbarError('Failed to fetch PDF');
//     }
//   };

//   const handleSnackbarError = (errorMessage) => {
//     console.error(errorMessage);
//     setSnackbarMessage(errorMessage);
//     setSnackbarOpen(true);
//   };

//   const handleCloseSnackbar = () => {
//     setSnackbarOpen(false);
//   };

//   return (
//     <div>
//       {pdfUrl && <img src={pdfUrl} alt="Invoice" style={{width:"500", height:"500"}} />}
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//         message={snackbarMessage}
//       />
//     </div>
//   );

// }

// export default PdfView;

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Snackbar } from "@mui/material";
import { getJwtToken } from "./UtlisAuth";
import { Document, Page } from "react-pdf";

function PdfView() {
  const location = useLocation();
  const [invoiceId, setInvoiceId] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [numPages, setNumPages] = useState(null);

  useEffect(() => {
    if (location.state && location.state.invoice) {
      setInvoiceId(location.state.invoice);
    }
  }, [location.state]);

  useEffect(() => {
    if (invoiceId) {
      handleGeneratePdf();
    }
  }, [invoiceId]);

  const handleGeneratePdf = async () => {
    try {
      const jwtToken = getJwtToken();
      const response = await fetch(
        `http://18.197.21.71:8084/ipik/InvoicePDF?invoiceId=${invoiceId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
        
      );
      if (!response.ok) {
        throw new Error("Failed to fetch PDF");
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      console.log("PDF URL:", url); // Check the PDF URL
      setPdfUrl(url);
    } catch (error) {
      console.error("Error fetching PDF:", error);
      handleSnackbarError("Failed to fetch PDF");
    }
  };

  const handleSnackbarError = (errorMessage) => {
    console.error(errorMessage);
    setSnackbarMessage(errorMessage);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div >
      <form style={{ width:"100%", height:"1000px"}}>

   
      {pdfUrl && (
        <iframe src={pdfUrl} width="80%" height="100%" />
        // <Document
        //   file={pdfUrl}
        //   onLoadSuccess={onDocumentLoadSuccess}
        // >
        //   {Array.from(
        //     new Array(numPages || 0),
        //     (el, index) => (
        //       <Page
        //         key={`page_${index + 1}`}
        //         pageNumber={index + 1}
        //       />
        //     ),
        //   )}
        // </Document>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
         </form>
    </div>
  );
}

export default PdfView;
