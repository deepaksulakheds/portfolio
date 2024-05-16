import {
  Grid,
  Dialog,
  DialogTitle,
  Divider,
  DialogContent,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { withSnackbar } from "../SharedSnackbar/SharedSnackbar";
import CryptoJS from "crypto-js";
import { SEND_MAIL_QUERY } from "../queries";
import axios from "axios";

function MailDialog({ mailDialogVisible, onclose, snackbar }) {
  const [contactDetails, setContactDetails] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    return () => {
      setContactDetails({ name: "", email: "", subject: "", message: "" });
    };
  }, []);

  const handleChange = async (event) => {
    setContactDetails({
      ...contactDetails,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    console.log("meta", import.meta.env.VITE_APP_BACKEND_URL);
    try {
      if (
        contactDetails.email &&
        contactDetails.message &&
        contactDetails.name &&
        contactDetails.subject
      ) {
        // console.log("contactDetails", contactDetails);
        const encryptedData = CryptoJS.AES.encrypt(
          JSON.stringify({
            query: SEND_MAIL_QUERY,
            variables: contactDetails,
          }),
          import.meta.env.VITE_APP_AES_SECRET
        ).toString();
        // console.log("encryptedData", { encryptedData: encryptedData });
        const resp = await axios.request({
          method: "post",
          maxBodyLength: Infinity,
          url: import.meta.env.VITE_APP_BACKEND_URL,
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify({ encryptedData: encryptedData }),
        });
        if (resp.data) {
          console.log("resp.data", resp.data);
          snackbar.showSnackbar("Mail Sent.", "success");
        }
        // snackbar.showSnackbar("Feature comming soon.", "info");
      } else {
        snackbar.showSnackbar("Please enter all the fields.", "error");
      }
    } catch (err) {
      console.log("Error", err);
      if (err.name.toString().toLowerCase().includes("axios")) {
        console.log("mailResp", err.response.data.message);
        snackbar.showSnackbar(err.response.data.message, "error");
      } else {
        console.log("catch else", err);
        snackbar.showSnackbar(err.message, "error");
      }
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
      <DialogTitle sx={{ color: "white", fontWeight: "bold" }}>
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
                style: { color: "white" },
              }}
              InputProps={{ style: { color: "white" } }}
              variant="standard"
              fullWidth
              value={contactDetails.name}
              name="name"
              onChange={handleChange}
              label="Enter Name"
            />
            <TextField
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{ style: { color: "white" } }}
              fullWidth
              variant="standard"
              value={contactDetails.email}
              name="email"
              onChange={handleChange}
              label="Enter E-Mail"
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
                border: "2px solid white",
                borderRadius: "7px",
                color: "white",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "white", color: "black" },
              }}
              onClick={onclose}
            >
              Cancel
            </Button>
            <Button
              sx={{
                border: "2px solid white",
                borderRadius: "7px",
                color: "white",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "white", color: "black" },
              }}
              onClick={(e) => handleSubmit()}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default withSnackbar(MailDialog);
