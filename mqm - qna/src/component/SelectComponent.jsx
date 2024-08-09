import React, { useEffect, useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function SelectComponent({
  options = [],
  defaultValue = {},
  setSelectedHightlightedData = () => {},
}) {
  const [selectedData, setSelectedData] = useState({});
  const handleChange = (e) => {
    setSelectedData(e.target.value);
    setSelectedHightlightedData(e.target.value);
  };

  useEffect(() => {
    setSelectedData(defaultValue);
  }, [defaultValue]);

  return (
    <div>
      <FormControl sx={{ width: 310, mt: 1 }}>
        <Select
          value={selectedData}
          onChange={handleChange}
          input={
            <OutlinedInput sx={{ height: 38, padding: "8px 8px 8px 0" }} />
          }
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
        >
          {options.map((option) => (
            <MenuItem
              key={option.id}
              value={option}
              style={{
                // ...getStyles(name, personName, theme),
                paddingTop: 4,
                paddingBottom: 4,
              }}
            >
              {option.text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
