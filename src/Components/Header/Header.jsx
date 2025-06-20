import React, { useEffect, useMemo, useState } from "react";
import "./header.css";
import { Grid } from "@mui/system";
import { Chip, IconButton, Popover, Tooltip, Typography } from "@mui/material";
import {
  Call,
  GitHub,
  LinkedIn,
  LocationOn,
  Mail,
  Refresh,
} from "@mui/icons-material";
import MailDialog from "../MailDialog/MailDialog";
import HeaderImageDialog from "./HeaderImageDialog";
import { withAttachmentToggle } from "../MailDialog/attachmentContext";
import { getFormattedTimePeriod } from "../../utils/formatTimePeriod";

function Header({ attachmentToggle }) {
  const [mailDialogVisible, setMailDialogVisible] = useState(false);
  const [imageDialogVisible, setImageDialogVisible] = useState(false);
  const [secretAlert, setSecretAlert] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [age, setAge] = useState(
    getFormattedTimePeriod(`22-jun-1999`, `present`, `YMDhms`)
  );

  useEffect(() => {
    let ageInterval = null;
    const isAgeExists = contacts.some((contact) => contact.name === "age");

    if (attachmentToggle.isAttachmentEnabled && !isAgeExists) {
      setContacts((prevContacts) => {
        return [
          ...prevContacts,
          {
            name: "age",
            icon: <Refresh fontSize="medium" />,
            onclick: (e) =>
              setAnchorEl((prev) => (prev ? null : e.currentTarget)),
            toolTip: null,
            style: {
              boxShadow: "inset 0px 0px 22px 0px rgba(170, 137, 242, 1)",
            },
          },
        ];
      });

      ageInterval = setInterval(() => {
        setAge(getFormattedTimePeriod(`22-jun-1999`, `present`, `YMDhms`));
      });
    } else if (!attachmentToggle.isAttachmentEnabled && isAgeExists) {
      setContacts((prevContacts) => {
        return prevContacts.filter((contact) => contact.name !== "age");
      });

      clearInterval(ageInterval);
    }

    return () => {
      clearInterval(ageInterval);
    };
  }, [attachmentToggle.isAttachmentEnabled]);

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
        title="View more images"
        onClick={() => setImageDialogVisible(true)}
        loading="lazy"
        src="./deepak.jpg"
        className="image"
      />
      <Grid>
        <Typography
          variant="h5"
          sx={{ fontSize: "1.8rem", fontWeight: "550", marginBlock: "5px" }}
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
            border: "1px solid rgba(248, 246, 254, .2)",
            // background: "rgba(25, 17, 51, 1)",
            boxShadow: "inset 0px 0px 15px 8px rgba(255, 255, 255, 0.08)",
          }}
        />
        <Grid
          sx={{
            display: "flex",
            gap: "6px",
            marginTop: "5px",
            flexWrap: "wrap",
          }}
        >
          {contacts.map((contact) => (
            <Tooltip
              arrow
              key={contact.name}
              title={contact.toolTip}
              slotProps={{
                tooltip: {
                  sx: {
                    backgroundColor: "transparent",
                    boxShadow: "inset 0px 0px 30px 0px rgba(170, 137, 242, 1)",
                    fontSize: 13,
                  },
                },
                arrow: {
                  sx: {
                    color: "rgba(170, 137, 242, 0.6)",
                  },
                },
              }}
            >
              <IconButton
                target="blank"
                sx={{
                  padding: "0.5rem",
                  transition: "all ease-in-out 0.15s",
                  color: "white",
                  "&:hover": {
                    boxShadow: "inset 0px 0px 22px 0px rgba(170, 137, 242, 1)",
                    // boxShadow: "inset 0px 0px 22px 0px #aa89f2",
                  },
                  ...(anchorEl && contact.style),
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
      <Popover
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: "transparent",
              boxShadow: "inset 0px 0px 30px 0px rgba(170, 137, 242, 1)",
              fontSize: 13,
              color: "white",
              padding: "8px",
            },
          },
        }}
      >
        {age}
      </Popover>
    </Grid>
  );
}

export default withAttachmentToggle(Header);
