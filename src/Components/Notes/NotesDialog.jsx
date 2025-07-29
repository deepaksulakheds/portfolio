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
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { withNotistackSnackbar } from "../SharedSnackbar/SharedSnackbar1";
import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_NOTE } from "../queries";

function NotesDialog({
  noteAnchorEl,
  onClose,
  notistackSnackbar,
  fetchNotes,
  allTags,
}) {
  const [tagTypeSelection, setTagTypeSelection] = useState(null);
  const [addNote, { data, loading, error }] = useMutation(ADD_NOTE);
  const [note, setNote] = useState({
    note: "",
    tag: "",
  });

  useEffect(() => {
    if (noteAnchorEl) {
      setNote({ ...note, tag: "" });
    } else {
      setTagTypeSelection(null);
    }

    return () => {
      setNote({
        note: "",
        tag: "",
      });
    };
  }, [noteAnchorEl, tagTypeSelection]);

  const handleAddNote = async () => {
    try {
      // Validation
      if (tagTypeSelection == "select" && (!note.tag || note.tag == "")) {
        notistackSnackbar.showSnackbar("Please select a tag.", "error");
        return;
      }
      if (tagTypeSelection == "newTag" && (!note.tag || note.tag == "")) {
        notistackSnackbar.showSnackbar("Please enter a Tag.", "error");
        return;
      }
      if (!tagTypeSelection || tagTypeSelection == "") {
        notistackSnackbar.showSnackbar("Please select a Tag Type.", "error");
        return;
      }
      if (!note.note || note.note == "") {
        notistackSnackbar.showSnackbar("Please enter a Note.", "error");
        return;
      }

      const addResp = await addNote({
        variables: { note: note.note, tag: note.tag ? note.tag : null },
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

  const handleTagChange = async (e, newTag) => {
    setNote({ ...note, tag: newTag });
  };

  const handleRadioChange = async (e) => {
    setTagTypeSelection(e.target.value);
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
          value={note.note}
          variant="standard"
          name="message"
          onChange={(e) => setNote({ ...note, note: e.target.value })}
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
              disabled={allTags.length == 0}
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
              sx={{
                color: "white",
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
            value={note.tag}
            onChange={(e, value) => handleTagChange(e, value)}
            disabled={allTags.length === 0}
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
                label={allTags.length > 0 ? "Select Tag" : "No Tags, Crate Tag"}
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
        ) : tagTypeSelection && tagTypeSelection === "newTag" ? (
          <TextField
            autoFocus
            multiline
            slotProps={{
              input: {
                style: {
                  color: "white",
                },
              },
              inputLabel: {
                style: {
                  color: "rgba(255,255,255,0.5)",
                },
              },
            }}
            fullWidth
            value={note.tag}
            variant="standard"
            name="message"
            onChange={(e) => setNote({ ...note, tag: e.target.value })}
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
                color: !note ? `red` : `rgba(255, 255, 255, 0.3)`,
                border: `1px solid ${
                  !note ? `red` : `rgba(255, 255, 255, 0.3)`
                }`,
              },
            }}
            disabled={!note.note || loading}
            onClick={handleAddNote}
          >
            {loading ? <CircularProgress color="white" size={20} /> : "Add"}
          </Button>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default React.memo(withNotistackSnackbar(NotesDialog));
