import {
  Checkbox,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./NotesComponent.css";
import { useLazyQuery, useMutation } from "@apollo/client";
import { DELETE_MULTIPLE_NOTES, GET_NOTES } from "../queries";
import { AddBox, DisabledByDefault, Delete } from "@mui/icons-material";
import { withNotistackSnackbar } from "../SharedSnackbar/SharedSnackbar1";
import NotesDialog from "./NotesDialog.jsx";

function NotesComponent({ notistackSnackbar }) {
  const [getNotes, { data, loading, error }] = useLazyQuery(GET_NOTES, {
    onError: (err) => {
      notistackSnackbar.showSnackbar(err.message, "error");
    },
    fetchPolicy: "network-only",
  });

  const [deleteMultipleNotes] = useMutation(DELETE_MULTIPLE_NOTES);
  const [noteAnchorEl, setNoteAnchorEl] = useState(null);
  const [checkedNotes, setCheckedNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      await getNotes();
    } catch (err) {
      // console.log("err", err);
      notistackSnackbar.showSnackbar(err.message, "error");
    }
  };

  const handleMultipleDelete = async () => {
    try {
      if (checkedNotes.length > 0) {
        notistackSnackbar.showSnackbar("Deleting...", "info");
        const delResp = await deleteMultipleNotes({
          variables: { ids: checkedNotes },
        });
        // console.log("delResp", delResp);
        if (delResp.data.deleteMultipleNotes.status == 200) {
          notistackSnackbar.showSnackbar(
            delResp.data.deleteMultipleNotes.message,
            "success"
          );
        } else {
          notistackSnackbar.showSnackbar(
            delResp.data.deleteMultipleNotes.message,
            "error"
          );
        }
        fetchNotes();
        setCheckedNotes([]);
      } else {
        notistackSnackbar.showSnackbar("Please select note.", "error");
      }
    } catch (err) {
      // console.log("err", err);
      notistackSnackbar.showSnackbar(err.message, "error");
    }
  };

  const handleCheck = (id) => {
    setCheckedNotes((prev) => {
      if (prev.includes(id)) {
        return prev.filter((note) => note !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleClearSelection = () => {
    if (checkedNotes.length > 0) {
      setCheckedNotes([]);
    }
    notistackSnackbar.showSnackbar("Selection cleared.", "info");
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <Grid
      sx={{ display: "flex", gap: "10px", justifyContent: "space-between" }}
    >
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
                padding: "15px",
                borderRadius: "10px",
              }}
              width={370}
            >
              <Typography
                sx={{
                  fontWeight: "500",
                  wordBreak: "break-word",
                }}
              >
                {note.note}
              </Typography>
              <IconButton
                target="blank"
                sx={{
                  alignSelf: "flex-start",
                  padding: "0.2rem",
                  color: "white",
                  transition: "all ease-in-out 0.15s",
                  "&:hover": {
                    boxShadow: "inset 0px 0px 22px 0px rgba(170, 137, 242, 1)",
                  },
                }}
              >
                {/* <DeleteOutline onClick={(e) => removeNote(note.id)} /> */}
                <Checkbox
                  sx={{
                    color: "rgba(255, 255, 255, 0.6)",
                    margin: 0,
                    padding: 0,
                    "&.Mui-checked": {
                      color: "rgba(170, 137, 242, 1)",
                    },
                  }}
                  checked={checkedNotes.includes(note.id)}
                  onClick={(e) => handleCheck(note.id)}
                />
              </IconButton>
            </Grid>
          ))
        )}
      </Grid>
      <Grid sx={{ display: "flex", gap: "25px", flexDirection: "column" }}>
        <AddBox
          sx={{
            cursor: "pointer",
            color: "white",
            "&:hover": {
              color: "rgba(170, 137, 242, 1)",
            },
          }}
          onClick={(e) =>
            setNoteAnchorEl((prev) => (prev ? null : e.currentTarget))
          }
        />
        <Delete
          sx={{
            cursor: "pointer",
            color: "white",
            "&:hover": {
              color: "rgba(170, 137, 242, 1)",
            },
          }}
          onClick={handleMultipleDelete}
        />
        <DisabledByDefault
          sx={{
            borderRadius: "50%",
            cursor: "pointer",
            color: "white",
            "&:hover": {
              color: "rgba(170, 137, 242, 1)",
            },
          }}
          onClick={handleClearSelection}
        />
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
