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
import { useStyles } from "./styles";
import { withSnackbar } from "../SharedSnackbar/SharedSnackbar";

function MailDialog({ mailDialogVisible, onclose, snackbar }) {
  const [contactDetails, setContactDetails] = useState({
    name: "",
    mail: "",
    subject: "",
    message: "",
  });
  const styledClasses = useStyles();

  useEffect(() => {
    return () => {
      setContactDetails({ name: "", mail: "", subject: "", message: "" });
    };
  }, []);

  const handleChange = (event) => {
    setContactDetails({
      ...contactDetails,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    if (
      contactDetails.mail &&
      contactDetails.message &&
      contactDetails.name &&
      contactDetails.subject
    ) {
      // console.log("contactDetails", contactDetails);
      snackbar.showSnackbar("Feature comming soon.", "info");
    } else {
      snackbar.showSnackbar("Please enter all the fields.", "error");
    }
  };

  return (
    <Dialog
      open={mailDialogVisible}
      onClose={onclose}
      sx={{ backdropFilter: "blur(3px)" }}
      PaperProps={{
        style: {
          borderRadius: "15px",
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
              value={contactDetails.mail}
              name="mail"
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
