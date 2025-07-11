import {
  Checkbox,
  Chip,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./NotesComponent.css";
import { useLazyQuery, useMutation } from "@apollo/client";
import { DELETE_MULTIPLE_NOTES, GET_NOTES } from "../queries";
import {
  AddBox,
  DisabledByDefault,
  Delete,
  CopyAllRounded,
  CheckCircle,
  EditNote,
} from "@mui/icons-material";
import { withNotistackSnackbar } from "../SharedSnackbar/SharedSnackbar1";
import NotesDialog from "./NotesDialog.jsx";
import moment from "moment";
import { Masonry } from "@mui/lab";
import EditNotesDialog from "./EditNotesDialog.jsx";

let displayedSelected = false;

function NotesComponent({ notistackSnackbar }) {
  const [getNotes, { data, loading, error }] = useLazyQuery(GET_NOTES, {
    onError: (err) => {
      notistackSnackbar.showSnackbar(err.message, "error");
    },
    fetchPolicy: "network-only",
  });

  const [deleteMultipleNotes] = useMutation(DELETE_MULTIPLE_NOTES);
  const [noteAnchorEl, setNoteAnchorEl] = useState(null);
  const [editNoteAnchorEl, setEditNoteAnchorEl] = useState(null);
  const [noteEditing, setNoteEditing] = useState(null);
  const [checkedNotes, setCheckedNotes] = useState([]);
  const [notesToDisplay, setNotesToDisplay] = useState([]);
  const [copied, setCopied] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [allRespNotes, setAllRespNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const resp = await getNotes();
      // console.log("resp", resp.data.getAllNotes.response);
      if (resp?.data?.getAllNotes?.response?.length > 0) {
        const urlNotes = resp?.data?.getAllNotes?.response?.map((note) => {
          let isUrl = false;
          try {
            new URL(note?.note);
            isUrl = true;
          } catch (e) {}
          return { ...note, isUrl };
        });
        setAllRespNotes(urlNotes);
        setNotesToDisplay(urlNotes);
        displayedSelected = false;
      } else {
        setNotesToDisplay([]);
      }
    } catch (err) {
      console.log("err", err);
      notistackSnackbar.showSnackbar(err.message, "error");
    }
  };

  const handleMultipleDelete = async () => {
    try {
      if (checkedNotes.length > 0) {
        setDeleteLoading(true);
        const delResp = await deleteMultipleNotes({
          variables: { ids: checkedNotes },
        });
        // console.log("delResp", delResp);
        if (delResp.data.deleteMultipleNotes.status == 200) {
          notistackSnackbar.showSnackbar(
            delResp.data.deleteMultipleNotes.message,
            "success"
          );
          fetchNotes();
        } else {
          notistackSnackbar.showSnackbar(
            delResp.data.deleteMultipleNotes.message,
            "error"
          );
        }
        setCheckedNotes([]);
      } else {
        notistackSnackbar.showSnackbar("Please select note.", "error");
      }
    } catch (err) {
      // console.log("err", err);
      notistackSnackbar.showSnackbar(err.message, "error");
    }
    setDeleteLoading(false);
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
    setCheckedNotes([]);
    setNotesToDisplay(allRespNotes);
    displayedSelected = false;
    notistackSnackbar.showSnackbar("Selection cleared.", "info");
  };

  const toggleSelected = () => {
    const isAllSelected = notesToDisplay.every((note) =>
      checkedNotes.includes(note.id)
    );
    // console.log("isAllSelected", isAllSelected);
    if (isAllSelected) {
      setNotesToDisplay(allRespNotes);
      displayedSelected = false;
    } else {
      setNotesToDisplay(
        checkedNotes.map((id) => notesToDisplay.find((note) => note.id === id))
      );
      displayedSelected = true;
    }
  };
  const handleCopy = async (note) => {
    try {
      await navigator.clipboard.writeText(note.note);

      setCopied(note.id);
      setTimeout(() => {
        setCopied(false);
      }, 4000);
    } catch (error) {
      // console.error("Clipboard error:", error);
      notistackSnackbar.showSnackbar("Failed to copy note.", "error");
    }
  };

  const handleEdit = async (note, e) => {
    setNoteEditing(note);
    setEditNoteAnchorEl(e.currentTarget);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <Grid>
      <Chip
        sx={{
          backgroundColor: displayedSelected
            ? "rgba(170, 137, 242, 1)"
            : "white",
          fontWeight: "bold",
          marginBottom: "12px",
          transition: "all ease-in-out .2s",
          ":hover": {
            backgroundColor: "rgba(170, 137, 242, 1)",
          },
        }}
        disabled={checkedNotes.length === 0}
        label={`${checkedNotes.length} Selected / ${allRespNotes.length}`}
        onClick={toggleSelected}
      />
      <Grid
        sx={{
          display: "flex",
          gap: "10px",
          justifyContent: "space-between",
          transition: "all ease-in-out .2s",
        }}
      >
        <Masonry
          // sequential
          columns={{ xs: 1, sm: 2, md: 2, lg: 3 }}
          spacing={2}
        >
          {loading ? (
            <CircularProgress color="white" />
          ) : notesToDisplay.length === 0 ? (
            <Typography sx={{ fontWeight: "500" }}>No Data Found.</Typography>
          ) : (
            notesToDisplay.map((note, index) => (
              <Grid
                key={note.id}
                sx={{
                  border: `0.5px solid ${
                    checkedNotes.includes(note.id)
                      ? "#aa89f2"
                      : "rgba(255, 255, 255, 0.4)"
                  }`,
                  wordBreak: "break-word",
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "12px",
                  borderRadius: "10px",
                }}
              >
                <Grid
                  width={"95%"}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  {note.isUrl ? (
                    <>
                      <a
                        href={note.note}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Typography
                          sx={{
                            fontWeight: "500",
                            whiteSpace: "pre-line",
                          }}
                        >
                          {note.note}
                        </Typography>
                      </a>
                      <Typography
                        sx={{
                          fontSize: "12px",
                          fontWeight: "400",
                          color: "rgba(170, 137, 242, 1)",
                          userSelect: "none",
                        }}
                      >
                        {moment.unix(note.createdAt).format("hh:mm A D/M/YY")}
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Typography
                        sx={{
                          fontWeight: "500",
                          whiteSpace: "pre-line",
                        }}
                      >
                        {note.note}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "12px",
                          fontWeight: "400",
                          color: "rgba(170, 137, 242, 1)",
                          userSelect: "none",
                        }}
                      >
                        {moment.unix(note.createdAt).format("hh:mm A D/M/YY")}
                      </Typography>
                    </>
                  )}
                </Grid>
                <Grid
                  sx={{ display: "flex", gap: "10px", flexDirection: "column" }}
                >
                  <Checkbox
                    sx={{
                      alignSelf: "flex-start",
                      color: "rgba(255, 255, 255, 0.6)",
                      margin: 0,
                      padding: "0.2rem",
                      ":hover": {
                        backgroundColor: "rgba(170, 137, 242, 0.4)",
                      },
                      "&.Mui-checked": {
                        color: "rgba(170, 137, 242, 1)",
                      },
                    }}
                    checked={checkedNotes.includes(note.id)}
                    onClick={(e) => handleCheck(note.id)}
                  />
                  {copied && copied === note.id ? (
                    <CheckCircle
                      sx={{
                        padding: "0.2rem",
                        color: "rgba(255, 255, 255, 0.6)",
                      }}
                    />
                  ) : (
                    <CopyAllRounded
                      sx={{
                        padding: "0.2rem",
                        cursor: "pointer",
                        color: "rgba(255, 255, 255, 0.6)",
                        borderRadius: "50%",
                        ":hover": {
                          backgroundColor: "rgba(170, 137, 242, 0.4)",
                        },
                      }}
                      onClick={() => handleCopy(note)}
                    />
                  )}
                  <EditNote
                    sx={{
                      padding: "0.2rem",
                      cursor: "pointer",
                      color: "rgba(255, 255, 255, 0.6)",
                      borderRadius: "50%",
                      ":hover": {
                        backgroundColor: "rgba(170, 137, 242, 0.4)",
                      },
                    }}
                    onClick={(e) => handleEdit(note, e)}
                  />
                </Grid>
              </Grid>
            ))
          )}
        </Masonry>
        <Grid sx={{ display: "flex", gap: "25px", flexDirection: "column" }}>
          <AddBox
            titleAccess="Add new note"
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
          {deleteLoading ? (
            <CircularProgress color="white" size={23} />
          ) : (
            <Delete
              titleAccess="Delete Selected"
              sx={{
                cursor: "pointer",
                color: "white",
                "&:hover": {
                  color: "rgba(170, 137, 242, 1)",
                },
              }}
              onClick={handleMultipleDelete}
            />
          )}

          <DisabledByDefault
            titleAccess="Clear Selection"
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
      {noteEditing && (
        <EditNotesDialog
          editAnchorEl={editNoteAnchorEl}
          closeEditNote={() => setEditNoteAnchorEl(null)}
          noteEditing={noteEditing}
          fetchNotes={fetchNotes}
        />
      )}
    </Grid>
  );
}

export default withNotistackSnackbar(NotesComponent);
