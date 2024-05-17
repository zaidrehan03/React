// import React from "react";
// import { Link } from "react-router-dom";
// import styled from "styled-components";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import PeopleAltSharpIcon from "@mui/icons-material/PeopleAltSharp";
// import ReceiptSharpIcon from "@mui/icons-material/ReceiptSharp";
// import FileCopySharpIcon from "@mui/icons-material/FileCopySharp";

// // Define SidebarContainer styled-component
// const SidebarContainer = styled.div`
//   width: ${({ isOpen }) => (isOpen ? "30vh" : "0")};
//   height: 100vh;
//   background: #546e7a;
//   position: fixed;
//   top: 70px;
//   left: ${({ isOpen }) => (isOpen ? "0" : "-30vh")};
//   padding-top: 64px;
//   transition: left 0.3s ease;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: flex-start;
// `;

// // Define SidebarItem styled-component
// const SidebarItem = styled.div`
//   padding: 8px;
//   a {
//     text-align: start;
//     background-color: #e5e8ec;
//     color: black;
//     width: ${({ isOpen }) => (isOpen ? "22vh" : "100%")};
//     padding: 10px 16px;
//     text-decoration: none;
//     display: flex;
//     margin-bottom: 5px;
//     &:hover {
//       text-decoration: none;
//     }
//   }
// `;

// // Define Overlay styled-component
// const Overlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.5);
//   z-index: 999;
// `;

// // Updated Sidebar component
// const Sidebar = ({ isOpen, toggleSidebar }) => {
//   return (
//     <>
//       <SidebarContainer isOpen={isOpen}>

//         <SidebarItem isOpen={isOpen}>
//           <Link style={{ borderRadius: '8px'}} to="/" onClick={toggleSidebar}>
//             <DashboardIcon style={{ fontSize: "20", marginRight: "3"}} />{"Dashboard"}
//           </Link>
//         </SidebarItem>

//         <SidebarItem isOpen={isOpen}>
//           <Link style={{ borderRadius: '8px'}} to="new-client" onClick={toggleSidebar}>
//             <PeopleAltSharpIcon style={{ fontSize: "20", marginRight: "3" }} />{"New Client"}
//           </Link>
//         </SidebarItem>

//         <SidebarItem isOpen={isOpen}>
//           <Link style={{ borderRadius: '8px'}} to="invoice-list" onClick={toggleSidebar}>
//             <ReceiptSharpIcon style={{ fontSize: "20", marginRight: "3" }} />{"Invoice List"}        
//           </Link>
//         </SidebarItem>

//         <SidebarItem isOpen={isOpen}>
//           <Link style={{ borderRadius: '8px'}}to="documents" onClick={toggleSidebar}>
//             <FileCopySharpIcon style={{ fontSize: "20", marginRight: "3" }} />{"Documents"}        
//           </Link>
//         </SidebarItem>
        
//       </SidebarContainer>
      
//       {/* Overlay for closing sidebar on click outside
//       {isOpen && <Overlay onClick={toggleSidebar} />} */}
//     </>
//   );
// };

// export default Sidebar;

// import React from "react";
// import { Link } from "react-router-dom";
// import styled from "styled-components";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import PeopleAltSharpIcon from "@mui/icons-material/PeopleAltSharp";
// import ReceiptSharpIcon from "@mui/icons-material/ReceiptSharp";
// import FileCopySharpIcon from "@mui/icons-material/FileCopySharp";

// const SidebarContainer = styled.div`
//   width: ${({ isOpen }) => (isOpen ? "30vh" : "0")};
//   height: calc(100vh - 70px);
//   background: #546e7a;
//   position: fixed;
//   left: ${({ isOpen }) => (isOpen ? "0" : "-30vh")};
//   padding-top: 64px;
//   transition: left 0.3s ease;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: flex-start;
// `;

