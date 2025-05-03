import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import { withNotistackSnackbar } from "../SharedSnackbar/SharedSnackbar1";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_NOTE } from "../queries";

function NotesDialog({ noteAnchorEl, onClose, notistackSnackbar, fetchNotes }) {
  const [note, setNote] = useState("");
  const [addNote, { data, loading, error }] = useMutation(ADD_NOTE);

  useEffect(() => {
    setNote("");
  }, [noteAnchorEl]);

  const handleAddNote = async () => {
    try {
      const addResp = await addNote({
        variables: { note: note },
      });
      // console.log("addResp", addResp.data.addNote.status);
      if (addResp.data.addNote.status == 200) {
        notistackSnackbar.showSnackbar("Note added successfully.", "success");
        fetchNotes();
        onClose();
      } else {
        notistackSnackbar.showSnackbar(addResp.data.addNote.message, "error");
      }
    } catch (err) {
      console.log("err", err);
      notistackSnackbar.showSnackbar(err.message, "error");
    }
  };
  return (
    <Dialog
      disableRestoreFocus
      open={noteAnchorEl}
      onClose={onClose}
      fullWidth
      sx={{ backdropFilter: "blur(10px)" }}
      slotProps={{
        paper: {
          style: {
            borderRadius: "10px",
            background: "#211e29",
            border: " 0.5px solid rgba(255, 255, 255, 0.3)",
          },
        },
      }}
    >
      <DialogTitle
        sx={{ color: "white", fontWeight: "bold", padding: "18px 20px" }}
      >
        Notes
      </DialogTitle>
      <Grid
        style={{ display: "flex", justifyContent: "center", color: "white" }}
      >
        <Divider
          color="white"
          sx={{ color: "white", backgroundColor: "white" }}
          style={{ color: "white" }}
          width="92%"
        />
      </Grid>
      <DialogContent
        sx={{
          padding: "20px",
          scrollbarWidth: "thin",
          color: "white",
        }}
      >
        <TextField
          autoFocus
          multiline
          InputLabelProps={{ style: { color: "rgba(255,255,255,0.6)" } }}
          InputProps={{ style: { color: "white" } }}
          sx={{
            "& .MuiInput-underline:before": {
              borderBottom: "1px solid",
              borderBottomColor: "rgba(255,255,255,0.3)",
            },
            "& .MuiInput-underline:hover": {
              borderBottomColor: "rgba(255,255,255,0.5)",
            },
            "& .MuiInput-underline:hover:before": {
              borderBottom: "2px solid",
              borderBottomColor: "rgba(255,255,255,0.3)",
            },
            "& .MuiInput-underline:after": {
              borderBottom: "2px solid",
              borderBottomColor: "rgba(255,255,255,0.3)",
            },
          }}
          fullWidth
          value={note}
          variant="standard"
          name="message"
          onChange={(e) => setNote(e.target.value)}
          label="Enter Enter Message *"
        />
        <Grid
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "10px",
          }}
        >
          <Button
            sx={{
              color: "white",
              height: 40,
              width: 90,
              borderRadius: "7px",
              fontWeight: "bold",
              border: "1px solid rgba(255,255,255,0.3)",
              "&:hover": {
                boxShadow: "inset 0px 0px 22px 0px rgba(170, 137, 242, 1)",
              },
              "&:disabled": {
                pointerEvents: "unset",
                cursor: "not-allowed",
                boxShadow: "none",
                color: !note ? `red` : `rgba(255, 255, 255, 0.3)`,
                border: `1px solid ${
                  !note ? `red` : `rgba(255, 255, 255, 0.3)`
                }`,
              },
            }}
            disabled={!note || loading}
            onClick={handleAddNote}
          >
            {loading ? <CircularProgress color="white" size={20} /> : "Add"}
          </Button>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default withNotistackSnackbar(NotesDialog);
