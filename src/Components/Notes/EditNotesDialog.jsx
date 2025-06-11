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
import { useMutation } from "@apollo/client";
import { EDIT_NOTE } from "../queries";
import { useEffect, useState } from "react";

function EditNotesDialog({
  editAnchorEl,
  closeEditNote,
  noteEditing,
  fetchNotes,
  setNoteEditing,
  notistackSnackbar,
}) {
  const [editNote, { data, loading, error }] = useMutation(EDIT_NOTE);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    if (noteEditing) {
      setNewNote(noteEditing);
    }
    return () => {
      setNewNote("");
    };
  }, [noteEditing, editAnchorEl]);

  const handleEditNote = async () => {
    try {
      const editResp = await editNote({
        variables: { id: newNote.id, note: newNote.note },
      });
      // console.log("editResp", editResp.data);
      if (editResp.data.updateNote.status == 200) {
        notistackSnackbar.showSnackbar("Note edited successfully.", "success");
        fetchNotes();
        closeEditNote();
      } else {
        notistackSnackbar.showSnackbar(
          editResp.data.updateNote.message,
          "error"
        );
      }
    } catch (err) {
      console.log("err", err);
      notistackSnackbar.showSnackbar(err.message, "error");
    }
  };
  return (
    <Dialog
      disableRestoreFocus
      open={editAnchorEl}
      onClose={closeEditNote}
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
        Edit Note
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
          value={newNote.note}
          variant="standard"
          name="message"
          onChange={(e) => setNewNote({ ...noteEditing, note: e.target.value })}
          label="Enter Note *"
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
                color: !newNote.note ? `red` : `rgba(255, 255, 255, 0.3)`,
                border: `1px solid ${
                  !newNote.note ? `red` : `rgba(255, 255, 255, 0.3)`
                }`,
              },
            }}
            disabled={
              !newNote.note || loading || newNote.note === noteEditing.note
            }
            onClick={() => handleEditNote()}
          >
            {loading ? <CircularProgress color="white" size={20} /> : "Save"}
          </Button>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default withNotistackSnackbar(EditNotesDialog);
