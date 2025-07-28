import {
  Autocomplete,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { withNotistackSnackbar } from "../SharedSnackbar/SharedSnackbar1";
import { useMutation } from "@apollo/client";
import { EDIT_NOTE } from "../queries";
import React, { useEffect, useState } from "react";
import { ClearOutlined } from "@mui/icons-material";

function EditNotesDialog({
  editAnchorEl,
  closeEditNote,
  noteEditing,
  allTags,
  fetchNotes,
  setNoteEditing,
  notistackSnackbar,
}) {
  const [editNote, { data, loading, error }] = useMutation(EDIT_NOTE);
  const [newNote, setNewNote] = useState({
    note: "",
    tag: "",
  });
  const [tagTypeSelection, setTagTypeSelection] = useState(null);

  useEffect(() => {
    if (noteEditing) {
      setNewNote(noteEditing);

      if (noteEditing.tag && noteEditing.tag.length) {
        setTagTypeSelection("select");
      } else {
        setTagTypeSelection("untagged");
      }
    }
    if (!editAnchorEl) {
      setTagTypeSelection(null);
    }
    return () => {
      setNewNote({ note: "", tag: "" });
      setTagTypeSelection(null);
    };
  }, [noteEditing, editAnchorEl]);

  const handleEditNote = async () => {
    try {
      // Validation
      if (!newNote.note || newNote.note == "") {
        notistackSnackbar.showSnackbar("Please enter a Note.", "error");
        return;
      }
      // Validation
      if (tagTypeSelection == "select" && (!newNote.tag || newNote.tag == "")) {
        notistackSnackbar.showSnackbar("Please select a tag.", "error");
        return;
      }
      if (tagTypeSelection == "newTag" && (!newNote.tag || newNote.tag == "")) {
        notistackSnackbar.showSnackbar("Please enter a Tag.", "error");
        return;
      }
      if (!tagTypeSelection || tagTypeSelection == "") {
        notistackSnackbar.showSnackbar("Please select a Tag Type.", "error");
        return;
      }

      const editResp = await editNote({
        variables: { id: newNote.id, note: newNote.note, tag: newNote.tag },
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

  const handleRadioChange = async (e) => {
    setTagTypeSelection(e.target.value);
    if (e.target.value == "untagged") {
      setNewNote({ ...newNote, tag: "" });
    }
  };

  const handleTagChange = (e, value) => {
    // console.log("value", value);
    setNewNote({ ...newNote, tag: value });
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
          onChange={(e) => setNewNote({ ...newNote, note: e.target.value })}
          label="Enter Note *"
        />

        <FormControl>
          <RadioGroup
            name="tagTypeOptions"
            value={tagTypeSelection}
            onChange={handleRadioChange}
            sx={{ display: "flex", flexDirection: "row" }}
          >
            <FormControlLabel
              value="select"
              control={
                <Radio
                  sx={{
                    color: "white",
                    "&.Mui-checked": {
                      color: "#aa89f2",
                    },
                  }}
                />
              }
              label="Select"
              sx={{ color: "white" }}
            />
            <FormControlLabel
              value="newTag"
              control={
                <Radio
                  sx={{
                    color: "white",
                    "&.Mui-checked": {
                      color: "#aa89f2",
                    },
                  }}
                />
              }
              label="New Tag"
              sx={{ color: "white" }}
            />
            <FormControlLabel
              value="untagged"
              control={
                <Radio
                  sx={{
                    color: "white",
                    "&.Mui-checked": {
                      color: "#aa89f2",
                    },
                  }}
                />
              }
              label="- Untagged -"
              sx={{ color: "white" }}
            />
          </RadioGroup>
        </FormControl>
        {tagTypeSelection && tagTypeSelection === "select" ? (
          <Autocomplete
            options={allTags}
            autoComplete
            value={newNote.tag}
            onChange={(e, value) => handleTagChange(e, value)}
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

              root: {
                "& .MuiInputLabel-root": {
                  color: "lightgray",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "lightgray",
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
                label="Select Tag"
                InputProps={{
                  ...params.InputProps,
                  style: { color: "white" },
                }}
              />
            )}
          />
        ) : tagTypeSelection && tagTypeSelection === "newTag" ? (
          <TextField
            autoFocus
            multiline
            slotProps={{
              input: {
                style: {
                  color: "white",
                },
                endAdornment: (
                  <InputAdornment position="end" title="Clear">
                    <ClearOutlined
                      onClick={() => setNewNote({ ...newNote, tag: "" })}
                      sx={{
                        color: "white",
                        cursor: "pointer",
                        borderRadius: "50%",
                        "&:hover": {
                          backgroundColor: "#aa89f2",
                        },
                      }}
                    />
                  </InputAdornment>
                ),
              },
              inputLabel: {
                style: {
                  color: "rgba(255,255,255,0.5)",
                },
              },
            }}
            fullWidth
            value={newNote.tag}
            variant="standard"
            name="message"
            onChange={(e) => setNewNote({ ...newNote, tag: e.target.value })}
            label="Enter Tag "
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
          />
        ) : null}
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
              !newNote.note ||
              loading ||
              (newNote.note === noteEditing.note &&
                newNote.tag === noteEditing.tag)
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

export default React.memo(withNotistackSnackbar(EditNotesDialog));
