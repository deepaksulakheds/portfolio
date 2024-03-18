import React from "react";
import {
  Timeline,
  TimelineItem,
  timelineItemClasses,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import Typography from "@mui/material/Typography";
import { Book, BusinessCenter } from "@mui/icons-material";
import "./ExperienceComponent.css";
import { Grid } from "@mui/material";

const experienceData = [
  {
    title: "Software Engineer 1",
    company: "Zeliot Connectecd Services Pvt. Ltd.",
    description: "asd",
  },
  {
    title: "Full Stack Developer Intern",
    company: "Zeliot Connectecd Services Pvt. Ltd.",
    description: "asd",
  },
];
const educationData = [
  {
    course: "Master of Computer Application",
    institute: "KLE Technological University.",
    description: "Hubballi | KA",
  },
  {
    course: "Bachelor of Computer Application",
    institute: "JSS SMI UG & PG Studies.",
    description: "Dharwad | KA",
  },
];
export default function ExperienceComponent() {
  return (
    <Grid className="experienceContainer">
      {/* Experience Timeline */}
      <Timeline
        sx={{
          padding: 0,
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot sx={{ margin: 0 }} variant="outlined">
              <BusinessCenter />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography sx={{ fontSize: 18, fontWeight: "bold" }}>
              Experience
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <Grid item style={{ marginLeft: 12 }}>
          {experienceData.map((experience, index) => (
            <CustomTimeLineItem
              company={experience.company}
              key={index}
              index={index}
              title={experience.title}
              description={experience.description}
            />
          ))}
        </Grid>
      </Timeline>

      {/* Education Timeline */}
      <Timeline
        sx={{
          padding: 0,
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot sx={{ margin: 0 }} variant="outlined">
              <Book />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography sx={{ fontSize: 18, fontWeight: "bold" }}>
              Education
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <Grid item style={{ marginLeft: 12 }}>
          {educationData.map((education, index) => (
            <CustomTimeLineItem
              company={education.institute}
              key={index}
              index={index}
              title={education.course}
              description={education.description}
            />
          ))}
        </Grid>
      </Timeline>
    </Grid>
  );
}

function CustomTimeLineItem({ title, description, company, index }) {
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot sx={{ margin: 0 }} />
        {index == experienceData.length - 1 ? null : <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent sx={{ marginTop: -2 }}>
        <Typography sx={{ fontSize: 18, fontWeight: "bold" }}>
          {title}
        </Typography>
        <Typography sx={{ fontSize: 18 }}>{company}</Typography>
        <Typography sx={{ fontSize: 18 }}>{description}</Typography>
      </TimelineContent>
    </TimelineItem>
  );
}
