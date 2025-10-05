import { Dialog, Grid, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useThemeContext } from "../../Contexts/ThemeContext";
import "./projectComponent.css";
import { ArrowCircleLeft, ArrowCircleRight } from "@mui/icons-material";

const snapsList = ["./deepak.jpg", `deepak-1.jpg`, `deepak-2.jpg`];

export function ViewSnapshotsDialog({
  viewSnapshotVisible,
  onClose,
  snapsList,
}) {
  const [selectedImage, setSelectedImage] = useState(snapsList[0]);

  const { themeContext } = useThemeContext();

  useEffect(() => {
    if (viewSnapshotVisible) {
      // Uncomment for random pics
      //   setSelectedImage(
      //     snapsList[Math.floor(Math.random() * snapsList.length)]
      //   );

      const handleKeyDown = (e) => {
        try {
          const userAgent = navigator?.userAgent?.toLowerCase() || "";
          const platform = userAgent.includes("mac")
            ? "mac"
            : userAgent.includes("win")
            ? "win"
            : userAgent.includes("lin") || userAgent.includes("ubu")
            ? "lin"
            : false;

          if (!platform) return;

          const key = e.key.toLowerCase();

          switch (key) {
            case "arrowright":
              e.preventDefault();

              handleNextClick();
              break;

            case "arrowleft":
              e.preventDefault();

              handlePrevClick();
              break;

            default:
              return;
          }
        } catch (err) {
          console.log("Error in shortcut", err);
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [viewSnapshotVisible, snapsList, selectedImage]);

  const handleImageClick = (index) => {
    setSelectedImage(snapsList[index]);
  };

  const handlePrevClick = () => {
    const currentIndex = snapsList.indexOf(selectedImage);
    const prevIndex = (currentIndex - 1 + snapsList.length) % snapsList.length;
    setSelectedImage(snapsList[prevIndex]);
  };

  const handleNextClick = () => {
    const currentIndex = snapsList.indexOf(selectedImage);
    const nextIndex = (currentIndex + 1) % snapsList.length;
    setSelectedImage(snapsList[nextIndex]);
  };

  return (
    <Dialog
      open={viewSnapshotVisible}
      onClose={onClose}
      fullWidth
      sx={{ backdropFilter: "blur(12px)", boxShadow: "none" }}
      slotProps={{
        paper: {
          sx: {
            boxShadow: "none",
            background: "none",
            height: "auto",
            width: "fit-content",
            // overflow: "hidden",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          },
        },
      }}
    >
      {snapsList && snapsList.length > 0 ? (
        <>
          <img
            src={selectedImage}
            style={{
              padding: "20px",
              height: "100%",
              aspectRatio: "auto",
              borderRadius: "10px",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            }}
          />
          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <Grid
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
                padding: "5px",
                borderRadius: "13px",
              }}
            >
              <IconButton
                onClick={handlePrevClick}
                sx={{
                  padding: "3px",
                  transition: "all ease-in-out 0.15s",
                  color: themeContext.themeIcons,
                  "&:hover": {
                    boxShadow: `inset 0px 0px 10px 2px ${themeContext.themeColor}`,
                    color: themeContext.themeColor,
                  },
                }}
              >
                <ArrowCircleLeft sx={{ fontSize: "30px" }} />
              </IconButton>
              {snapsList.map((image, index) => (
                <img
                  onClick={() => handleImageClick(index)}
                  key={index}
                  src={image}
                  className="imageList"
                  loading="lazy"
                  style={{
                    backgroundColor: themeContext.dullThemeColor,
                    ...(image === selectedImage && {
                      boxShadow: `inset 0px 0px 220px 0px ${themeContext.themeColor}`,
                    }),
                  }}
                />
              ))}
              <IconButton
                onClick={handleNextClick}
                sx={{
                  padding: "3px",
                  transition: "all ease-in-out 0.15s",
                  color: themeContext.themeIcons,
                  "&:hover": {
                    boxShadow: `inset 0px 0px 10px 2px ${themeContext.themeColor}`,
                    color: themeContext.themeColor,
                  },
                }}
              >
                <ArrowCircleRight sx={{ fontSize: "30px" }} />
              </IconButton>
            </Grid>
          </Grid>
        </>
      ) : (
        <Typography
          sx={{
            color: themeContext.themeColor,
            padding: "20px",
            textAlign: "center",
            backgroundColor: themeContext.themeBackground,
          }}
          component={"div"}
        >
          No Snapshots Available
        </Typography>
      )}
    </Dialog>
  );
}
