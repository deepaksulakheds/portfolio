import { Grid, Typography } from "@mui/material";
import React from "react";
import "./aboutComponent.css";

const skills = [
  {
    title: "Frontend",
    list: [
      { content: "React JS", icon: "./icons/react.svg" },
      { content: "Material UI", icon: "./icons/mui.svg" },
      { content: "Bootstrap", icon: "./icons/bootstrap.svg" },
      { content: "HTML", icon: "./icons/html.svg" },
      { content: "CSS", icon: "./icons/css.svg" },
    ],
  },
  {
    title: "Backend",
    list: [
      { content: "Node JS", icon: "./icons/nodejs.svg" },
      { content: "JavaScript", icon: "./icons/javascript.svg" },
      { content: "GraphQL", icon: "./icons/graphql.svg" },
      { content: "REST APIs", icon: "./icons/rest-api1.svg" },
      { content: "C / C++", icon: "./icons/cpp.svg" },
      { content: "Java", icon: "./icons/java.svg" },
      { content: "Python", icon: "./icons/python.svg" },
    ],
  },
  {
    title: "Database",
    list: [
      { content: "SQL", icon: "./icons/sql.svg" },
      { content: "No SQL", icon: "./icons/no-sql.svg" },
      { content: "MongoDB", icon: "./icons/mongodb.svg" },
      { content: "PostgresSQL", icon: "./icons/pgsql.svg" },
      { content: "Redis", icon: "./icons/redis.svg" },
    ],
  },
  {
    title: "Others",
    list: [
      { content: "Git, Github & Gitlab", icon: "./icons/git.svg" },
      { content: "ApolloServer", icon: "./icons/apollo-server.svg" },
      { content: "Docker", icon: "./icons/docker.svg" },
    ],
  },
];

function AboutComponent(props) {
  return (
    <Grid className="aboutContainer">
      <Grid>
        <Typography variant="p" sx={{ fontSize: "1.1rem" }}>
          Results-driven Software Engineer with hands-on experience in full
          stack development, including Node.js, React, and various databases.
          Dedicated to creating high-quality software solutions and improving
          user experiences. Eager to apply my skills and knowledge in a dynamic
          environment.
        </Typography>
      </Grid>
      <Grid className="skillsList">
        <Grid>
          <h3
            style={{
              marginTop: "25px",
              textDecoration: "underline",
              textUnderlineOffset: "5px",
              textDecorationThickness: "0.1px",
            }}
            // variant="h6"
          >
            Skills
          </h3>
        </Grid>
        <Grid className="skillContainer">
          {skills.map((skill, index) => (
            <Grid key={index} className="subSkill">
              <h3
                style={{
                  margin: "0 0 8px 0",
                  textDecoration: "underline",
                  textUnderlineOffset: "5px",
                  textDecorationThickness: "0.1px",
                }}
              >
                {skill.title}
              </h3>
              <Grid className="skillList">
                {skill.list.map((s) => (
                  <Grid key={s.content} className="skill">
                    <img
                      src={s.icon}
                      className="skillIcon"
                      height="32"
                      width="32"
                    />
                    <p className="skillContent">{s.content}</p>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default AboutComponent;
