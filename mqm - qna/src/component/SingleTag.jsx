import { Box, ButtonGroup, Button, Typography } from "@mui/material";
import React from "react";

export default function SingleTag({
  handleSelect = () => {},
  data,
  selectedHightlight,
}) {
  return (
    <Box mb={2} key={data}>
      <Typography fontWeight="bold" variant="body1">
        {data}
      </Typography>
      <ButtonGroup
        sx={{ mt: 2 }}
        variant="outlined"
        aria-label="Basic button group"
      >
        {["Neutral", "Minor", "Major"].map((option) => (
          <Button
            variant={
              selectedHightlight?.tags?.[data] === option
                ? "contained"
                : "outlined"
            }
            key={option}
            onClick={() => handleSelect(data, option)}
          >
            {option}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
}
