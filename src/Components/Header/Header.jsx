import React, { useState } from "react";
import "./header.css";
import Grid from "@mui/system/Unstable_Grid/Grid";
import { Chip, IconButton, Tooltip, Typography } from "@mui/material";
import { Call, GitHub, LinkedIn, LocationOn, Mail } from "@mui/icons-material";
import MailDialog from "../MailDialog/MailDialog";
import HeaderImageDialog from "./HeaderImageDialog";

function Header(props) {
  const [mailDialogVisible, setMailDialogVisible] = useState(false);
  const [imageDialogVisible, setImageDialogVisible] = useState(false);
  const [secretAlert, setSecretAlert] = useState(false);

  const [contacts, setContacts] = useState([
    {
      name: "Github",
      icon: <GitHub fontSize="medium" />,
      ref: "//github.com/deepaksulakheds",
      toolTip: "Deepak Sulakhe | Github",
    },
    {
      name: "LinkedIn",
      icon: <LinkedIn fontSize="medium" />,
      ref: "//www.linkedin.com/in/deepaksulakheds/",
      toolTip: "Deepak Sulakhe | LinkedIn",
    },
    {
      name: "call",
      icon: <Call fontSize="medium" />,
      ref: null,
      toolTip: "Call",
    },
    {
      name: "mail",
      icon: <Mail fontSize="medium" />,
      // ref: "mailto:deepaksulakheds@gmail.com",
      onclick: (e) => setMailDialogVisible(!mailDialogVisible),
      toolTip: "Contact Me",
    },
    {
      name: "location",
      icon: <LocationOn fontSize="medium" />,
      ref: "//www.google.com/maps/place/Gadag-Betageri,+Karnataka",
      toolTip: "Gadag | KA",
    },
  ]);

  return (
    <Grid
      className="headerContainer"
      style={{ display: "flex", padding: "20px", alignItems: "center" }}
    >
      <img
        onClick={() => setImageDialogVisible(true)}
        src="./deepak.jpg"
        className="image"
      />
      <Grid>
        <Typography
          variant="h5"
          sx={{ fontSize: "2rem", fontWeight: "550", marginBlock: "5px" }}
        >
          Deepak Sulakhe
        </Typography>
        <Chip
          onClick={(e) => setSecretAlert(!secretAlert)}
          label="Software Engineer 1"
          style={{
            color: "white",
            cursor: "text",
            fontWeight: "500",
            background: "rgba(255, 255, 255, 0.13)",
          }}
        />
        <Grid
          sx={{
            display: "flex",
            gap: "10px",
            marginTop: "20px",
            flexWrap: "wrap",
          }}
        >
          {contacts.map((contact) => (
            <Tooltip
              arrow
              key={contact.name}
              title={contact.toolTip}
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
              <IconButton
                target="blank"
                sx={{
                  padding: "0.4rem",
                  transition: "all ease-in-out 0.2s",
                  color: "white",
                  "&:hover": {
                    boxShadow: "inset 0 -4px 20px rgba(170, 137, 242, 1)",
                  },
                }}
                href={contact?.ref}
                onClick={contact.onclick ? contact.onclick : null}
              >
                {contact.icon}
              </IconButton>
            </Tooltip>
          ))}
        </Grid>
      </Grid>
      <MailDialog
        mailDialogVisible={mailDialogVisible}
        onclose={() => setMailDialogVisible(!mailDialogVisible)}
        secretAlert={secretAlert}
      />
      <HeaderImageDialog
        imageDialogVisible={imageDialogVisible}
        onClose={() => setImageDialogVisible(!imageDialogVisible)}
      />
    </Grid>
  );
}

export default Header;
