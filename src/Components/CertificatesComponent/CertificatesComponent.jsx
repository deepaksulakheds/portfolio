import { Grid, IconButton, Tooltip, Typography } from "@mui/material";
import "./CertificatesComponent.css";
import React from "react";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

const certs = [
  {
    courseName: "AWS Cloud Technical Essentials",
    platform: "Coursera",
    certURL: "https://www.coursera.org/verify/3CFVBXCHWSW2",
  },
  {
    courseName: "DevOps on AWS: Code, Build, and Test",
    platform: "Coursera",
    certURL: "https://www.coursera.org/verify/D2P97VJKEKHA",
  },
  {
    courseName: "DevOps on AWS: Release and Deploy",
    platform: "Coursera",
    certURL: "https://www.coursera.org/verify/5L27XF7CU7RU",
  },
  {
    courseName: "Neural Networks and Deep Learning",
    platform: "Coursera",
    certURL: "https://www.coursera.org/verify/HD3A82GJQ4PN",
  },
];

export function CertificatesComponent(props) {
  return (
    <Grid className="certificateContainer">
      {certs.map((cert, index) => (
        <CourseCard key={index} {...cert} />
      ))}
    </Grid>
  );
}

function CourseCard(props) {
  return (
    <Grid className="courseCard">
      <Tooltip
        followCursor
        title={props.courseName}
        arrow
        enterDelay={500}
        leaveDelay={200}
        placement="top"
        componentsProps={{
          tooltip: {
            sx: {
              backgroundColor: "white",
              color: "black",
              fontSize: 14,
              fontWeight: "bold",
            },
          },
          arrow: { sx: { color: "white" } },
        }}
      >
        <Typography
          sx={{
            fontSize: 18,
            fontWeight: "bold",
            textWrap: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {props.courseName}
        </Typography>
      </Tooltip>
      <Typography sx={{ paddingLeft: 1, fontSize: 16 }}>
        {props.platform}
      </Typography>
      <Grid container sx={{ marginTop: "15px" }}>
        <Tooltip
          title="View Certificate"
          arrow
          placement="right"
          componentsProps={{
            tooltip: {
              sx: {
                backgroundColor: "white",
                color: "black",
                fontSize: 14,
                fontWeight: "bold",
              },
            },
            arrow: { sx: { color: "white" } },
          }}
        >
          <IconButton href={props.certURL} target="_blank">
            <WorkspacePremiumIcon
              sx={{
                color: "white",
                transition: "all ease-in-out 0.2s",
                // "&:hover": { color: "red" },
              }}
            />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
}
