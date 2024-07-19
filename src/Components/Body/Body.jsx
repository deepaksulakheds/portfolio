import { Grid, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./body.css";
import AboutComponent from "../About/AboutComponent";
import ResumeComponent from "../Resume/Resume";
import ProjectsComponent from "../Projects/ProjectsComponent";
import ExperienceComponent from "../ExperienceComponent/ExperienceComponent";
import { Box } from "@mui/system";
import { MenuOutlined } from "@mui/icons-material";
import { CertificatesComponent } from "../CertificatesComponent/CertificatesComponent";

const menuList = [
  { name: "About", icon: "👋" },
  { name: "Experience", icon: "🌟" },
  // { name: "Certificates", icon: "🗂️" }, // Uncomment to enable certificates section.
  { name: "Projects", icon: "🗂️" },
  { name: "Resume", icon: "🌟" },
];

function Body(props) {
  const [selectedMenu, setSelectedMenu] = useState(
    menuList[0].name + " " + menuList[0].icon
  );

  useEffect(() => {
    document.title = selectedMenu + " | Deepak Sulakhe";
  }, [selectedMenu]);

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
    <Grid className="bodyContainer">
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
          }}
          className="underline-first-two"
        >
          {selectedMenu}
        </span>
        <Grid className="navBar" sx={{ display: { xs: "none", md: "flex" } }}>
          {menuList.map((menu, index) => (
            <a
              style={
                selectedMenu.includes(menu.name)
                  ? {
                      color: "rgb(50, 201, 243)",
                      filter: " drop-shadow(0px 0px 3px rgb(50, 201, 243))",
                    }
                  : null
              }
              className="menuList"
              key={menu.name}
              onClick={(e) => handleMenuSelect(index)}
            >
              {menu.name}
            </a>
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
            sx={{ padding: "6px" }}
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
                  background: "#121212",
                  border: "1px solid white",
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
                style={
                  selectedMenu.includes(menu.name)
                    ? {
                        color: "rgb(50, 201, 243)",
                        filter: " drop-shadow(0px 0px 1px rgb(50, 201, 243))",
                      }
                    : {
                        color: "white",
                      }
                }
                className="menuList"
                key={menu.name}
                onClick={(e) => handleMenuSelect(index)}
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
        ) : (
          0
        )}
      </Grid>
    </Grid>
  );
}

export default Body;
