"use client";

import React, { useState } from "react";
import { Stack, TextField, InputAdornment, IconButton } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

export const MuiTextFeild = () => {
  const [show, setShow] = useState(false);

  return (
    <Stack spacing={4}>
      <Stack direction="row" spacing={2}>
        <TextField label="name" variant="outlined" />
        <TextField label="name" variant="filled" />
        <TextField label="name" variant="standard" />
      </Stack>

      <Stack direction="row" spacing={2}>
        <TextField
          label="small form"
          variant="outlined"
          color="secondary"
          size="small"
        />
        <TextField
          label="Medium form"
          variant="outlined"
          color="error"
          size="medium"
        />
      </Stack>
      <Stack direction="row" spacing={2}>
        <TextField label="Required form" required />
        <TextField
          label="Password"
          type={show ? "text" : "password"}
          helperText="Do not share your password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShow(!show)}>
                  {show ? (
                    <VisibilityOutlinedIcon />
                  ) : (
                    <VisibilityOffOutlinedIcon />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Read Only"
          value="Cant type"
          InputProps={{ readOnly: true }}
        />
        <TextField
          label="Amount"
          type="number"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
        <TextField
          label="Weight"
          type="number"
          InputProps={{
            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
          }}
        />
      </Stack>
    </Stack>
  );
};
