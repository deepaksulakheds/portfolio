import { GitHub } from "@mui/icons-material";
import { Chip, Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import "./projectComponent.css";

const projData = [
  {
    title: "Telematic Analytics - Zeliot",
    techUsed: [
      "JavaScript",
      " NodeJS",
      " React JS",
      `MUI`,
      " GraphQL",
      " ApolloServer",
    ],
    image: "./icons/fleet.jpg",
    path: "https://github.com/deepaksulakheds/Zeliot_Telematic_Project",
  },
  {
    title: "Dashboard - Zeliot Analytics",
    techUsed: [
      "React JS",
      " Node JS",
      " Apollo-Server",
      " MUI",
      " HTML",
      " CSS",
    ],
    image: "./icons/dashboard.png",
    path: "https://github.com/deepaksulakheds/Zeliot-Analytics-Dashboard",
  },
  {
    title: "Face Recognition using LBPH",
    techUsed: [
      "Python",
      " OpenCV",
      " Nympy",
      " Pandas",
      " Haar-Cascade Classifier",
      " LBPH Algorithm",
    ],
    image: "./icons/face-rec.jpg",
    path: "https://github.com/deepaksulakheds/Face-Recognition-using-LBPH",
  },
  {
    title: "Rice Mill Management System",
    techUsed: ["HTML", " CSS", " PHP", " Bootstrap 5", " WAMP"],
    image: "./icons/riceMill.jpeg",
    path: "#",
  },
  {
    title: "Fruits Classification using CNN",
    techUsed: [
      "Python",
      " Deep Learning",
      " CNN",
      " Kaggle",
      " Numpy",
      `Matplotlib`,
      `Seaborn`,
    ],
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
              loading="lazy"
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
          <Grid sx={{ padding: "0.2rem" }}>
            <Grid
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "0.5rem 0",
              }}
            >
              <Typography sx={{ fontWeight: "500", color: "#aa89f2" }}>
                {project.title}
              </Typography>
              <IconButton
                target="blank"
                href={project.path}
                sx={{
                  padding: "0",
                  color: "white",
                  transition: "all ease-in-out 0.15s",
                  "&:hover": {
                    color: "#aa89f2",
                  },
                }}
              >
                <GitHub />
              </IconButton>
            </Grid>
            <Grid>
              {project.techUsed.map((tech, index) => (
                <Chip
                  key={index}
                  label={tech}
                  size="small"
                  style={{
                    color: "white",
                    cursor: "text",
                    margin: "2px",
                    fontWeight: "400",
                    border: "1px solid rgba(248, 246, 254, .2)",
                  }}
                />
              ))}
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}

export default ProjectsComponent;
