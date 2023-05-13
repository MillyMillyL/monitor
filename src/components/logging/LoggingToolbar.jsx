import React from "react";
import Toolbar from "@mui/material/Toolbar";
import { Box, Typography } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { LOGGING_ACTION } from "@/reducer/loggingReducer";
import { VerticalAlignBottom } from "@mui/icons-material";

export default function LoggingToolbar({ state, handleToolbar }) {
  const daysSelected =
    (new Date(state.dateEnd) - new Date(state.dateStart)) / 86400000 + 1;

  const handleDaysSelection = (days) => {
    const current_Date = new Date();
    const dte_Today = current_Date.toJSON().slice(0, 10);

    let dte_Start = dte_Today;
    if (days !== 1) {
      current_Date.setDate(current_Date.getDate() - days + 1);
      dte_Start = current_Date.toJSON().slice(0, 10);
    }

    handleToolbar({
      type: LOGGING_ACTION.DATE_RANGE,
      dateStart: dte_Start,
      dateEnd: dte_Today,
    });
  };

  return (
    <Toolbar className="toolbar">
      <Typography variant="h4">Logging</Typography>
      <Box>
        <FormControl sx={{ minWidth: 160, mr: 1 }} size="small">
          <InputLabel id="loglevel-label">Log Level</InputLabel>
          <Select
            labelId="loglevel-label"
            id="loglevel-select"
            value={state.loglevel}
            label="Log Level"
            onChange={(e) => {
              handleToolbar({
                type: LOGGING_ACTION.LOG_LEVEL,
                loglevel: e.target.value,
              });
            }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Information">Information</MenuItem>
            <MenuItem value="Warning">Warning</MenuItem>
            <MenuItem value="Error">Error</MenuItem>
            <MenuItem value="Critical">Critical</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 160, mr: 1 }} size="small">
          <InputLabel id="env-label">Environment</InputLabel>
          <Select
            labelId="env-label"
            id="env-select"
            value={state.environment}
            label="Environment"
            onChange={(e) => {
              handleToolbar({
                type: LOGGING_ACTION.LOG_ENV,
                environment: e.target.value,
              });
            }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Development">Development</MenuItem>
            <MenuItem value="Test">Test</MenuItem>
            <MenuItem value="Staging">Staging</MenuItem>
            <MenuItem value="Production">Production</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ mr: 0.5 }}>
          <TextField
            label="Start Date"
            id="start_date"
            size="small"
            type="date"
            value={state.dateStart}
            InputLabelProps={{ shrink: true }}
            onChange={(e) =>
              handleToolbar({
                type: LOGGING_ACTION.DATE_RANGE,
                dateStart: e.target.value,
              })
            }
          />
        </FormControl>
        <FormControl>
          <TextField
            label="End Date"
            id="end_date"
            size="small"
            type="date"
            value={state.dateEnd}
            InputLabelProps={{ shrink: true }}
            onChange={(e) =>
              handleToolbar({
                type: LOGGING_ACTION.DATE_RANGE,
                dateEnd: e.target.value,
              })
            }
          />
        </FormControl>
        <FormControl sx={{ verticalAlign: "sub", marginLeft: "0.5rem" }}>
          <Button
            size="small"
            variant={daysSelected === 1 ? "contained" : "text"}
            onClick={() => handleDaysSelection(1)}
          >
            1day
          </Button>
        </FormControl>
        <FormControl sx={{ verticalAlign: "sub", marginLeft: "0.2rem" }}>
          <Button
            size="small"
            variant={daysSelected === 3 ? "contained" : "text"}
            onClick={() => handleDaysSelection(3)}
          >
            3day
          </Button>
        </FormControl>
        <FormControl sx={{ verticalAlign: "sub", marginLeft: "0.2rem" }}>
          <Button
            size="small"
            variant={daysSelected === 7 ? "contained" : "text"}
            onClick={() => handleDaysSelection(7)}
          >
            1week
          </Button>
        </FormControl>
        <FormControl sx={{ verticalAlign: "sub", marginLeft: "0.2rem" }}>
          <Button
            size="small"
            variant={daysSelected === 30 ? "contained" : "text"}
            onClick={() => handleDaysSelection(30)}
          >
            1month
          </Button>
        </FormControl>
      </Box>
      <FormControlLabel
        control={<Switch />}
        label="Unfold All"
        onChange={() => handleToolbar(LOGGING_ACTION.ALL_OPEN)}
        checked={state.allOpen}
      />
    </Toolbar>
  );
}
