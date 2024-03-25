import { Grid, Typography } from "@mui/material";
import React from "react";
import "./aboutComponent.css";

const skills = [
  {
    title: "Frontend",
    list: [
      { content: "React JS", icon: "/icons/react.svg" },
      { content: "Material UI", icon: "/icons/mui.svg" },
      { content: "HTML", icon: "/icons/html.svg" },
      { content: "CSS", icon: "/icons/css.svg" },
      { content: "Bootstrap", icon: "/icons/bootstrap.svg" },
    ],
  },
  {
    title: "Backend",
    list: [
      { content: "Node JS", icon: "/icons/nodejs.svg" },
      { content: "JavaScript", icon: "/icons/javascript.svg" },
      { content: "Python", icon: "/icons/python.svg" },
      { content: "GraphQL", icon: "/icons/graphql.svg" },
      { content: "C/C++", icon: "/icons/cpp.svg" },
      { content: "Java", icon: "/icons/java.svg" },
    ],
  },
  {
    title: "Database",
    list: [
      { content: "MySQL", icon: "/icons/mysql.svg" },
      { content: "MongoDB", icon: "/icons/mongodb.svg" },
      { content: "PostgresSQL", icon: "/icons/pgsql.svg" },
      { content: "Redis", icon: "/icons/redis.svg" },
    ],
  },
  {
    title: "Others",
    list: [
      { content: "Git, Github & Gitlab", icon: "/icons/git.svg" },
      { content: "ApolloServer", icon: "/icons/apollo.svg" },
    ],
  },
];

function AboutComponent(props) {
  return (
    <Grid className="aboutContainer">
      <Grid>
        <Typography variant="h6">
          To be a part of an organization that provides ample opportunities for
          professional and personal growth, where i can use my skills for the
          success of the organization with continuous learning and dedication.
        </Typography>
      </Grid>
      <Grid className="skillsList">
        <Grid>
          <h2
            style={{
              marginTop: "25px",
              textDecoration: "underline",
              textUnderlineOffset: "5px",
              textDecorationThickness: "0.1px",
            }}
            // variant="h6"
          >
            Skills
          </h2>
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
