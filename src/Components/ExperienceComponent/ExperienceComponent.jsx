import React, { useState } from "react";
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
import { AutoStories, BusinessCenter } from "@mui/icons-material";
import "./ExperienceComponent.css";
import { Grid } from "@mui/material";

const experienceData = [
  {
    company: "Zeliot Connectecd Services Pvt. Ltd.",
    titlesList: [
      {
        designation: "Software Engineer 1",
        description: "asd",
        duration: "Sep 2023 - Present",
      },
      {
        designation: "Full Stack Developer Intern",
        description: "asd",
        duration: "June 2023 - Aug 2023",
      },
    ],
  },
  {
    company: "Zeliot Connectecd Services Pvt. Ltd.",
    titlesList: [
      {
        designation: "Software Engineer 1",
        description: "asd",
        duration: "Sep 2023 - Present",
      },
      {
        designation: "Full Stack Developer Intern",
        description: "asd",
        duration: "June 2023 - Aug 2023",
      },
    ],
  },
];

const educationData = [
  {
    course: "Master of Computer Application",
    institute: "KLE Technological University.",
    place: "Hubballi | KA",
  },
  {
    course: "Bachelor of Computer Application",
    institute: "JSS SMI UG & PG Studies.",
    place: "Dharwad | KA",
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
            <CustomExperienceTimeLineItem
              company={experience.company}
              key={index}
              titlesList={experience.titlesList}
              index={index}
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
              <AutoStories />
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
            <CustomEducationTimeLineItem
              institute={education.institute}
              key={index}
              index={index}
              course={education.course}
              place={education.place}
            />
          ))}
        </Grid>
      </Timeline>
    </Grid>
  );
}

function CustomEducationTimeLineItem({ course, place, institute, index }) {
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot variant="outlined" sx={{ margin: 0 }} />
        {index == educationData.length - 1 ? null : <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent sx={{ marginTop: -2, marginBottom: "12px" }}>
        <Typography component="h5" sx={{ fontSize: 18, fontWeight: "bold" }}>
          {course}
        </Typography>
        <Typography>-&nbsp;{institute}</Typography>
        <Typography sx={{ fontSize: 16 }}>&nbsp;&nbsp;{place}</Typography>
      </TimelineContent>
    </TimelineItem>
  );
}

function CustomExperienceTimeLineItem({ company, titlesList, index }) {
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot variant="outlined" sx={{ margin: 0 }} />
        {index == educationData.length - 1 ? null : <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent
        sx={{
          paddingTop: 0,
          marginTop: "-10px",
          marginBottom: index == educationData.length - 1 ? null : "20px",
        }}
      >
        <Typography
          component="h5"
          sx={{
            fontSize: 18,
            padding: "8px",
            width: "fit-content",
            fontWeight: "bold",
            border: "1px solid white",
            borderRadius: 1,
          }}
        >
          {company}
        </Typography>
        <Grid sx={{ marginTop: "10px", marginLeft: "10px" }}>
          {titlesList.map((title) => (
            <Grid key={title.designation}>
              <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
                - {title.designation}
              </Typography>
              <Typography sx={{ fontSize: 16, marginLeft: 2 }}>
                {title.description}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </TimelineContent>
    </TimelineItem>
  );
}
