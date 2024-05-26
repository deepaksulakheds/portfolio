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
import moment from "moment";

const experienceData = [
  {
    company: "Zeliot Connected Services Pvt. Ltd.",
    titlesList: [
      {
        designation: "Software Engineer 1",
        // description: "asd",
        duration: "Sep 2023 - Present", // In time period pass current time for duration.
        timePeriod: moment.duration(moment().diff("sep-2023")),
      },
      {
        designation: "Full Stack Developer Intern",
        // description: "asd",
        duration: "June 2023 - Aug 2023", // In time period pass end duration.
        timePeriod: moment.duration(moment("sep 2023").diff("june 2023")),
      },
    ],
  },
];

const experienceData1 = [
  {
    company: "Zeliot Connected Services Pvt. Ltd.",
    titlesList: [
      {
        designation: "Software Engineer 1",
        // description: "asd",
        duration: "Sep 2023 - Present", // In time period pass current time for duration.
        timePeriod: moment.duration(moment().diff("sep-2023")),
      },
      {
        designation: "Full Stack Developer Intern",
        // description: "asd",
        duration: "June 2023 - Aug 2023", // In time period pass end duration.
        timePeriod: moment.duration(moment("sep 2023").diff("june 2023")),
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
    <>
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
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: "bold",
                  textDecoration: "underline",
                  textUnderlineOffset: "5px",
                  textDecorationThickness: "0.1px",
                }}
              >
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
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: "bold",
                  textDecoration: "underline",
                  textUnderlineOffset: "5px",
                  textDecorationThickness: "0.1px",
                }}
              >
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

      {/* Do not Delete, company card is added */}

      {/* <Grid
        sx={{
          display: "flex",
          gap: 2,
          overflowX: "auto",
          padding: 2,
          scrollSnapType: "inline mandatory",
          overscrollBehaviorInline: "contain",
          scrollBehavior: "smooth",
          height: "100%",
          transition: "all ease-in-out .2s",
          "&::-webkit-scrollbar": {
            height: "5px",
            width: "5px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(255,255,255,0.5)",
            borderRadius: "20px",
          },
        }}
      >
        {experienceData1.map((experience) => (
          <CompanyCard
            key={experience.company}
            companyName={experience.company}
            titlesList={experience.titlesList}
          />
        ))}
      </Grid> */}
    </>
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
        {index == experienceData.length - 1 ? null : <TimelineConnector />}
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
            borderRadius: 2,
          }}
        >
          {company}
        </Typography>
        <Grid sx={{ marginTop: "10px", marginLeft: "10px" }}>
          {titlesList.map((title) => (
            <Grid key={title.designation} sx={{ marginBottom: "5px" }}>
              <Typography sx={{ fontSize: 17, fontWeight: "bold" }}>
                - {title.designation}
              </Typography>
              <Typography sx={{ fontSize: 16, marginLeft: 2 }}>
                {title.duration}, (
                {/* {title.timePeriod.years() +
                    " Y" +
                    title.timePeriod.months() +
                    " M"} */}
                {title.timePeriod.years() > 0 &&
                  `${title.timePeriod.years()} Y`}{" "}
                {title.timePeriod.months()} M )
              </Typography>
              {/* <Typography sx={{ fontSize: 16, marginLeft: 2 }}>
                {title?.description}
              </Typography> */}
            </Grid>
          ))}
        </Grid>
      </TimelineContent>
    </TimelineItem>
  );
}

function CompanyCard({ companyName, titlesList }) {
  return (
    <Grid
      sx={{
        height: 150,
        width: "18vw",
        minWidth: "320px",
        maxWidth: "380px",
        backgroundColor: "#121212",
        borderRadius: "20px",
        // padding: "5px 0px 15px 15px",
        padding: "10px",
        borderStyle: "solid",
        borderColor: "rgba(255, 255, 255, 0.3)",
        borderWidth: "thin",
        transition: "all ease-in-out .2s",
        scrollSnapAlign: "start",
        overflow: "hidden",
        ":hover": {
          // backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderColor: "rgba(255, 255, 255)",
          overflow: "visible",
          height: "fit-content",
        },
        ":hover > img": {
          transform: "translateY(-20px)",
        },
      }}
    >
      <img
        src="./icons/html.svg"
        alt="image"
        style={{
          transition: "all ease-in-out .2s",
          height: 64,
          width: 64,
          // top: -30,
          position: "relative",
        }}
      />
      <Typography sx={{ fontSize: 18, fontWeight: "bold" }}>
        {companyName}
      </Typography>
      {titlesList.map((title) => (
        <Grid key={title.designation} sx={{ marginBottom: "5px" }}>
          <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
            - {title.designation}
          </Typography>
          <Typography sx={{ fontSize: 16, marginLeft: 2 }}>
            {title.duration}, (
            {title.timePeriod.years() > 0 && `${title.timePeriod.years()} Y`}{" "}
            {title.timePeriod.months()} M )
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
}
