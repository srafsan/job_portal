import React, { useState } from "react";
import { Stack, Rating } from "@mui/material";

const MuiRating = () => {
  const [value, setValue] = useState<number | null>(null);
  const handleChange = () => {};
  return (
    <Stack spacing={2}>
      <Rating value={value} onChange={handleChange} />
    </Stack>
  );
};

export default MuiRating;
