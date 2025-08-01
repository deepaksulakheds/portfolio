import {
  Grid,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./body.css";
import AboutComponent from "../About/AboutComponent";
import ResumeComponent from "../Resume/Resume";
import ProjectsComponent from "../Projects/ProjectsComponent";
import ExperienceComponent from "../ExperienceComponent/ExperienceComponent";
import { Box } from "@mui/system";
import { MenuOutlined } from "@mui/icons-material";
import { CertificatesComponent } from "../CertificatesComponent/CertificatesComponent";
import { withAttachmentToggle } from "../MailDialog/attachmentContext";
import NotesComponent from "../Notes/NotesComponent";
import { useSecretContext } from "../../Contexts/SecretContext";
import { useThemeContext } from "../../Contexts/ThemeContext";

function Body(props) {
  const secretContext = useSecretContext();
  const { themeContext } = useThemeContext();

  const [menuList, setMenuList] = useState([
    { name: "About", icon: "👋" },
    { name: "Experience", icon: "🌟" },
    // { name: "Certificates", icon: "🗂️" }, // Uncomment to enable certificates section.
    { name: "Projects", icon: "🗂️" },
    { name: "Resume", icon: "🌟" },
  ]);

  const [selectedMenu, setSelectedMenu] = useState(
    sessionStorage.getItem("selectedMenu") ||
      menuList[0].name + " " + menuList[0].icon
  );

  useEffect(() => {
    document.title = selectedMenu + " | Deepak Sulakhe";
    if (!selectedMenu.includes("Notes")) {
      sessionStorage.setItem("selectedMenu", selectedMenu);
    }
  }, [selectedMenu]);

  useEffect(() => {
    setMenuList((prev) => {
      const hasNotes = prev.some((item) => item.name === "Notes");
      const shouldHaveNotes =
        props.attachmentToggle.isAttachmentEnabled &&
        secretContext.secretEnabled;

      if (shouldHaveNotes && !hasNotes) {
        // Add Notes only if not present
        return [...prev, { name: "Notes", icon: "🗒" }];
      } else if (!shouldHaveNotes && hasNotes) {
        // Remove Notes only if present
        return prev.filter((item) => item.name !== "Notes");
      }
      // No changes needed
      return prev;
    });
  }, [props.attachmentToggle.isAttachmentEnabled, secretContext.secretEnabled]);

  const handleMenuSelect = (index) => {
    // console.log(menuList[index]);
    setSelectedMenu(menuList[index].name + " " + menuList[index].icon);
    setAnchorElNav(null);
  };

  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Grid
      className="bodyContainer"
      sx={{ background: themeContext.bodyBackground }}
    >
      <Grid
        style={{
          margin: -1.5,
          padding: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            marginLeft: 20,
            fontSize: 22,
            fontWeight: "bold",
            transition: "all ease-in-out 0.5s",
            textUnderlineOffset: 10,
            color: themeContext.titleText,
          }}
          className="underline-first-two"
        >
          {selectedMenu}
        </span>
        <Grid className="navBar" sx={{ display: { xs: "none", md: "flex" } }}>
          {menuList.map((menu, index) => (
            <Link
              className="menuList"
              key={menu.name}
              onClick={(e) => handleMenuSelect(index)}
              sx={{
                textDecoration: "none",
                color: selectedMenu.includes(menu.name)
                  ? themeContext.themeColor
                  : themeContext.bodyText,
                filter: selectedMenu.includes(menu.name)
                  ? `drop-shadow(0px 0px 0.9px ${themeContext.themeColor})`
                  : null,
                "&:hover": {
                  color: themeContext.themeColor,
                  filter: `drop-shadow(0px 0px 0.9px ${themeContext.themeColor})`,
                },
              }}
            >
              {menu.name}
            </Link>
          ))}
        </Grid>
        <Box className="navBar" sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
            sx={{ padding: "4px" }}
          >
            <MenuOutlined />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            slotProps={{
              paper: {
                style: {
                  background: themeContext.themeBackground,
                  border: `0.2px solid ${themeContext.dullThemeColor}`,
                  borderRadius: "10px",
                },
              },
            }}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            {menuList.map((menu, index) => (
              <MenuItem
                className="menuList"
                key={menu.name}
                onClick={(e) => handleMenuSelect(index)}
                sx={{
                  color: selectedMenu.includes(menu.name)
                    ? themeContext.themeColor
                    : themeContext.bodyText,
                  filter: selectedMenu.includes(menu.name)
                    ? `drop-shadow(0px 0px 0.9px ${themeContext.themeColor})`
                    : null,
                  "&:hover": {
                    color: themeContext.themeColor,
                    filter: `drop-shadow(0px 0px 0.9px ${themeContext.themeColor})`,
                  },
                }}
              >
                {menu.name}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Grid>
      <Grid className="container">
        {selectedMenu.includes("About") ? (
          <AboutComponent />
        ) : selectedMenu.includes("Resume") ? (
          <ResumeComponent />
        ) : selectedMenu.includes("Projects") ? (
          <ProjectsComponent />
        ) : selectedMenu.includes("Experience") ? (
          <ExperienceComponent />
        ) : selectedMenu.includes("Certificates") ? (
          <CertificatesComponent />
        ) : selectedMenu.includes("Notes") ? (
          <NotesComponent />
        ) : (
          0
        )}
      </Grid>
    </Grid>
  );
}

export default withAttachmentToggle(Body);
