import { GitHub } from "@mui/icons-material";
import { Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import "./projectComponent.css";
import { Box, Container } from "@mui/system";

const projData = [
  {
    title: "Telematic Analytics - Zeliot",
    techUsed: "JavaScript, NodeJS, React JS, GraphQL, ApolloServer",
    image: "./icons/fleet.jpg",
    path: "https://github.com/deepaksulakheds/Zeliot_Telematic_Project",
  },
  {
    title: "Dashboard - Zeliot Analytics",
    techUsed: "React JS, Node JS, Apollo-Server, MUI, HTML, CSS, ",
    image: "./icons/dashboard.png",
    path: "https://github.com/deepaksulakheds/Zeliot-Analytics-Dashboard",
  },
  {
    title: "Face Recognition using LBPH",
    techUsed:
      "Python, OpenCV, Haar-Cascade Classifier, LBPH Algorithm, Nympy, Pandas",
    image: "./icons/face-rec.jpg",
    path: "https://github.com/deepaksulakheds/Face-Recognition-using-LBPH",
  },
  {
    title: "Rice Mill Management System",
    techUsed: "HTML, CSS, PHP, Bootstrap 5, WAMP",
    image: "./icons/riceMill.jpeg",
    path: "#",
  },
  {
    title: "Fruits Classification using CNN",
    techUsed: "Python, Deep Learning, CNN, Kaggle, Numpy",
    image: "./icons/fruits.jpg",
    path: "https://github.com/deepaksulakheds/fruits-classification-cnn",
  },
];

function ProjectsComponent(props) {
  return (
    <Grid className="projectContainer">
      {projData.map((project) => (
        <Grid
          key={project.title}
          sx={{
            ":hover > div > img": {
              transform: "scale(1.15)",
              transition: "all 0.3s ease-in-out",
            },
          }}
          width={300}
        >
          <Grid
            sx={{
              // marginBottom: 1,
              borderRadius: 3,
              height: 150,
              width: 300,
              overflow: "hidden",
              transition: "all 0.3s ease-in-out",
            }}
          >
            {/* <Container style={{ padding: 0 }}> */}
            <img
              src={project.image}
              alt={project.title}
              style={{
                borderRadius: 3,
                height: "100%",
                width: "100%",
                objectFit: "cover",
                transition: "all 0.3s ease-in-out",
              }}
            />
            {/* </Container> */}
          </Grid>
          <Grid sx={{ padding: "0.4rem" }}>
            <Grid
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontWeight: "500" }}>
                {project.title}
              </Typography>
              <IconButton
                sx={{
                  padding: "0.5rem",
                  color: "white",
                  transition:"all ease-in-out 0.15s",
                  "&:hover": {
                    boxShadow: "inset 0 -4px 20px rgba(170, 137, 242, 1)",
                  },
                }}
                target="blank"
                href={project.path}
              >
                <GitHub />
              </IconButton>
            </Grid>
            <Typography sx={{ fontSize: 13 }}>{project.techUsed}</Typography>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}

export default ProjectsComponent;
