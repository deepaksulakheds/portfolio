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
  Launch,
  SchoolRounded,
  WorkspacePremium,
} from "@mui/icons-material";
import "./ExperienceComponent.css";
import { Chip, Grid } from "@mui/material";
import { withAttachmentToggle } from "../MailDialog/attachmentContext";
import { getFormattedTimePeriod } from "../../utils/formatTimePeriod";
import { useSecretContext } from "../../Contexts/SecretContext";
import { useThemeContext } from "../../Contexts/ThemeContext";

const experienceData = [
  {
    company: "Zeliot Connected Services Pvt. Ltd.",
    totalTimePeriod: getFormattedTimePeriod("1-jun-2023", "present"),
    logoPath: "./icons/zeliot-1.png",
    companyUrl: "https://www.zeliot.in/",
    titlesList: [
      {
        designation: "Software Engineer 1",
        duration: "Sep 2023 - Present", // present.diff(start)
        timePeriod: getFormattedTimePeriod("1-sep-2023", "present"),
        location: `Bengaluru | KA | IN`,
        descriptions: [
          `Developing responsive, high-performance web apps using React and Node.js. Skilled in component-based architecture, REST/GraphQL APIs integration, and MUI.`,
          `Proven ability to translate designs and prototypes into fully functional, end-to-end modules using React.js, Node.js, REST, GraphQL, and various SQL & NoSQL databases.`,
          `Contributed to multiple projects by implementing end-to-end features and creating a rich dashboard with React and Material-UI for data visualization and consistent UI.`,
          `Developed backend services, pipelines, and REST and GraphQL APIs with Node.js, contributing to core functionality projects. Implemented automated report mailing system using cron jobs.`,
          `Redesigned and optimized database schemas and queries for performance, scalability, and efficient data handling. Implemented Redis-based caching in backend systems to boost performance and reduce response times.`,
          `Identified and resolved security vulnerabilities through VAPT, implementing fixes and security best practices to ensure robust and secure backend services and APIs.`,
        ],
      },
      {
        designation: "Full Stack Developer - Intern",
        duration: "June 2023 - Aug 2023", // end.diff(start)
        timePeriod: getFormattedTimePeriod("1-jun-2023", "1-sep-2023"),
        location: `Bengaluru | KA | IN`,
        descriptions: [
          `Developed <span style="font-weight: bold; text-decoration: underline; font-size: 15px">Telematic Analytics - Zeliot</span> as a mini-project during my Full-Stack Development Internship, focusing on creating a platform to collect, process, analyze, and visualize telematic device data, providing actionable insights and KPIs.`,
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
    place: "Hubballi | KA | IN",
    timePeriod: "Feb 2022 - Sep 2023",
    siteUrl: `https://www.kletech.ac.in/`,
  },
  {
    course: "Bachelor of Computer Application",
    institute: "JSS SMI UG & PG Studies.",
    place: "Dharwad | KA | IN",
    timePeriod: "Jun 2018 - Sep 2021",
    siteUrl: `http://jsssmiugpg.com/`,
  },
];
export function ExperienceComponent({ attachmentToggle }) {
  // Contexts
  const secretContext = useSecretContext();
  const { themeContext } = useThemeContext();

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
            <TimelineDot
              sx={{
                margin: 0,
                color: themeContext.oppositeTheme,
                borderColor: themeContext.oppositeTheme,
              }}
              variant="outlined"
            >
              <BusinessCenter
                onDoubleClick={() => {
                  if (secretContext.secretEnabled) {
                    attachmentToggle.toggleAttachment();
                  }
                }}
                sx={{ color: themeContext.oppositeTheme }}
              />
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent>
            <Typography
              sx={{
                fontSize: 18,
                fontWeight: "bold",
                textDecoration: "underline",
                textUnderlineOffset: "5px",
                textDecorationThickness: "0.1px",
                color: themeContext.subTitleText,
              }}
            >
              Experience
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <Grid style={{ marginLeft: 12 }}>
          {experienceData.map((experience, companyIndex) => (
            <CustomExperienceTimeLineItem
              company={experience.company}
              key={companyIndex}
              titlesList={experience.titlesList}
              totalTimePeriod={experience.totalTimePeriod}
              companyIndex={companyIndex}
              logoPath={experience.logoPath}
              companyUrl={experience.companyUrl}
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
            <TimelineDot
              sx={{
                margin: 0,
                color: themeContext.oppositeTheme,
                borderColor: themeContext.oppositeTheme,
              }}
              variant="outlined"
            >
              <AutoStories
                sx={{ margin: 0, color: themeContext.oppositeTheme }}
                color={themeContext.oppositeTheme}
              />
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
                color: themeContext.subTitleText,
              }}
            >
              Education
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <Grid style={{ marginTop: "-25px", marginLeft: "10px" }}>
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
  // Contexts
  const { themeContext } = useThemeContext();

  return (
    <TimelineItem>
      <TimelineContent
        sx={{
          marginBottom: index == educationData.length - 1 ? null : "10px",
        }}
      >
        <Grid
          title={course}
          sx={{
            maxWidth: 500,
            ":hover > .educationIcon": {
              animation: "pulse 1s infinite ease-in-out",
            },
          }}
        >
          <Grid
            className="educationIcon"
            sx={{
              height: "40px",
              width: "40px",
              border: `0.2px solid ${themeContext.subTitleText}`,
              color: themeContext.oppositeTheme,
              borderRadius: "50%",
              position: "absolute",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              top: "20px",
              backgroundColor: themeContext.themeBackground,
            }}
          >
            {icons[index]}
          </Grid>

          <Grid
            sx={{
              marginTop: "10px",
              marginLeft: "10px",
              backgroundColor: themeContext.cardBackground,
              borderRadius: "10px",
            }}
          >
            <Grid
              sx={{ marginLeft: "30px", marginTop: "20px", padding: "10px" }}
            >
              <Typography
                component="p"
                sx={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: themeContext.themeColor,
                }}
              >
                {course}
              </Typography>
              <Typography sx={{ fontSize: 15, color: themeContext.themeColor }}>
                -&nbsp;{institute}
              </Typography>
              <Typography
                sx={{
                  fontSize: 13,
                  marginTop: "5px",
                  color: themeContext.bodyText,
                }}
              >
                &nbsp;&nbsp; {place}
              </Typography>
              <Typography
                sx={{
                  fontSize: 13,
                  marginBottom: "5px",
                  color: themeContext.bodyText,
                }}
              >
                &nbsp;&nbsp; {timePeriod}
              </Typography>
              <Chip
                label={`Visit Site`}
                size="small"
                sx={{
                  fontWeight: "500",
                  backgroundColor: themeContext.dullThemeColor,
                  color: themeContext.oppositeTheme,
                  ":hover": {
                    backgroundColor: themeContext.themeColor,
                    color: themeContext.white,
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
  logoPath,
  companyUrl,
  companyIndex,
}) {
  // Contexts
  const { themeContext } = useThemeContext();

  return (
    <TimelineItem title={company}>
      <TimelineContent
        sx={{
          paddingTop: 0,
          marginTop: "-10px",
          marginBottom:
            companyIndex == educationData.length - 1 ? null : "20px",
        }}
      >
        <Grid
          sx={{
            border: `1px solid ${themeContext.bodyText}`,
            borderRadius: 2,
            width: "fit-content",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "5px",
            }}
          >
            <img
              src={logoPath}
              alt={company}
              title={company}
              height="28px"
              width="28px"
            />
          </Grid>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "8px",
            }}
          >
            <Typography
              component="p"
              sx={{
                fontSize: 16,
                paddingBottom: "0",
                width: "fit-content",
                fontWeight: "bold",
                color: themeContext.subTitleText,
              }}
            >
              {company}
            </Typography>
            <Typography
              component="p"
              sx={{
                fontSize: 12,
                color: themeContext.subTitleText,
                fontWeight: "bold",
              }}
            >
              - {totalTimePeriod}
            </Typography>
          </Grid>
          <Launch
            titleAccess="Open URL"
            fontSize="small"
            sx={{
              padding: "5px",
              borderRadius: "50%",
              cursor: "pointer",
              color: themeContext.oppositeTheme,
              "&:hover": {
                color: themeContext.themeColor,
                // filter: `drop-shadow(0px 0px 3px ${themeContext.themeColor})`,
              },
            }}
            onClick={(e) => window.open(companyUrl, "_blank")}
          />
        </Grid>
        <Grid sx={{ marginTop: "5px", marginLeft: "5px" }}>
          <Timeline
            sx={{
              padding: 0,
              [`& .${timelineItemClasses.root}:before`]: {
                flex: 0,
                padding: 0,
              },
            }}
          >
            {titlesList.map((title, titleIndex) => (
              <TimelineItem key={title.designation}>
                <TimelineSeparator>
                  <TimelineDot
                    style={{
                      opacity: "0.6",
                      backgroundColor: themeContext.oppositeTheme,
                    }}
                  />
                  {titleIndex == titlesList.length - 1 ? null : (
                    <TimelineConnector
                      style={{
                        opacity: "0.6",
                        backgroundColor: themeContext.oppositeTheme,
                      }}
                    />
                  )}
                </TimelineSeparator>
                <TimelineContent>
                  <Grid key={title.designation} sx={{ marginBottom: "5px" }}>
                    <Typography
                      sx={{
                        fontSize: 15.5,
                        fontWeight: "bold",
                        color: themeContext.bodyText,
                      }}
                    >
                      {title.designation}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 14,
                        color: themeContext.bodyText,
                        marginLeft: "5px",
                      }}
                    >
                      {title.duration}, ( {title.timePeriod} )<br />
                      {title.location}
                    </Typography>
                    <Grid sx={{ marginTop: "6px" }}>
                      {title.descriptions.map((desc) => (
                        <Grid
                          key={desc}
                          sx={{
                            fontSize: 14,
                            maxWidth: 500,
                            display: "flex",
                            color: themeContext.bodyText,
                          }}
                        >
                          ➛
                          {desc.includes("</") ? (
                            <Typography
                              key={desc}
                              sx={{
                                fontSize: 14,
                                marginLeft: 0.7,
                              }}
                              dangerouslySetInnerHTML={{ __html: desc }}
                            ></Typography>
                          ) : (
                            <Typography
                              key={desc}
                              sx={{
                                fontSize: 14,
                                marginLeft: 0.7,
                              }}
                            >
                              {desc}
                            </Typography>
                          )}
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Grid>
        {/* {companyIndex == experienceData.length - 1 ? null : (
          <Divider
            orientation="horizontal"
            sx={{
              borderColor: "unset",
              marginTop: "15px",
              width: "80%",
              opacity: "0.5",
            }}
          />
        )} */}
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
