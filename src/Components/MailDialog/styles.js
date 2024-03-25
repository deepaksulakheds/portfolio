import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  styledButton: {
    border: "2px solid white",
    borderRadius: "7px",
    color: "white",
    fontWeight: "bold",
    "&:hover": { backgroundColor: "white", color: "black" },
  },
}));
