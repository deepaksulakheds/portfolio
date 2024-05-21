import React, { createContext, useContext, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import { Alert, useTheme } from "@mui/material";

// Create a context for managing the Snackbar state
const SnackbarContext = createContext();

// Provider component that wraps your application
export const SnackbarProvider = ({ children }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");

  const theme = useTheme();

  // Function to show the Snackbar
  const showSnackbar = (message, severity = "info") => {
    // console.log("message, severity", message, severity);
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  // Function to hide the Snackbar
  const hideSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar, hideSnackbar }}>
      {children}
      <Snackbar
        open={snackbarOpen}
        ClickAwayListenerProps={{ onClickAway: () => null }}
        autoHideDuration={5000}
        onClose={hideSnackbar}
      >
        <Alert
          sx={{
            backgroundColor: "transparent",
            color: theme.palette[snackbarSeverity].main,
            border: `3px solid ${theme.palette[snackbarSeverity].main}`,
            borderRadius: "10px",
            fontWeight: "bold",
          }}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

// Custom hook to use the Snackbar context
export const useSnackbar = () => {
  const snackbar = useContext(SnackbarContext);
  if (!snackbar) {
    console.log("useSnackbar must be used within a SnackbarProvider");
  }
  return snackbar;
};

// Higher-Order Component to enhance a component with Snackbar functionality
export const withSnackbar = (Component) => {
  return function WrappedComponent(props) {
    const snackbar = useSnackbar();
    return <Component {...props} snackbar={snackbar} />;
  };
};
