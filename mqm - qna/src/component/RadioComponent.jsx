import React from "react";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomFormControlLabel = styled(FormControlLabel)(
  ({ theme, checked }) => ({
    backgroundColor: checked ? theme.palette.action.selected : "transparent",
    borderRadius: theme.shape.borderRadius,
    margin: theme.spacing(1, 0),
    "& .MuiFormControlLabel-label": {
      width: "100%",
      padding: theme.spacing(1),
    },
  })
);

const CustomRadio = styled(Radio)({
  display: "none",
});

const RadioComponent = ({ options, value, onChange, label }) => {
  return (
    <Box>
      {label && (
        <Typography variant="p" gutterBottom>
          {label}
        </Typography>
      )}
      <RadioGroup
        value={value}
        onChange={onChange}
        sx={{ display: "flex", flexDirection: "row", marginTop: "8px" }}
      >
        {options.map((option) => (
          <CustomFormControlLabel
            key={option}
            value={option}
            control={<CustomRadio />}
            label={option}
            checked={value === option}
          />
        ))}
      </RadioGroup>
    </Box>
  );
};

export default RadioComponent;
