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
import { useThemeContext } from "../../Contexts/ThemeContext.jsx";

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
  // Contexts
  const { themeContext } = useThemeContext();

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
              color: themeContext.oppositeTheme,
            },
            "& .MuiInputLabel-root": {
              color: themeContext.dullOppositeTheme,
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: themeContext.dullOppositeTheme,
            },
            "& .MuiInput-underline:before": {
              borderBottomColor: themeContext.dullOppositeTheme,
            },
            "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
              borderBottomColor: themeContext.dullOppositeTheme,
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: themeContext.dullOppositeTheme,
            },
            "& .Mui-disabled": {
              color: themeContext.disabledColor,
              WebkitTextFillColor: themeContext.disabledColor,
            },
            "& .MuiInput-underline.Mui-disabled:before": {
              borderBottomColor: themeContext.disabledColor,
            },
            "& .Mui-disabled .MuiSvgIcon-root": {
              color: themeContext.disabledColor,
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
                backgroundColor: themeContext.themeBackground,
                background: themeContext.themeBackground,
                color: themeContext.oppositeTheme,
                border: `1px solid ${themeContext.oppositeTheme}`,
                borderRadius: "10px",
              },
            },
            listbox: {
              sx: {
                "& .MuiAutocomplete-option": {
                  "&:hover": {
                    backgroundColor: themeContext.oppositeTheme,
                    color: themeContext.themeBackground,
                  },
                  '&[aria-selected="true"]': {
                    color: themeContext.themeColor,
                    filter: `drop-shadow(0px 0px 0.9px ${themeContext.themeColor})`,
                  },
                },
              },
            },
            chip: {
              sx: {
                height: "fit-content",
                color: themeContext.bodyText,
                border: `1px solid ${themeContext.dullThemeColor}`,
                fontWeight: "bold",
                display: "flex",
                justifyContent: "space-between",
                "& .MuiChip-deleteIcon": {
                  color: themeContext.dullOppositeTheme,
                  "&:hover": {
                    color: themeContext.oppositeTheme,
                  },
                },
              },
            },
            root: {
              "& .MuiInputLabel-root": {
                color: themeContext.dullOppositeTheme,
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: themeContext.dullOppositeTheme,
              },
              "& .MuiInput-underline:before": {
                borderBottomColor: themeContext.oppositeTheme,
              },
              "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                borderBottomColor: themeContext.dullOppositeTheme,
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: themeContext.dullOppositeTheme,
              },
            },
            clearIndicator: {
              sx: {
                visibility: "visible",
                opacity: 1,
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
                style: { color: themeContext.oppositeTheme },
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
            color: themeContext.noThemeColor,
            backgroundColor: displayedSelected
              ? themeContext.oppositeTheme
              : themeContext.dullOppositeTheme,
            fontWeight: "bold",
            transition: "all ease-in-out .2s",
            ":hover": {
              // backgroundColor: themeContext.chipShadow,
              boxShadow: `inset 0px 0px 30px 10px ${themeContext.themeColor}`,
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
          <CircularProgress
            sx={{ color: themeContext.themeIcons }}
            color={themeContext.themeIcons}
          />
        ) : notesToDisplay.length === 0 ? (
          <Typography
            sx={{ fontWeight: "500", color: themeContext.subTitleText }}
          >
            No Data Found.
          </Typography>
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
                  border: `1px solid ${
                    checkedNotes.includes(note.id)
                      ? themeContext.themeColor
                      : themeContext.dullThemeColor
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
                        style={{ textDecorationColor: themeContext.themeColor }}
                      >
                        <Typography
                          sx={{
                            fontWeight: "500",
                            whiteSpace: "pre-line",
                            color: themeContext.themeColor,
                          }}
                        >
                          {note.note}
                        </Typography>
                      </a>
                      <Typography
                        sx={{
                          fontSize: "12.5px",
                          fontWeight: "400",
                          color: themeContext.themeColor,
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
                              color: themeContext.blackText,
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
                          color: themeContext.oppositeTheme,
                        }}
                      >
                        {note.note}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "12.5px",
                          fontWeight: "400",
                          color: themeContext.themeColor,
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
                              color: themeContext.blackText,
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
                      color: themeContext.themeColor,
                      margin: 0,
                      padding: "0.2rem",
                      ":hover": {
                        color: themeContext.dullOppositeTheme,
                        backgroundColor: themeContext.dullOppositeTheme,
                      },
                      "&.Mui-checked": {
                        color: themeContext.themeColor,
                      },
                    }}
                    checked={checkedNotes.includes(note.id)}
                    onClick={(e) => handleCheck(note.id)}
                  />
                  {copied && copied === note.id ? (
                    <CheckCircle
                      sx={{
                        padding: "0.2rem",
                        color: themeContext.themeColor,
                      }}
                    />
                  ) : (
                    <CopyAllRounded
                      sx={{
                        padding: "0.2rem",
                        cursor: "pointer",
                        color: themeContext.themeColor,
                        borderRadius: "50%",
                        ":hover": {
                          backgroundColor: themeContext.dullOppositeTheme,
                        },
                      }}
                      onClick={() => handleCopy(note)}
                    />
                  )}
                  <EditNote
                    sx={{
                      padding: "0.2rem",
                      cursor: "pointer",
                      color: themeContext.themeColor,
                      borderRadius: "50%",
                      ":hover": {
                        backgroundColor: themeContext.dullOppositeTheme,
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
              borderRadius: "5px",
              color: themeContext.themeColor,
              "&:hover": {
                backgroundColor: themeContext.dullOppositeTheme,
              },
            }}
            onClick={(e) =>
              setNoteAnchorEl((prev) => (prev ? null : e.currentTarget))
            }
          />
          {deleteLoading ? (
            <CircularProgress
              sx={{ color: themeContext.themeColor }}
              color={themeContext.themeColor}
              size={23}
            />
          ) : (
            <Delete
              titleAccess="Delete Selected"
              sx={{
                borderRadius: "5px",
                cursor: "pointer",
                color: themeContext.themeColor,
                "&:hover": {
                  backgroundColor: themeContext.dullOppositeTheme,
                },
              }}
              onClick={handleMultipleDelete}
            />
          )}

          <DisabledByDefault
            titleAccess="Clear Selection"
            sx={{
              borderRadius: "5px",
              cursor: "pointer",
              color: themeContext.themeColor,
              "&:hover": {
                backgroundColor: themeContext.dullOppositeTheme,
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
