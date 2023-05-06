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

export default function LoggingToolbar({ state, handleToolbar }) {
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
        <FormControl>
          <Button size="small">1day</Button>
        </FormControl>
        <FormControl>
          <Button size="small">3day</Button>
        </FormControl>
        <FormControl>
          <Button size="small">1week</Button>
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
