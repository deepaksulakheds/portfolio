import React, { useEffect, useMemo, useState } from "react";
import "./header.css";
import Grid from "@mui/system/Unstable_Grid/Grid";
import { Chip, IconButton, Tooltip, Typography } from "@mui/material";
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
import moment from "moment";
import { withAttachmentToggle } from "../MailDialog/attachmentContext";

const getFormattedAge = () => {
  const birthDate = moment("22-jun-1999", "D-MMM-YYYY");
  const timePeriod = moment.duration(moment().diff(birthDate));

  const timeComponents = [
    timePeriod.years() > 0 && `${timePeriod.years()}Y`,
    timePeriod.months() > 0 && `${timePeriod.months()}M`,
    timePeriod.days() > 0 && `${timePeriod.days()}D`,
    timePeriod.hours() > 0 && `${timePeriod.hours()}H`,
    timePeriod.minutes() > 0 && `${timePeriod.minutes()}M`,
  ].filter(Boolean);

  return `${timeComponents.slice(0, 3).join(" - ")}, ${timeComponents
    .slice(3, 5)
    .join(" : ")}`;
};

function Header({ attachmentToggle }) {
  const [mailDialogVisible, setMailDialogVisible] = useState(false);
  const [imageDialogVisible, setImageDialogVisible] = useState(false);
  const [secretAlert, setSecretAlert] = useState(false);

  const optimizedAgeTooltip = useMemo(() => getFormattedAge(), []);

  useEffect(() => {
    const isAgeExists = contacts.some((contact) => contact.name === "age");
    if (attachmentToggle.isAttachmentEnabled && !isAgeExists) {
      setContacts((prevContacts) => {
        return [
          ...prevContacts,
          {
            name: "age",
            icon: <Refresh fontSize="medium" />,
            toolTip: optimizedAgeTooltip,
          },
        ];
      });
    } else if (!attachmentToggle.isAttachmentEnabled && isAgeExists) {
      setContacts((prevContacts) => {
        return prevContacts.filter((contact) => contact.name !== "age");
      });
    }
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
        onClick={() => setImageDialogVisible(true)}
        loading="lazy"
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
            border: "1px solid rgba(248, 246, 254, .2)",
            // background: "rgba(25, 17, 51, 1)",
            boxShadow: "inset 0px 0px 15px 8px rgba(255, 255, 255, 0.08)",
          }}
        />
        <Grid
          sx={{
            display: "flex",
            gap: "6px",
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

export default withAttachmentToggle(Header);
