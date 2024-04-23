import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltSharpIcon from "@mui/icons-material/PeopleAltSharp";
import ReceiptSharpIcon from "@mui/icons-material/ReceiptSharp";
import FileCopySharpIcon from "@mui/icons-material/FileCopySharp";

const SidebarContainer = styled.div`
  width: ${({ isOpen }) => (isOpen ? "30vh" : "0")}; /* Adjusted width */
  height: 100vh;
  background: #546e7a;
  position: fixed;
  top: 70px;
  left: ${({ isOpen }) => (isOpen ? "0" : "-30vh")}; /* Adjusted left position */
  padding-top: 64px;
  transition: left 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const SidebarItem = styled.div`
  padding: 8px;
  a {
    text-align: start;
    background-color: #e5e8ec;
    color: black;
    width: ${({ isOpen }) => (isOpen ? "22vh" : "100%")}; /* Adjusted width */
    padding: 10px 16px;
    text-decoration: none;
    display: flex;
    margin-bottom: 5px;
    &:hover {
      text-decoration: none;
    }
  }
`;

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      <SidebarContainer isOpen={isOpen}>

        {/* <SidebarItem>
          <Link style={{  borderRadius: '8px'}} to="/" onClick={toggleSidebar}>
          <DashboardIcon style={{ fontSize: "20", marginRight: "3"}} />{"Dashboard"}
          </Link>
        </SidebarItem> */}


        <SidebarItem isOpen={isOpen}>
          <Link style={{ borderRadius: '8px'}} to="/" onClick={toggleSidebar}>
            <DashboardIcon style={{ fontSize: "20", marginRight: "3"}} />{"Dashboard"}
          </Link>
        </SidebarItem>

        <SidebarItem isOpen={isOpen}>
          <Link style={{  borderRadius: '8px'}} to="new-client" onClick={toggleSidebar}>
          <PeopleAltSharpIcon style={{ fontSize: "20", marginRight: "3" }} />{"New Client"}
          </Link>
        </SidebarItem>

        <SidebarItem isOpen={isOpen}>
          <Link style={{  borderRadius: '8px'}} to="invoice-list" onClick={toggleSidebar}>
          <ReceiptSharpIcon style={{ fontSize: "20", marginRight: "3" }} />{"Invoice List"}        
          </Link>
        </SidebarItem>

        <SidebarItem isOpen={isOpen}>
          <Link style={{  borderRadius: '8px'}}to="documents" onClick={toggleSidebar}>
          <FileCopySharpIcon style={{ fontSize: "20", marginRight: "3" }} />{"Documents"}        
          </Link>
        </SidebarItem>

      </SidebarContainer>
      
    </>
  );
};

export default Sidebar;