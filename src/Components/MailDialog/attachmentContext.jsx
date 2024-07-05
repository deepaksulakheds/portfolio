import React, { createContext, useContext, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import { Alert, useTheme } from "@mui/material";

// Create a context for managing the Snackbar state
const AttachmentContext = createContext();

// Provider component that wraps your application
export const AttachmentProvider = ({ children }) => {
  //   console.log("children", children);
  const [isAttachmentEnabled, setIsAttachmentEnabled] = useState(false);

  // Function to show the Snackbar
  const toggleAttachment = () => {
    console.log("AttachmentContext", isAttachmentEnabled);
    setIsAttachmentEnabled(!isAttachmentEnabled);
  };

  return (
    <AttachmentContext.Provider
      value={{ isAttachmentEnabled, toggleAttachment }}
    >
      {children}
    </AttachmentContext.Provider>
  );
};

// Custom hook to use the Snackbar context
export const useAttachmentToggle = () => {
  const attachmentToggle = useContext(AttachmentContext);
  if (!attachmentToggle) {
    console.log("useAttachmentToggle must be used within a SnackbarProvider");
  }
  return attachmentToggle;
};

// Higher-Order Component to enhance a component with Snackbar functionality
export const withAttachmentToggle = (Component) => {
  return function WrappedComponent(props) {
    const attachmentToggle = useAttachmentToggle();
    return <Component {...props} attachmentToggle={attachmentToggle} />;
  };
};
