import {
  Grid,
  Dialog,
  DialogTitle,
  Divider,
  DialogContent,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { withSnackbar } from "../SharedSnackbar/SharedSnackbar";
import CryptoJS from "crypto-js";
import { SEND_MAIL_QUERY } from "../queries";
import axios from "axios";

function MailDialog({ mailDialogVisible, onclose, snackbar, secretAlert }) {
  const [contactDetails, setContactDetails] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [secretMailAlert, setSecretMailAlert] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.log("cleared");
    setContactDetails({ name: "", email: "", subject: "", message: "" });
    setErrors({ name: "", email: "" });
    setSecretMailAlert(false);
  }, [mailDialogVisible]);

  const handleChange = async (event) => {
    setContactDetails({
      ...contactDetails,
      [event.target.name]: event.target.value,
    });

    handleValidity(event);
  };

  const handleValidity = (event) => {
    if (event.target.name === "name") {
      const nameRegex = /^[A-Za-z ]{3,30}$/;
      if (!nameRegex.test(event.target.value)) {
        setErrors({ ...errors, name: "Only alphabets and spaces are allowed" });
      } else {
        setErrors({ ...errors, name: "" });
      }
    } else if (event.target.name === "email") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(event.target.value)) {
        setErrors({ ...errors, email: "Enter a valid email address" });
      } else {
        setErrors({ ...errors, email: "" });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("meta", import.meta.env.VITE_APP_BACKEND_URL);
    try {
      if (
        contactDetails.email &&
        contactDetails.message &&
        contactDetails.name &&
        contactDetails.subject
      ) {
        setLoading(true);
        // await new Promise((resolve) => setTimeout(() => resolve(true), 10000));
        // console.log("contactDetails", contactDetails);
        const encryptedData = CryptoJS.AES.encrypt(
          JSON.stringify({
            query: SEND_MAIL_QUERY,
            variables: { ...contactDetails, isSecretAlert: secretMailAlert },
          }),
          import.meta.env.VITE_APP_AES_SECRET
        ).toString();
        console.log("encryptedData", { encryptedData: encryptedData });
        const resp = await axios.request({
          method: "post",
          maxBodyLength: Infinity,
          url: import.meta.env.VITE_APP_BACKEND_URL,
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify({ payload: encryptedData }),
        });
        setLoading(false);
        if (resp.data) {
          console.log("resp.data", resp.data);
          snackbar.showSnackbar("Mail Sent.", "success");
          onclose();
        }
        // snackbar.showSnackbar("Feature comming soon.", "info");
      } else {
        snackbar.showSnackbar("Please enter all the fields.", "error");
      }
    } catch (err) {
      setLoading(false);
      // console.log("Error", err);
      if (err.message.toString().toLowerCase().includes("400")) {
        // console.log("mailResp", err.response.data.message);
        snackbar.showSnackbar(err.response.data.message, "error");
      } else {
        // console.log("catch else", err);
        snackbar.showSnackbar(err.message, "error");
      }
    }
  };

  const secretMailAlertHandler = async () => {
    if (secretAlert) {
      setSecretMailAlert(!secretMailAlert);
      console.log("setSecretMailAlert");
    }
  };

  return (
    <Dialog
      open={mailDialogVisible}
      onClose={onclose}
      sx={{ backdropFilter: "blur(10px)" }}
      PaperProps={{
        style: {
          borderRadius: "10px",
          background: "#2A2A2A",
          border: "2px solid rgba(255, 255, 255)",
        },
      }}
    >
      <DialogTitle
        sx={{ color: "white", fontWeight: "bold" }}
        onClick={secretMailAlertHandler}
      >
        Contact Me
      </DialogTitle>
      <Grid style={{ display: "flex", justifyContent: "center" }}>
        <Divider color="white" width="90%" />
      </Grid>
      <DialogContent sx={{ padding: "20px" }}>
        <Grid sx={{ display: "flex", flexDirection: "column", gap: "30px" }}>
          <Grid>
            <TextField
              InputLabelProps={{
                style: { color: errors.name ? "red" : "white" },
              }}
              InputProps={{ style: { color: errors.name ? "red" : "white" } }}
              variant="standard"
              fullWidth
              value={contactDetails.name}
              name="name"
              onChange={handleChange}
              label={errors.name ? "Enter valid name." : "Enter Name"}
              error={!!errors.name}
              // onBlur={handleValidity}
            />
            <TextField
              InputLabelProps={{
                style: { color: errors.email ? "red" : "white" },
              }}
              InputProps={{ style: { color: errors.email ? "red" : "white" } }}
              fullWidth
              variant="standard"
              value={contactDetails.email}
              name="email"
              onChange={handleChange}
              label={errors.email ? "Enter valid E-Mail." : "Enter E-Mail"}
              error={!!errors.email}
              // onBlur={handleValidity}
            />
            <TextField
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{ style: { color: "white" } }}
              fullWidth
              value={contactDetails.subject}
              variant="standard"
              name="subject"
              onChange={handleChange}
              label="Enter Subject"
            />
            <TextField
              multiline
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{ style: { color: "white" } }}
              fullWidth
              value={contactDetails.message}
              variant="standard"
              name="message"
              onChange={handleChange}
              label="Enter Enter Message"
            />
          </Grid>
          <Grid
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "auto",
            }}
          >
            <Button
              sx={{
                height: 40,
                width: 90,
                border: "2px solid white",
                borderRadius: "7px",
                color: "white",
                ...(secretMailAlert && { fontWeight: "bold" }),
                "&:hover": { backgroundColor: "white", color: "black" },
              }}
              onClick={onclose}
            >
              Cancel
            </Button>
            <Button
              sx={{
                height: 40,
                width: 90,
                border: !!(errors.name || errors.email)
                  ? "2px solid rgba(255, 255, 255,0.4)"
                  : "2px solid rgba(255, 255, 255)",
                borderRadius: "7px",
                color: "white",
                ...(secretMailAlert && { fontWeight: "bold" }),
                "&:hover": { backgroundColor: "white", color: "black" },
                "&:disabled": {
                  color: "rgba(255, 255, 255,0.4)",
                },
                "&:hover > *": {
                  color: "black", // Change color when parent is hovered
                },
              }}
              onClick={(e) => handleSubmit(e)}
              disabled={!!(errors.name || errors.email)}
            >
              {loading ? (
                <CircularProgress size={25} sx={{ color: "white" }} />
              ) : (
                "Submit"
              )}
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default withSnackbar(MailDialog);
