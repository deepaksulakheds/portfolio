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
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { withSnackbar } from "../SharedSnackbar/SharedSnackbar";
import { SEND_MAIL_QUERY } from "../queries";
import "./MailDialog.css";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import CancelIcon from "@mui/icons-material/Cancel";
import { withAttachmentToggle } from "./attachmentContext";
import { useMutation } from "@apollo/client";

function MailDialog({
  mailDialogVisible,
  onclose,
  snackbar,
  secretAlert,
  attachmentToggle,
}) {
  // console.log("attachmentToggle", attachmentToggle);
  const [sendMail] = useMutation(SEND_MAIL_QUERY);

  const [contactDetails, setContactDetails] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [filesUploaded, setFilesUploaded] = useState([]);
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
    setFilesUploaded([]);
  }, [mailDialogVisible]);

  const handleChange = async (event) => {
    setContactDetails({
      ...contactDetails,
      [event.target.name]: event.target.value,
    });

    handleValidity(event);
  };

  const handleFilesUpload = async (event) => {
    // const files = [];
    // for (const file of Array.from(event.target.files)) {
    //   const buffer = await file.arrayBuffer();
    //   // console.log("buffer", buffer);
    //   // const bytes = new Uint8Array(buffer);
    //   // files.push({
    //   //   fileName: file.name,
    //   //   Uint8Array: file.text(),
    //   // });
    //   const encrypted = CryptoJS.AES.encrypt(
    //     JSON.stringify(buffer),
    //     import.meta.env.VITE_APP_AES_SECRET
    //   ).toString();
    //   console.log("encrypted", encrypted);

    //   const resp = await axios.request({
    //     method: "post",
    //     maxBodyLength: Infinity,
    //     url: import.meta.env.VITE_APP_BACKEND_URL,
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     data: JSON.stringify({ payload: encrypted }),
    //   });
    // }

    if (event.target.files.length) {
      if (Array.from(event.target.files).length > 5) {
        snackbar.showSnackbar("Max 5 files allowed.", "error");
      } else {
        setFilesUploaded(Array.from(event.target.files));
      }
    }
  };

  const handleRemoveFile = async (removedFile) => {
    console.log("file", removedFile);
    setFilesUploaded(
      filesUploaded.filter((file) => file.name !== removedFile.name)
    );
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
    try {
      if (
        contactDetails.email &&
        contactDetails.message &&
        contactDetails.name &&
        contactDetails.subject
      ) {
        setLoading(true);
        const resp = await sendMail({
          variables: { ...contactDetails, isSecretAlert: secretMailAlert },
        });
        if (resp.data && resp.data.sendMail.status == 200) {
          snackbar.showSnackbar("Mail sent successfully.", "success");
          onclose();
        } else {
          snackbar.showSnackbar(resp.data.sendMail.message, "error");
        }
        setLoading(false);
      } else {
        snackbar.showSnackbar("Please fill all the fields.", "error");
      }
    } catch (err) {
      setLoading(false);
      // console.log(err);
      if (err.message.toString().toLowerCase().includes("401")) {
        snackbar.showSnackbar("Request Unauthorized.", "error");
      } else {
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
      sx={{ backdropFilter: "blur(13px)" }}
      PaperProps={{
        style: {
          borderRadius: "10px",
          background: "#211e29",
          // border: " 1px solid rgba(111, 65, 210, 0.4)",
        },
      }}
    >
      <DialogTitle
        sx={{ color: "white", fontWeight: "bold", padding: "18px 20px" }}
        onClick={secretMailAlertHandler}
      >
        Contact Me
      </DialogTitle>
      <Grid
        style={{ display: "flex", justifyContent: "center", color: "white" }}
      >
        <Divider
          color="white"
          sx={{ color: "white", backgroundColor: "white" }}
          style={{ color: "white" }}
          width="92%"
        />
      </Grid>
      <DialogContent
        sx={{
          padding: "20px",
          scrollbarWidth: "thin",
        }}
      >
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
          }}
        >
          <Grid>
            <TextField
              InputLabelProps={{
                style: {
                  color: errors.name ? "red" : "rgba(255,255,255,0.6)",
                },
              }}
              InputProps={{
                style: {
                  color: errors.name ? "red" : "white",
                },
              }}
              sx={{
                "& .MuiInput-underline:before": {
                  borderBottom: "1px solid",
                  borderBottomColor: errors.name
                    ? "red"
                    : "rgba(255,255,255,0.3)", // Error color or default color
                },
                "& .MuiInput-underline:hover": {
                  borderBottomColor: "rgba(255,255,255,0.5)", // Error color or default color
                },
                "& .MuiInput-underline:hover:before": {
                  borderBottom: "2px solid",
                  borderBottomColor: errors.name
                    ? "red"
                    : "rgba(255,255,255,0.3)", // Error color or default color
                },
                "& .MuiInput-underline:after": {
                  borderBottom: "2px solid",
                  borderBottomColor: errors.name
                    ? "red"
                    : "rgba(255,255,255,0.3)", // Error color or default color
                },
              }}
              variant="standard"
              fullWidth
              value={contactDetails.name}
              name="name"
              onChange={handleChange}
              label={errors.name ? "Enter valid name." : "Enter Name *"}
              error={!!errors.name}
              // onBlur={handleValidity}
            />
            <TextField
              InputLabelProps={{
                style: {
                  color: errors.email ? "red" : "rgba(255,255,255,0.6)",
                },
              }}
              InputProps={{ style: { color: errors.email ? "red" : "white" } }}
              sx={{
                "& .MuiInput-underline:before": {
                  borderBottom: "1px solid",
                  borderBottomColor: errors.email
                    ? "red"
                    : "rgba(255,255,255,0.3)",
                },
                "& .MuiInput-underline:hover": {
                  borderBottomColor: "rgba(255,255,255,0.5)",
                },
                "& .MuiInput-underline:hover:before": {
                  borderBottom: "2px solid",
                  borderBottomColor: errors.email
                    ? "red"
                    : "rgba(255,255,255,0.3)",
                },
                "& .MuiInput-underline:after": {
                  borderBottom: "2px solid",
                  borderBottomColor: errors.email
                    ? "red"
                    : "rgba(255,255,255,0.3)",
                },
              }}
              fullWidth
              variant="standard"
              value={contactDetails.email}
              name="email"
              onChange={handleChange}
              label={errors.email ? "Enter valid E-Mail." : "Enter E-Mail *"}
              error={!!errors.email}
              // onBlur={handleValidity}
            />
            <TextField
              InputLabelProps={{ style: { color: "rgba(255,255,255,0.6)" } }}
              InputProps={{ style: { color: "white" } }}
              sx={{
                "& .MuiInput-underline:before": {
                  borderBottom: "1px solid",
                  borderBottomColor: "rgba(255,255,255,0.3)",
                },
                "& .MuiInput-underline:hover": {
                  borderBottomColor: "rgba(255,255,255,0.5)",
                },
                "& .MuiInput-underline:hover:before": {
                  borderBottom: "2px solid",
                  borderBottomColor: "rgba(255,255,255,0.3)",
                },
                "& .MuiInput-underline:after": {
                  borderBottom: "2px solid",
                  borderBottomColor: "rgba(255,255,255,0.3)",
                },
              }}
              fullWidth
              value={contactDetails.subject}
              variant="standard"
              name="subject"
              onChange={handleChange}
              label="Enter Subject *"
            />
            <TextField
              multiline
              InputLabelProps={{ style: { color: "rgba(255,255,255,0.6)" } }}
              InputProps={{ style: { color: "white" } }}
              sx={{
                "& .MuiInput-underline:before": {
                  borderBottom: "1px solid",
                  borderBottomColor: "rgba(255,255,255,0.3)",
                },
                "& .MuiInput-underline:hover": {
                  borderBottomColor: "rgba(255,255,255,0.5)",
                },
                "& .MuiInput-underline:hover:before": {
                  borderBottom: "2px solid",
                  borderBottomColor: "rgba(255,255,255,0.3)",
                },
                "& .MuiInput-underline:after": {
                  borderBottom: "2px solid",
                  borderBottomColor: "rgba(255,255,255,0.3)",
                },
              }}
              fullWidth
              value={contactDetails.message}
              variant="standard"
              name="message"
              onChange={handleChange}
              label="Enter Enter Message *"
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
                border: "1px solid rgba(255,255,255,.6)",
                borderRadius: "7px",
                textTransform: "none",
                color: "white",
                fontWeight: "bold",
                ...(secretMailAlert && {
                  textTransform: "uppercase",
                }),
                "&:hover": {
                  boxShadow: "inset 0px 0px 22px 0px rgba(170, 137, 242, 1)",
                  // boxShadow: "inset 0px 0px 22px 0px #aa89f2",
                },
              }}
              onClick={onclose}
            >
              Cancel
            </Button>
            <Button
              sx={{
                height: 40,
                width: 90,
                textTransform: secretMailAlert ? "uppercase" : "none",
                borderRadius: "7px",
                fontWeight: "bold",
                border: !!(errors.name || errors.email)
                  ? "1px solid rgba(255,0,0,1)"
                  : "1px solid rgba(255,255,255,0.6)",
                color: !!(errors.name || errors.email)
                  ? "rgba(255,0,0,1) !important"
                  : "rgba(255,255,255,1) !important",
                "&:hover": {
                  boxShadow: "inset 0px 0px 22px 0px rgba(170, 137, 242, 1)",
                  // boxShadow: "inset 0px 0px 22px 0px #aa89f2",
                },
              }}
              onClick={(e) => handleSubmit(e)}
              disabled={!!(errors.name || errors.email || loading)}
            >
              {loading ? (
                <CircularProgress size={25} color="inherit" />
              ) : (
                "Send"
              )}
            </Button>
          </Grid>
          {attachmentToggle.isAttachmentEnabled && (
            <Grid>
              <input
                type="file"
                multiple
                accept="*.jpg"
                name="files"
                style={{ display: "none" }}
                id="files"
                onChange={handleFilesUpload}
                label={"Select files."}
              />
              <Grid sx={{ display: "flex", alignItems: "center" }}>
                <label htmlFor="files">
                  <Tooltip
                    arrow
                    placement="left"
                    title="Attach files."
                    componentsProps={{
                      tooltip: {
                        sx: {
                          backgroundColor: "rgba(170, 137, 242, 0.7)",
                          fontSize: 12,
                          fontWeight: "bold",
                        },
                      },
                      arrow: {
                        sx: {
                          color: "rgba(170, 137, 242, 0.7)",
                        },
                      },
                    }}
                  >
                    <FileUploadRoundedIcon
                      sx={{
                        height: 30,
                        width: 30,
                        padding: 0.5,
                        border: "1px solid rgba(255, 255, 255)",
                        borderRadius: "7px",
                        transition: "all 0.2s ease-in-out",
                        color: "white",
                        cursor: "pointer",
                        "&:hover": {
                          boxShadow:
                            "inset 0px 0px 28px rgba(170, 137, 242, 1)",
                        },
                      }}
                    />
                  </Tooltip>
                </label>
                <Grid
                  item
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    margin: 2,
                    gap: 2,
                  }}
                >
                  {filesUploaded.length > 0 ? (
                    filesUploaded.map((file, index) => (
                      <Tooltip
                        arrow
                        key={file.name}
                        title={file.name}
                        componentsProps={{
                          tooltip: {
                            sx: {
                              backgroundColor: "rgba(170, 137, 242, 0.7)",
                              fontSize: 12,
                              fontWeight: "bold",
                            },
                          },
                          arrow: { sx: { color: "rgba(170, 137, 242, 0.7)" } },
                        }}
                      >
                        <Grid
                          sx={{
                            padding: 1,
                            color: "white",
                            display: "flex",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            "&:hover": {
                              outline: "1.5px solid white",
                              borderRadius: "7px",
                            },
                          }}
                        >
                          {/* Increase index just to display (not affected to actual index*/}
                          {index + 1}
                          <CancelIcon
                            onClick={() => handleRemoveFile(file)}
                            sx={{
                              color: "#ff6865",
                              cursor: "pointer",
                              alignSelf: "flex-start",
                              marginTop: -1,
                              marginRight: -1,
                              transition: "all 0.2s ease-in-out",
                              "&:hover": {
                                color: "red",
                              },
                            }}
                          />
                        </Grid>
                      </Tooltip>
                    ))
                  ) : (
                    <Typography
                      sx={{ fontSize: 17, fontWeight: "bold", color: "white" }}
                    >
                      No files attached.
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default withAttachmentToggle(withSnackbar(MailDialog));
