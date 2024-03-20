import React from "react";
import "./header.css";
import Grid from "@mui/system/Unstable_Grid/Grid";
import { Chip, IconButton, Tooltip, Typography } from "@mui/material";
import { Call, GitHub, LinkedIn, LocationOn, Mail } from "@mui/icons-material";

const contacts = [
  {
    name: "Github",
    icon: <GitHub fontSize="medium" />,
    ref: "//github.com",
    toolTip: "Deepak Sulakhe | Github",
  },
  {
    name: "LinkedIn",
    icon: <LinkedIn fontSize="medium" />,
    ref: "//linkedin.com",
    toolTip: "Deepak Sulakhe | LinkedIn",
  },
  {
    name: "call",
    icon: <Call fontSize="medium" />,
    ref: "callto:1234",
    toolTip: "Call",
  },
  {
    name: "mail",
    icon: <Mail fontSize="medium" />,
    ref: "mailto:deepak@zeliot.in",
    toolTip: "Deepaksulakheds@gmail.com",
  },
  {
    name: "location",
    icon: <LocationOn fontSize="medium" />,
    ref: "//www.google.com/maps/place/Gadag-Betageri,+Karnataka",
    toolTip: "Gadag | KA",
  },
];

function Header(props) {
  return (
    <Grid
      className="headerContainer"
      style={{ display: "flex", padding: "20px", alignItems: "center" }}
    >
      <img
        src="/deepak.jpg"
        style={{
          padding: "20px",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          height: "90px",
          width: "90px",
          marginRight: "20px",
          borderRadius: "50%",
        }}
      />
      <Grid>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Deepak Sulakhe
        </Typography>
        <Chip
          label="Software Engineer 1"
          style={{
            color: "white",
            background: "rgba(255, 255, 255, 0.1)",
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
            <Tooltip key={contact.name} title={contact.toolTip}>
              <IconButton
                sx={{
                  color: "white",
                  "&:hover": {
                    color: "black",
                    backgroundColor: "rgba(255, 255, 255, 0.6)",
                    // filter: "drop-shadow(0px 0px 5px 5px white)",
                  },
                }}
                href={contact.ref}
              >
                {contact.icon}
              </IconButton>
            </Tooltip>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Header;
