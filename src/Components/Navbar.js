import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Sidebar from "./Sidebar";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "../Styles/Dashboard.css";
import IpikLogo from "../Images/ipik_logo.png";
import SashaLogo from "../Images/sasha_logo.png";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltSharpIcon from "@mui/icons-material/PeopleAltSharp";
import ReceiptSharpIcon from "@mui/icons-material/ReceiptSharp";
import FileCopySharpIcon from "@mui/icons-material/FileCopySharp";
import DescriptionSharpIcon from "@mui/icons-material/DescriptionSharp";

const Navbar = ({ setIsAuthenticated }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedButton, setSelectedButton] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Added Snackbar state
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  const handleIconClick = () => {
    setDialogOpen(true); // Show the Dialog for confirmation
  };

  const handleLogoutConfirmed = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("jwttoken"); // Call the onLogout function passed from the parent component
    setDialogOpen(false); // Close the Dialog after confirmation
    navigate("/login");
  };

  const handleDialogClose = () => {
    setDialogOpen(false); // Close the Dialog
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false); // Close the Snackbar
  };

  // Update selectedButton state when location changes
  useEffect(() => {
    const pathname = location.pathname;
    switch (pathname) {
      case "/":
        setSelectedButton("Dashboard");
        break;
      case "/new-client":
        setSelectedButton("New Client");
        break;
      case "/invoice-list":
        setSelectedButton("Invoice List");
        break;
      case "/documents":
        setSelectedButton("Documents");
        break;
      case "/verify-documents-list":
        setSelectedButton("Verify Documents List");
        break;
      default:
        setSelectedButton("");
        break;
    }
  }, [location.pathname]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="AppBar">
        <Toolbar>
          <img src={IpikLogo} alt="Logo" className="IpikLogo" />
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleSidebar}
          >
            <MenuIcon style={{ marginLeft: "8" }} />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Stack spacing={2} direction={{ xs: "column", md: "row" }}>
              <Button
                component={Link}
                to="/"
                variant="text"
                className={`appbarButtonLinks ${
                  selectedButton === "Dashboard" && "selectedButton"
                }`}
                onClick={() => handleButtonClick("Dashboard")}
              >
                <DashboardIcon style={{ fontSize: "20", marginRight: "3" }} />{" "}
                Dashboard
              </Button>

              <Button
                component={Link}
                to="/new-client"
                variant="text"
                className={`appbarButtonLinks ${
                  selectedButton === "New Client" && "selectedButton"
                }`}
                onClick={() => handleButtonClick("New Client")}
              >
                <PeopleAltSharpIcon
                  style={{ fontSize: "20", marginRight: "3" }}
                />{" "}
                New Client
              </Button>

              <Button
                component={Link}
                to="/invoice-list?from=navbar"
                variant="text"
                className={`appbarButtonLinks ${
                  selectedButton === "Invoice List" && "selectedButton"
                }`}
                onClick={() => handleButtonClick("Invoice List")}
              >
                <ReceiptSharpIcon
                  style={{ fontSize: "20", marginRight: "3" }}
                />
                Invoice List
              </Button>

              <Button
                component={Link}
                to="/documents"
                variant="text"
                className={`appbarButtonLinks ${
                  selectedButton === "Documents" && "selectedButton"
                }`}
                onClick={() => handleButtonClick("Documents")}
              >
                <FileCopySharpIcon
                  style={{ fontSize: "20", marginRight: "3" }}
                />
                Documents
              </Button>

              <Button
                component={Link}
                to="/verify-documents-list"
                variant="text"
                className={`appbarButtonLinks ${
                  selectedButton === "Verify Documents List" && "selectedButton"
                }`}
                onClick={() => handleButtonClick("Verify Documents List")}
              >
                <DescriptionSharpIcon
                  style={{ fontSize: "20", marginRight: "3" }}
                />
                Verify Documents List
              </Button>
            </Stack>
          </Typography>

          <div>
            <img src={SashaLogo} alt="Logo" className="SashaLogo" />
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={handleIconClick}
            >
              <AccountCircle />
            </IconButton>
          </div>

          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            message="You are being redirected to login."
          />

          <Dialog
            open={dialogOpen}
            onClose={handleDialogClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle
              id="alert-dialog-title"
              style={{ textAlign: "center", color: "red" }}
            >
              {"Are you leaving?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to log out? All your unsaved data will be
                lost.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleLogoutConfirmed} color="primary" autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>

          <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
