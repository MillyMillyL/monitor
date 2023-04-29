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

export default function LoggingToolbar({ allOpen, handleAllOpen }) {
  return (
    <Toolbar className="toolbar">
      <Typography variant="h4">Logging</Typography>
      <Box>
        <FormControl sx={{ minWidth: 160, mr: 1 }} size="small">
          <InputLabel id="loglevel-label">Log Level</InputLabel>
          <Select
            labelId="loglevel-label"
            id="loglevel-select"
            // value={age}
            label="Log Level"
            // onChange={handleChange}
          >
            <MenuItem value="" selected>
              All
            </MenuItem>
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
            //value={"Development"}
            label="Environment"
            // onChange={handleChange}
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
            defaultValue=""
            size="small"
            type="date"
            InputLabelProps={{ shrink: true }}
          />
        </FormControl>
        <FormControl>
          <TextField
            label="End Date"
            id="end_date"
            defaultValue=""
            size="small"
            type="date"
            InputLabelProps={{ shrink: true }}
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
        onChange={handleAllOpen}
        checked={allOpen}
      />
    </Toolbar>
  );
}
