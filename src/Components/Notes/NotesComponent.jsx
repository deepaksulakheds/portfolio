import {
  CircularProgress,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./NotesComponent.css";
import { useLazyQuery, useMutation } from "@apollo/client";
import { DELETE_NOTE, GET_NOTES } from "../queries";
import { DeleteOutline, AddBox } from "@mui/icons-material";
import { withNotistackSnackbar } from "../SharedSnackbar/SharedSnackbar1";
import NotesDialog from "./NotesDialog.jsx";

function NotesComponent({ notistackSnackbar }) {
  const [getNotes, { data, loading, error }] = useLazyQuery(GET_NOTES, {
    onError: (err) => {
      notistackSnackbar.showSnackbar(err.message, "error");
    },
    fetchPolicy: "network-only",
  });

  const [deleteNote] = useMutation(DELETE_NOTE);
  const [noteAnchorEl, setNoteAnchorEl] = useState(null);

  const fetchNotes = async () => {
    try {
      await getNotes();
    } catch (err) {
      // console.log("err", err);
      notistackSnackbar.showSnackbar(err.message, "error");
    }
  };

  const removeNote = async (id) => {
    try {
      const delResp = await deleteNote({
        variables: { deleteNoteId: id },
      });
      // console.log("delResp", delResp);
      if (delResp.data.deleteNote.status == 200) {
        notistackSnackbar.showSnackbar("Note deleted successfully.", "success");
      } else {
        notistackSnackbar.showSnackbar(
          delResp.data.deleteNote.message,
          "error"
        );
      }
      fetchNotes();
    } catch (err) {
      // console.log("err", err);
      notistackSnackbar.showSnackbar(err.message, "error");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <Grid>
      <Grid sx={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {loading ? (
          <CircularProgress color="white" />
        ) : data && data?.getAllNotes?.response.length === 0 ? (
          <Typography sx={{ fontWeight: "500" }}>No Data Found.</Typography>
        ) : (
          data?.getAllNotes?.response.map((note, index) => (
            <Grid
              key={note.id}
              sx={{
                border: "0.5px solid rgba(255, 255, 255, 0.24)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "15px",
                borderRadius: "10px",
              }}
              width={300}
            >
              <Typography sx={{ fontWeight: "500" }}>{note.note}</Typography>
              <IconButton
                target="blank"
                sx={{
                  alignSelf: "flex-end",
                  padding: "0.2rem",
                  color: "white",
                  transition: "all ease-in-out 0.15s",
                  "&:hover": {
                    boxShadow: "inset 0px 0px 22px 0px rgba(170, 137, 242, 1)",
                  },
                }}
              >
                <DeleteOutline onClick={(e) => removeNote(note.id)} />
              </IconButton>
            </Grid>
          ))
        )}
      </Grid>
      <Grid sx={{ marginTop: "10px" }}>
        <Tooltip
          arrow
          title={"Add Note"}
          componentsProps={{
            tooltip: {
              sx: {
                backgroundColor: "transparent",
                boxShadow: "inset 0px 0px 30px 0px rgba(170, 137, 242, 1)",
                fontSize: 13,
              },
            },
            arrow: {
              sx: {
                color: "rgba(170, 137, 242, 0.6)",
              },
            },
          }}
        >
          <IconButton
            tooltip="Add Note"
            sx={{
              cursor: "pointer",
              "&:hover": {
                boxShadow: "inset 0px 0px 22px 0px rgba(170, 137, 242, 1)",
              },
            }}
            onClick={(e) =>
              setNoteAnchorEl((prev) => (prev ? null : e.currentTarget))
            }
          >
            <AddBox sx={{ color: "white" }} />
          </IconButton>
        </Tooltip>
      </Grid>
      <NotesDialog
        noteAnchorEl={noteAnchorEl}
        onClose={() => setNoteAnchorEl(null)}
        fetchNotes={fetchNotes}
      />
    </Grid>
  );
}

export default withNotistackSnackbar(NotesComponent);
