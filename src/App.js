// import React, { useState, useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import Dashboard from "./Components/Dashboard";
// import NewClient from "./Components/NewClient";
// import InvoiceList from "./Components/InvoiceList";
// import Documents from "./Components/Documents";
// import Navbar from "./Components/Navbar";
// import VerifyDocumentsList from "./Components/VerifyDoumentsList";
// import Login from "./Components/LoginForm";
// import InvoiceForm from "./Components/InvoiceForm";
// import PdfView from "./Components/PdfView";
// import { getJwtToken } from "./Components/UtlisAuth";
// import Sidebar from "./Components/Sidebar";

// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const token = getJwtToken();
//     if (token) {
//       setIsAuthenticated(true);
//     }
//   }, []);

//   const handleLoginSuccess = () => {
//     setIsAuthenticated(true);
//     return <Navigate to="/" />;
//   };

//  return (
//     <>
//       <Router>
//     <div style={{ display: "flex" }}>
//       <Sidebar />

//       <div style={{ flex: 1  }}>
//         {isAuthenticated && <Navbar setIsAuthenticated={setIsAuthenticated} />}

//         <Routes>
//           {!isAuthenticated && (
//             <Route
//               path="/login"
//               element={<Login onLoginSuccess={handleLoginSuccess} />}
//             />
//           )}
//           {isAuthenticated && (
//             <>
//                 <Route path="/" element={<Dashboard />} />
//                 <Route path="/new-client" element={<NewClient />} />
//                 <Route path="/invoice-list" element={<InvoiceList />} />
//                 <Route path="/documents" element={<Documents />} />
//                 <Route
//                   path="/verify-documents-list"
//                   element={<VerifyDocumentsList />}
//                 />
//                 <Route path="/InvoiceForm" element={<InvoiceForm />} />
//                 <Route path="/PdfView" element={<PdfView />} />
//               </>
//             )}
//             {/* <Redirect to={{ pathname: "/login" }} /> */}
//           </Routes>
//         </div>
//         </div>
//       </Router>
//       </>
//   );
// };
// // hloo to the future PTCL BB
// export default App;

// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Dashboard from "./Components/Dashboard";
// import NewClient from "./Components/NewClient";
// import InvoiceList from "./Components/InvoiceList";
// import Documents from "./Components/Documents";
// import Navbar from "./Components/Navbar";
// import VerifyDocumentsList from "./Components/VerifyDoumentsList";
// import Login from "./Components/LoginForm";
// import InvoiceForm from "./Components/InvoiceForm";
// import './App.css';
// import PdfView from "./Components/PdfView";
// import { getJwtToken } from "./Components/UtlisAuth"; // Import the utility functions

// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const token = getJwtToken();
//     if (token) {
//       // Token exists, set isAuthenticated to true
//       setIsAuthenticated(true);
//     }
//   }, []); // Empty dependency array ensures this effect runs only once on component mount

//   const handleLoginSuccess = () => {
//     setIsAuthenticated(true);
//   };

//   const handleLogout = () => {
//     setIsAuthenticated(false);
//   };

//   return (
//     <Router>
//       <div>
//         <Routes>
//           {isAuthenticated ? (
//             <>
//               <Route path="/" element={<Navbar onLogout={handleLogout} />} />
//               <Route path="/" element={<Dashboard />} />
//               <Route path="/new-client" element={<NewClient />} />
//               <Route path="/invoice-list" element={<InvoiceList />} />
//               <Route path="/documents" element={<Documents />} />
//               <Route path="/verify-documents-list" element={<VerifyDocumentsList />} />
//               <Route path="/InvoiceForm" element={<InvoiceForm />} />
//               <Route path="/PdfView" element={<PdfView/>} />
//             </>
//           ) : (
//             <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
//           )}
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;

// App.js
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import NewClient from "./Components/NewClient";
import InvoiceList from "./Components/InvoiceList";
import Documents from "./Components/Documents";
import Navbar from "./Components/Navbar";
import Login from "./Components/LoginForm";
import InvoiceForm from "./Components/InvoiceForm";
import PdfView from "./Components/PdfView";
import { getJwtToken } from "./Components/UtlisAuth";
import Sidebar from "./Components/Sidebar";
// import "./styles.css"; // Import your styles.css file

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = getJwtToken();
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    return <Navigate to="/" />;
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <Router>
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        <div className={sidebarOpen ? "shifted-content" : ""}>
          {isAuthenticated && (
            <Navbar
              setIsAuthenticated={setIsAuthenticated}
              toggleSidebar={toggleSidebar}
            />
          )}
          <div style={{marginTop: '80px'}}>
            <Routes>
              {!isAuthenticated && (
                <Route
                  path="/login"
                  element={<Login onLoginSuccess={handleLoginSuccess} />}
                />
              )}
              {isAuthenticated && (
                <>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/new-client" element={<NewClient />} />
                  <Route path="/invoice-list" element={<InvoiceList />} />
                  <Route path="/documents" element={<Documents />} />
                  <Route path="/InvoiceForm" element={<InvoiceForm />} />
                  <Route path="/PdfView" element={<PdfView />} />
                </>
              )}
              {/* <Redirect to={{ pathname: "/login" }} /> */}
            </Routes>
          </div>
        </div>
        
      </Router>
    </>
  );
};

export default App;
