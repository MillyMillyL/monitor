import React from "react";
import Toolbar from "@mui/material/Toolbar";
import { Typography } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

export default function LoggingToolbar({ allOpen, handleAllOpen }) {
  return (
    <Toolbar className="toolbar">
      <Typography variant="h4">Logging</Typography>
      <FormControlLabel
        control={<Switch />}
        label="Unfold All"
        onChange={handleAllOpen}
        checked={allOpen}
      />
    </Toolbar>
  );
}
