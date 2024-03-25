import { GitHub } from "@mui/icons-material";
import { Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import "./projectComponent.css";

const projData = [
  {
    title: "Telematic Analytics - Zeliot",
    techUsed: "JavaScript, NodeJS, React JS, GraphQL, ApolloServer",
    image: "/icons/fleet.jpg",
    path: "https://github.com/deepaksulakheds/Zeliot_Telematic_Project",
  },
  {
    title: "Dashboard - Zeliot Analytics",
    techUsed: "React JS, Node JS, Apollo-Server, MUI, HTML, CSS, ",
    image: "/icons/dashboard.png",
    path: "https://github.com/deepaksulakheds/Zeliot-Analytics-Dashboard",
  },
  {
    title: "Face Recognition using LBPH",
    techUsed: "Python, OpenCV, Haar-Cascade Classifier, LBPH Algorithm",
    image: "/icons/face-rec.jpg",
    path: "https://github.com/deepaksulakheds/Face-Recognition-using-LBPH",
  },
  {
    title: "Rice Mill Management System",
    techUsed: "HTML, CSS, PHP, Bootstrap 5, WAMP",
    image: "/icons/riceMill.jpeg",
    path: "#",
  },
  {
    title: "Fruits Classification using CNN",
    techUsed: "Python, Deep Learning, CNN",
    image: "/icons/fruits.jpg",
    path: "#",
  },
];

function ProjectsComponent(props) {
  return (
    <Grid className="projectContainer">
      {projData.map((project) => (
        <Grid key={project.title} width={300}>
          <Grid
            sx={{
              marginBottom: 1,
              borderRadius: 3,
              height: 150,
              width: 300,
              overflow: "hidden",
              transition: "transform 0.3s ease",
              ":hover>img": {
                transform: "scale(1.1)",
                borderRadius: 3,
                transition: "all 0.3s ease-in-out",
              },
            }}
          >
            <img
              src={project.image}
              alt={project.title}
              style={{
                borderRadius: 3,
                height: "100%",
                width: "100%",
                objectFit: "cover",
              }}
            />
          </Grid>
          <Grid
            style={{
              fontWeight: "bold",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {project.title}
            <IconButton
              sx={{
                color: "white",
                "&:hover": {
                  color: "black",
                  backgroundColor: "rgba(255, 255, 255)",
                },
              }}
              href={project.path}
            >
              <GitHub />
            </IconButton>
          </Grid>
          <Typography>{project.techUsed}</Typography>
        </Grid>
      ))}
    </Grid>
  );
}

export default ProjectsComponent;
