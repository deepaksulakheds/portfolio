import { Dialog } from "@mui/material";
import "./header.css";

export default function HeaderImageDialog({ imageDialogVisible, onClose }) {
  return (
    <Dialog
      open={imageDialogVisible}
      onClose={onClose}
      fullWidth
      sx={{ backdropFilter: "blur(10px)", boxShadow: "none" }}
      PaperProps={{
        sx: {
          boxShadow: "none",
          background: "none",
          height: "auto",
          width: "100%",
          overflow: "hidden",
        },
      }}
    >
      <img
        src="./deepak.jpg"
        style={{
          padding: "30px",
          // height: "85%",
          borderRadius: "50%",
          backgroundColor: "rgba(255, 255, 255, 0.3)",
        }}
      />
    </Dialog>
  );
}
