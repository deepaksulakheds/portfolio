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
import {
  AutoStories,
  BusinessCenter,
  SchoolRounded,
  WorkspacePremium,
} from "@mui/icons-material";
import "./ExperienceComponent.css";
import { Chip, Grid } from "@mui/material";
import { withAttachmentToggle } from "../MailDialog/attachmentContext";
import { getFormattedTimePeriod } from "../../utils/formatTimePeriod";

const experienceData = [
  {
    company: "Zeliot Connected Services Pvt. Ltd.",
    totalTimePeriod: getFormattedTimePeriod("1-jun-2023", "present"),
    titlesList: [
      {
        designation: "Software Engineer 1",
        duration: "Sep 2023 - Present", // present.diff(start)
        timePeriod: getFormattedTimePeriod("1-sep-2023", "present"),
        descriptions: [
          `Developing robust web applications using React and Node. Proven ability to build responsive, user-friendly, and high-performance web solutions using React.js. Skilled in component-based architecture and integrating with backend services with REST and GraphQL APIs. Developing core features using React and MUI.`,
          `Proven ability to translate designs and prototypes into fully functional, end-to-end modules using React.js, Node.js, REST, GraphQL, and various databases, including both SQL and NoSQL.`,
          `Contributed significantly to various projects, including the end-to-end implementation of features and a rich dashboard utilizing React and Material-UI for data visualization, UI development, and consistent user experience.`,
          `Developed backend services, pipelines, and REST and GraphQL APIs with Node.js, contributing to the core functionality projects. Collaborated in the integration of APIs.`,
          `Designing, optimizing, and restructuring database schemas and queries for efficient data management and enhanced performance and scalability.`,
          `Identified and resolved security vulnerabilities through VAPT, implementing fixes and security best practices to ensure robust and secure backend services and APIs.`,
          `Designed and implemented Redis-based caching strategies in microservices and APIs to optimize performance, reduce response latency, and improve scalability.`,
        ],
      },
      {
        designation: "Full Stack Developer Intern",
        duration: "June 2023 - Aug 2023", // end.diff(start)
        timePeriod: getFormattedTimePeriod("1-jun-2023", "1-sep-2023"),
        descriptions: [
          `<span style="font-weight: bold; text-decoration: underline; font-size: 15px">Telematic Analytics - Zeliot</span>, the internship project developed during the Full-Stack Development Internship, focuses on building a telematic analytics platform with the primary goal of collecting, processing, analyzing, and visualizing the data from telematic devices, providing actionable insights and KPIs.`,
          `Implemented frontend components using React to create intuitive and responsive user interfaces.`,
          `Integrated third-party APIs in backend systems, making sure data flowed smoothly with external systems while maintaining the performance and reliability.`,
          `Participated in code reviews, debugging, and testing to ensure high-quality software deliverables.`,
        ],
      },
    ],
  },
];
const icons = [
  <SchoolRounded fontSize="medium" />,
  <WorkspacePremium fontSize="medium" />,
];
// const experienceData1 = [
//   {
//     company: "Zeliot Connected Services Pvt. Ltd.",
//     titlesList: [
//       {
//         designation: "Software Engineer 1",
//         // description: "asd",
//         duration: "Sep 2023 - Present",
//         timePeriod: moment.duration(
//           moment().diff(moment("sep-2023", "D-MMM-YYYY"))
//         ),
//       },
//       {
//         designation: "Full Stack Developer Intern",
//         // description: "asd",
//         duration: "June 2023 - Aug 2023",
//         timePeriod: moment.duration(
//           moment(moment("sep 2023", "D-MMM-YYYY")).diff(
//             moment("june 2023", "D-MMM-YYYY")
//           )
//         ),
//       },
//     ],
//   },
// ];

