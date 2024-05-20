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
        },
      }}
    >
      <img
        src="./deepak.jpg"
        style={{
          padding: "40px",
          height: "85%",
          width: "85%",
          borderRadius: "50%",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
        }}
      />
    </Dialog>
  );
}
