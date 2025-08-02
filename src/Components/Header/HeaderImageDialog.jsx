import { Dialog, Grid } from "@mui/material";
import "./header.css";
import { useEffect, useState } from "react";
import { useThemeContext } from "../../Contexts/ThemeContext";

const imagesList = ["./deepak.jpg", `deepak-1.jpg`, `deepak-2.jpg`];

export default function HeaderImageDialog({ imageDialogVisible, onClose }) {
  const [selectedImage, setSelectedImage] = useState(imagesList[0]);

  const { themeContext } = useThemeContext();

  useEffect(() => {
    if (imageDialogVisible) {
      // Uncomment for random pics
      //   setSelectedImage(
      //     imagesList[Math.floor(Math.random() * imagesList.length)]
      //   );

      return () => {
        setTimeout(() => {
          setSelectedImage(imagesList[0]);
        }, 200);
      };
    }
  }, [imageDialogVisible]);

  const handleImageClick = (index) => {
    setSelectedImage(imagesList[index]);
  };

  return (
    <Dialog
      open={imageDialogVisible}
      onClose={onClose}
      fullWidth
      sx={{ backdropFilter: "blur(12px)", boxShadow: "none" }}
      PaperProps={{
        sx: {
          boxShadow: "none",
          background: "none",
          height: "auto",
          width: "100%",
          // overflow: "hidden",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        },
      }}
    >
      <img
        src={selectedImage}
        style={{
          padding: "30px",
          // height: "85%",
          aspectRatio: "1/1",
          borderRadius: "50%",
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
            gap: "20px",
            padding: "5px",
            borderRadius: "13px",
          }}
        >
          {imagesList.map((image, index) => (
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
        </Grid>
      </Grid>
    </Dialog>
  );
}