// const SidebarItem = styled.div`
//   padding: 8px;
//   a {
//     text-align: start;
//     background-color: #e5e8ec;
//     color: black;
//     width: ${({ isOpen }) => (isOpen ? "22vh" : "100%")};  // Issue might be here
//     padding: 10px 16px;
//     text-decoration: none;
//     display: flex;
//     margin-bottom: 5px;
//     border-radius: 8px;
//     &:hover {
//       text-decoration: none;
//     }
//   }
// `;


// const Sidebar = ({ isOpen }) => {
//   const handleSidebarClick = (event) => {
//     event.stopPropagation();
//   };

//   return (
//     <SidebarContainer isOpen={isOpen} onClick={handleSidebarClick}>
//       <div style={{ width: "100%", height: "calc(100vh - 70px)", overflowY: "auto" }}>
//         <SidebarItem isOpen={isOpen}>
//           <Link to="/" style={{ width: "100%" }}>
//             <DashboardIcon style={{ fontSize: "20", marginRight: "3"}} />{"Dashboard"}
//           </Link>
//         </SidebarItem>

//         <SidebarItem isOpen={isOpen}>
//           <Link to="new-client" style={{ width: "100%" }}>
//             <PeopleAltSharpIcon style={{ fontSize: "20", marginRight: "3" }} />{"New Client"}
//           </Link>
//         </SidebarItem>

//         <SidebarItem isOpen={isOpen}>
//           <Link to="invoice-list" style={{ width: "100%" }}>
//             <ReceiptSharpIcon style={{ fontSize: "20", marginRight: "3" }} />{"Invoice List"}        
//           </Link>
//         </SidebarItem>

//         <SidebarItem isOpen={isOpen}>
//           <Link to="documents" style={{ width: "100%" }}>
//             <FileCopySharpIcon style={{ fontSize: "20", marginRight: "3" }} />{"Documents"}        
//           </Link>
//         </SidebarItem>
//       </div>
//     </SidebarContainer>
//   );
// };

// export default Sidebar;


// Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltSharpIcon from "@mui/icons-material/PeopleAltSharp";
import ReceiptSharpIcon from "@mui/icons-material/ReceiptSharp";
import FileCopySharpIcon from "@mui/icons-material/FileCopySharp";

const SidebarContainer = styled.div`
  width: ${({ isOpen }) => (isOpen ? "250px" : "0")};
  height: 100vh;
  background: #546e7a;
  position: fixed;
  left: 0;
  top: 0;
  transition: width 0.3s ease;
  z-index: 1000;
  overflow-x: hidden;
  padding-top: 60px;
`;

const SidebarItem = styled.div`
  padding: 8px;
  a {
    text-align: start;
    background-color: #e5e8ec;
    color: black;
    width: 80%;
    padding: 10px 16px;
    text-decoration: none;
    display: flex;
    margin-bottom: 5px;
    border-radius: 8px;
    &:hover {
      text-decoration: none;
    }
  }
`;

const Sidebar = ({ isOpen }) => {
  return (
    <SidebarContainer isOpen={isOpen}>

      <br/>
      <br/>
      <SidebarItem>
        <Link to="/">
          <DashboardIcon style={{ fontSize: "20", marginRight: "3"}} /> Dashboard
        </Link>
      </SidebarItem>

      <SidebarItem >
        <Link to="/new-client">
          <PeopleAltSharpIcon style={{ fontSize: "20", marginRight: "3" }} /> New Client
        </Link>
      </SidebarItem>

      <SidebarItem>
        <Link to="/invoice-list">
          <ReceiptSharpIcon style={{ fontSize: "20", marginRight: "3" }} /> Invoice List
        </Link>
      </SidebarItem>

      <SidebarItem>
        <Link to="/documents">
          <FileCopySharpIcon style={{ fontSize: "20", marginRight: "3" }} /> Documents
        </Link>
      </SidebarItem>

    </SidebarContainer>
  );
};

export default Sidebar;