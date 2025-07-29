import {
  Autocomplete,
  Checkbox,
  Chip,
  CircularProgress,
  Grid,
  TextField,
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
var tagColorMap = {};

const tagColors = [
  "springgreen",
  "cyan",
  "mediumslateblue",
  "yellow",
  "white",
  "orange",
  "darkgray",
  "peachpuff",
  "lightseagreen",
  "lightgreen",
  "chocolate",
  "coral",
  "lightcoral",
  "purple",
  "indigo",
  "blueviolet",
];

function NotesComponent({ notistackSnackbar }) {
  const [deleteMultipleNotes] = useMutation(DELETE_MULTIPLE_NOTES);
  const [noteAnchorEl, setNoteAnchorEl] = useState(null);
  const [editNoteAnchorEl, setEditNoteAnchorEl] = useState(null);
  const [noteEditing, setNoteEditing] = useState(null);
  const [checkedNotes, setCheckedNotes] = useState([]);
  const [notesToDisplay, setNotesToDisplay] = useState([]);
  const [copied, setCopied] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [allRespNotes, setAllRespNotes] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [getNotes, { data, loading, error }] = useLazyQuery(GET_NOTES, {
    onError: (err) => {
      notistackSnackbar.showSnackbar(err.message, "error");
    },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    fetchNotes();
  }, []);

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
        const tags = urlNotes
          ?.map((note) => note.tag)
          .flat()
          .filter((tag) => tag)
          .sort();

        tagColorMap = await tags.reduce((acc, currTag, index) => {
          const color = tagColors[index % tagColors.length];
          acc[currTag] = color;
          return acc;
        }, {});

        setAllRespNotes(urlNotes);
        setNotesToDisplay(urlNotes);
        setAllTags([...new Set(tags)]);
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

  const toggleDisplaySelected = () => {
    const isAllSelected = notesToDisplay.every((note) =>
      checkedNotes.includes(note.id)
    );
    // console.log("isAllSelected", isAllSelected);
    if (isAllSelected) {
      setNotesToDisplay(allRespNotes);
      displayedSelected = false;
    } else {
      setNotesToDisplay((prev) =>
        prev.reduce((acc, note) => {
          if (checkedNotes.includes(note.id)) {
            acc.push(note);
          }
          return acc;
        }, [])
      );
      displayedSelected = true;
    }
  };

  const handleCopy = async (note) => {
    try {
      navigator.clipboard.writeText(note.note);

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

  const handleTagChange = async (newTags) => {
    const baseNotes = displayedSelected
      ? allRespNotes.filter((note) => checkedNotes.includes(note.id))
      : allRespNotes;

    if (newTags.length === 0) {
      setNotesToDisplay(baseNotes);
    } else {
      const filteredNotes = baseNotes.filter((note) => {
        if (newTags.includes("- Untagged -")) {
          return newTags.includes(note.tag) || !note.tag;
        }

        return newTags.includes(note.tag);
      });
      setNotesToDisplay(filteredNotes);
    }
  };

  return (
    <Grid>
      <Grid
        sx={{
          display: "flex",
          alignItems: "flex-end",
          marginBottom: "12px",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <Autocomplete
          options={["- Untagged -", ...allTags]}
          multiple
          autoComplete
          disabled={allTags.length == 0}
          onChange={(e, value) => handleTagChange(value)}
          disableCloseOnSelect
          sx={{
            minWidth: "200px",
            "& .MuiSvgIcon-root": {
              color: "white",
            },
            "& .MuiInputLabel-root": {
              color: "rgba(255, 255, 255, 0.4)",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "rgba(255, 255, 255, 0.4)",
            },
            "& .MuiInput-underline:before": {
              borderBottomColor: "#555",
            },
            "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
              borderBottomColor: "lightgray",
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: "lightgray",
            },
            "& .Mui-disabled": {
              color: "rgba(255, 0, 0, 0.8)", // text color
              WebkitTextFillColor: "rgba(255, 0, 0, 0.8)", // fix for Safari
            },
            "& .MuiInput-underline.Mui-disabled:before": {
              borderBottomColor: "rgba(255, 0, 0, 0.8)", // underline color when disabled
            },
            "& .Mui-disabled .MuiSvgIcon-root": {
              color: "rgba(255, 0, 0, 0.8)", // lighter arrow color when disabled
            },
          }}
          slotProps={{
            popper: {
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [0, 8],
                  },
                },
              ],
            },
            paper: {
              sx: {
                backgroundColor: "#2c2c2e",
                color: "white",
                background: "#080411",
                border: "1px solid white",
                borderRadius: "10px",
              },
            },
            listbox: {
              sx: {
                "& .MuiAutocomplete-option": {
                  "&:hover": {
                    backgroundColor: "#aa89f2",
                    color: "#fff",
                  },
                  '&[aria-selected="true"]': {
                    color: "#aa89f2",
                  },
                },
              },
            },
            chip: {
              sx: {
                height: "fit-content",
                color: "#fff",
                border: "1px solid #fff",
                fontWeight: "bold",
                display: "flex",
                justifyContent: "space-between",
                "& .MuiChip-deleteIcon": {
                  color: "#bbb",
                  "&:hover": {
                    color: "#aa89f2",
                  },
                },
              },
            },
            root: {
              // Styles for the TextField's root are now here
              "& .MuiInputLabel-root": {
                color: "lightgray", // default label color
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "lightgray", // focused label color
              },
              "& .MuiInput-underline:before": {
                borderBottomColor: "#555", // default underline
              },
              "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                borderBottomColor: "lightgray", // hover underline
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "lightgray", // focused underline
              },
            },
            clearIndicator: {
              sx: {
                visibility: "visible", // 👈 make it always visible
                opacity: 1, // ensure it's not faded
              },
            },
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label={allTags.length === 0 ? "No tags available" : "Filter Tags"}
              InputProps={{
                ...params.InputProps,
                style: { color: "white" },
                inputProps: {
                  ...params.inputProps,
                  readOnly: true,
                },
              }}
            />
          )}
        />
        <Chip
          sx={{
            backgroundColor: displayedSelected
              ? "rgba(170, 137, 242, 1)"
              : "white",
            fontWeight: "bold",
            // marginBottom: "12px",
            transition: "all ease-in-out .2s",
            ":hover": {
              backgroundColor: "rgba(170, 137, 242, 1)",
            },
          }}
          disabled={checkedNotes.length === 0}
          label={`${checkedNotes.length} Selected / ${notesToDisplay.length} Dispalyed / ${allRespNotes.length}`}
          onClick={toggleDisplaySelected}
        />
      </Grid>
      <Grid
        sx={{
          display: "flex",
          gap: "10px",
          justifyContent: "space-between",
          transition: "all ease-in-out .2s",
        }}
      >
        {loading ? (
          <CircularProgress color="white" />
        ) : notesToDisplay.length === 0 ? (
          <Typography sx={{ fontWeight: "500" }}>No Data Found.</Typography>
        ) : (
          <Masonry
            // sequential
            columns={{ xs: 1, sm: 2, md: 2, lg: 3 }}
            spacing={2}
          >
            {notesToDisplay.map((note, index) => (
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
                          fontSize: "12.5px",
                          fontWeight: "400",
                          color: "rgba(170, 137, 242, 1)",
                          userSelect: "none",
                          display: "flex",
                          flexDirection: "column",
                          gap: "5px",
                        }}
                        component={"div"}
                      >
                        {moment.unix(note.createdAt).format("hh:mm A D/M/YY")}
                        {note.tag && (
                          <Chip
                            sx={{
                              backgroundColor: tagColorMap[note.tag],
                              width: "fit-content",
                              fontWeight: "bold",
                              padding: 0,
                              height: "fit-content",
                            }}
                            label={note.tag}
                          />
                        )}
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
                          fontSize: "12.5px",
                          fontWeight: "400",
                          color: "rgba(170, 137, 242, 1)",
                          userSelect: "none",
                          display: "flex",
                          flexDirection: "column",
                          gap: "5px",
                        }}
                        component={"div"}
                      >
                        {moment.unix(note.createdAt).format("hh:mm A D/M/YY")}
                        {note.tag && (
                          <Chip
                            sx={{
                              backgroundColor: tagColorMap[note.tag],
                              width: "fit-content",
                              fontWeight: "bold",
                              padding: 0,
                              height: "fit-content",
                            }}
                            label={note.tag}
                          />
                        )}
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
            ))}
          </Masonry>
        )}
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
          allTags={allTags}
        />
      </Grid>
      {noteEditing && (
        <EditNotesDialog
          editAnchorEl={editNoteAnchorEl}
          closeEditNote={() => setEditNoteAnchorEl(null)}
          noteEditing={noteEditing}
          allTags={allTags}
          fetchNotes={fetchNotes}
        />
      )}
    </Grid>
  );
}

export default React.memo(withNotistackSnackbar(NotesComponent));
