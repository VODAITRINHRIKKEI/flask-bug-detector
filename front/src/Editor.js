import React, { useEffect, useState } from "react";
import axios from "axios";
import AceEditor from "react-ace";
import Tab from "./Component/Tab";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-dracula";
import "./Editor.css";
import Button from "@mui/material/Button";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

function SelectPatterns({ checked, setChecked }) {
  useEffect(() => {
    fetchPattern();
  }, []);

  const [patterns, setPatterns] = useState([]);

  const fetchPattern = async () => {
    try {
      const response = await axios.get("http://localhost:5000/flask/get");
      setPatterns(response.data.patterns);
      setChecked(Array(response.data.patterns.length).fill(false));
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (index, patternName) => {
    const newChecked = [...checked];
    newChecked[index] = newChecked[index] === patternName ? "" : patternName;
    setChecked(newChecked);
  };

  const checkboxes = patterns.map((pattern, index) => (
    <FormControlLabel
      key={index}
      label={pattern}
      control={
        <Checkbox
          checked={checked[index]}
          onChange={() => handleChange(index, pattern)}
        />
      }
      sx={{ ml: 3 }} // Áp dụng thụt vào cho checkbox con
    />
  ));

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="selectContent">
      <Button
        variant="contained"
        size="large"
        onClick={handleClickOpen}
        sx={{ mx: "auto", display: "block" }}
      >
        Select Bug Pattern
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Select patterns to check for bugs"}
        </DialogTitle>
        <DialogContent>
          <div>
            <FormGroup>
              <FormControlLabel
                label="Select All"
                control={
                  <Checkbox
                    checked={checked.every((item) => item)}
                    indeterminate={
                      checked.some((item) => item) &&
                      !checked.every((item) => item)
                    }
                    onChange={() =>
                      setChecked(
                        checked.map(() => !checked.every((item) => item))
                      )
                    }
                  />
                }
              />
              {checkboxes}
            </FormGroup>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function EditorContent() {
  const [code, setCode] = useState("");
  const [error, setError] = useState([]);
  const [sending, setSending] = useState(false);
  const [checked, setChecked] = useState([]);

  const handleAnalyze = async () => {
    setSending(true);
    try {
      await fetchData();
    } finally {
      setSending(false);
    }
  };

  const fetchData = async () => {
    if (code !== "") {
      try {
        const patternNames = checked.filter(Boolean); // Filter out empty values
        const response = await axios.post(
          "http://localhost:5000/flask/source",
          { sourceCode: code, pattern_names: patternNames } // Include pattern names in the request
        );
        setError(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="editor">
      <SelectPatterns checked={checked} setChecked={setChecked} />
      <div className="editorTop">
        <Tab></Tab>
        {sending ? (
          <button className="loadingButton" disabled>
            <CircularProgress
              className="loadingIcon"
              size="1.5rem"
              sx={{ color: "#fff" }}
            />
          </button>
        ) : (
          <button
            onClick={handleAnalyze}
            className={
              code !== ""
                ? "analyzeButton"
                : "analyzeButton analyzeButtonDisable"
            }
          >
            Analyze
            <TroubleshootIcon className="analyzeButtonIcon" />
          </button>
        )}
      </div>
      <AceEditor
        mode="python"
        theme="dracula"
        value={code}
        onChange={setCode}
        name="code-editor"
        editorProps={{ $blockScrolling: true }}
        fontSize={18}
        height="calc(100% - 45px - 1rem)"
        width="100%"
        annotations={error.map((el) => ({
          row: el.bug_line - 1, // Vì số dòng tính từ 0, nên cần giảm đi 1
          type: "warning",
          text: el.bug_desc,
        }))}
      />
    </div>
  );
}

export default function Editor() {
  return <EditorContent></EditorContent>;
}