const educationData = [
  {
    course: "Master of Computer Application",
    institute: "KLE Technological University.",
    place: "Hubballi | KA",
    timePeriod: "Feb 2022 - Sep 2023",
    siteUrl: `https://www.kletech.ac.in/`,
  },
  {
    course: "Bachelor of Computer Application",
    institute: "JSS SMI UG & PG Studies.",
    place: "Dharwad | KA",
    timePeriod: "Jun 2018 - Sep 2021",
    siteUrl: `http://jsssmiugpg.com/`,
  },
  // {
  //   course: "Pre University (PCMCs)",
  //   institute: "KVSR Comp. PU College.",
  //   place: "Gadag | KA",
  //   timePeriod: "2014 - 2016",
  // },
];
export function ExperienceComponent({ attachmentToggle }) {
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
              <BusinessCenter
                onDoubleClick={() => attachmentToggle.toggleAttachment()}
              />
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
        <Grid style={{ marginLeft: 12 }}>
          {experienceData.map((experience, index) => (
            <CustomExperienceTimeLineItem
              company={experience.company}
              key={index}
              titlesList={experience.titlesList}
              totalTimePeriod={experience.totalTimePeriod}
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
            {/* <TimelineConnector /> */}
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
        <Grid style={{ marginTop: "-25px", marginLeft: "25px" }}>
          {educationData.map((education, index) => (
            <CustomEducationTimeLineItem
              key={index}
              index={index}
              institute={education.institute}
              course={education.course}
              place={education.place}
              timePeriod={education.timePeriod}
              siteUrl={education.siteUrl}
            />
          ))}
        </Grid>
      </Timeline>
    </Grid>
  );
}

{
  /* Do not Delete, company card is added */
  /* <Grid
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
      </Grid> */
}

function CustomEducationTimeLineItem({
  course,
  place,
  institute,
  index,
  timePeriod,
  siteUrl,
}) {
  return (
    <TimelineItem>
      <TimelineContent>
        <Grid sx={{ maxWidth: 500 }}>
          <Grid
            sx={{
              height: "40px",
              width: "40px",
              border: "0.2px solid white",
              borderRadius: "50%",
              position: "absolute",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              top: "20px",
              backgroundColor: "#201e29",
            }}
          >
            {icons[index]}
          </Grid>
          <Grid
            sx={{
              marginTop: "10px",
              marginLeft: "10px",
              backgroundColor: "#393540",
              borderRadius: "10px",
            }}
          >
            <Grid
              sx={{ marginLeft: "30px", marginTop: "20px", padding: "10px" }}
            >
              <Typography
                component="p"
                sx={{ fontSize: 16, fontWeight: 600, color: "#aa89f2" }}
              >
                {course}
              </Typography>
              <Typography sx={{ fontSize: 14, color: "#aa89f2" }}>
                -&nbsp;{institute}
              </Typography>
              <Typography sx={{ fontSize: 13 }}>
                &nbsp;&nbsp; {timePeriod}
              </Typography>
              <Typography sx={{ fontSize: 13 }}>
                &nbsp;&nbsp; {place}
              </Typography>
              <Chip
                label={`Visit Site`}
                size="small"
                sx={{
                  fontWeight: "500",
                  backgroundColor: "rgba(170, 137, 242, 1)",
                  ":hover": {
                    backgroundColor: "rgb(97, 65, 167)",
                    color: "white",
                  },
                }}
                onClick={() => {
                  window.open(siteUrl, "_blank");
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </TimelineContent>
    </TimelineItem>
  );
}

function CustomExperienceTimeLineItem({
  company,
  titlesList,
  totalTimePeriod,
  index,
}) {
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
        <Grid
          sx={{
            border: "1px solid white",
            borderRadius: 2,
            width: "fit-content",
          }}
        >
          <Typography
            component="p"
            sx={{
              fontSize: 16,
              padding: "8px",
              paddingBottom: "0",
              width: "fit-content",
              fontWeight: "bold",
            }}
          >
            {company}
          </Typography>
          <Typography
            component="p"
            sx={{
              fontSize: 12,
              padding: "0px 0px 8px 8px",
              color: "#aa89f2",
              fontWeight: "bold",
            }}
          >
            - {totalTimePeriod}
          </Typography>
        </Grid>
        <Grid sx={{ marginTop: "10px", marginLeft: "10px" }}>
          {titlesList.map((title) => (
            <Grid key={title.designation} sx={{ marginBottom: "5px" }}>
              <Typography
                sx={{ fontSize: 15.5, fontWeight: "bold", color: "#aa89f2" }}
              >
                &#10687;&nbsp;&nbsp;{title.designation}
              </Typography>
              <Typography
                sx={{ fontSize: 14, marginLeft: 2, color: "#aa89f2" }}
              >
                {title.duration}, ( {title.timePeriod} )
              </Typography>
              <Grid>
                {title.descriptions.map((desc) => (
                  <Grid
                    key={desc}
                    sx={{ fontSize: 14, marginLeft: 2, maxWidth: 500 }}
                  >
                    <Grid style={{ display: "flex" }}>
                      ➛
                      {desc.includes("</") ? (
                        <Typography
                          key={desc}
                          sx={{ fontSize: 14, marginLeft: 0.7, maxWidth: 500 }}
                          dangerouslySetInnerHTML={{ __html: desc }}
                        ></Typography>
                      ) : (
                        <Typography
                          key={desc}
                          sx={{ fontSize: 14, marginLeft: 0.7, maxWidth: 500 }}
                        >
                          {desc}
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                ))}
              </Grid>
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
        backgroundColor: "#080411",
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

export default withAttachmentToggle(ExperienceComponent);
