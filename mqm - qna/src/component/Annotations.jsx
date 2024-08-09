import React, { useMemo, useState } from "react";
import Button from "./Button";
import SelectComponent from "./SelectComponent";
import RadioComponent from "./RadioComponent";
import Tags from "./Tags";
import { Box, Drawer, Typography } from "@mui/material";

const Annotations = ({
  data = [],
  defaultValue = {},
  setHtml = () => {},
  setHighlightedData = () => {},
  highlightedData = [],
  setSelectedHightlightedData = () => {},
  openDrawer = false,
  setOpenDrawer = () => {},
}) => {
  const [previousSelected, setPreviousSelected] = useState({});

  const handleDeleteElement = () => {
    const spanElement = document.getElementById(defaultValue.id);

    if (spanElement) {
      const content = spanElement.innerHTML;
      const textNode = document.createTextNode(content);

      // Get the previous and next siblings of the span element
      const previousSibling = spanElement.previousSibling;
      const nextSibling = spanElement.nextSibling;

      // Replace the span element with the text node
      spanElement.replaceWith(textNode);

      // If the previous sibling is a text node, merge it with the new text node
      if (previousSibling && previousSibling.nodeType === Node.TEXT_NODE) {
        previousSibling.textContent += textNode.textContent;
        textNode.remove();
      }

      // If the next sibling is a text node, merge it with the new text node
      if (nextSibling && nextSibling.nodeType === Node.TEXT_NODE) {
        previousSibling.textContent += nextSibling.textContent;
        nextSibling.remove();
      }

      const mainElementID = defaultValue.group + "-content";

      const updatedHtml = document.getElementById(mainElementID);
      if (updatedHtml) {
        setHtml(updatedHtml.innerHTML);
      }

      setHighlightedData((prev) => ({
        ...prev,
        [defaultValue.group]:
          prev[defaultValue.group].filter((d) => d.id !== defaultValue.id) ||
          [],
      }));
      setSelectedHightlightedData({});
    }
  };

  const sameTextMultiHightlighted = useMemo(() => {
    if (Object.keys(defaultValue).length) {
      return highlightedData[defaultValue.group].filter(
        (data) =>
          data.startIndex === defaultValue.startIndex &&
          data.endIndex === defaultValue.endIndex
      );
    }
    return [];
  }, [highlightedData, defaultValue]);

  const handleChange = (value) => {
    setSelectedHightlightedData(value);
    setPreviousSelected(value);

    setOpenDrawer(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg max-w-[370px] min-w-[370px] p-[20px] ">
        <div className="flex justify-between items-center">
          {/* <Button variant="secondary">Label Error</Button> */}
          <Button onClick={handleDeleteElement} variant="secondary">
            Delete Highlight
          </Button>
        </div>
        <h2 className="text-black  w-full text-[24px] mt-4">Annotations</h2>
        <div>
          <SelectComponent
            setSelectedHightlightedData={setSelectedHightlightedData}
            defaultValue={defaultValue}
            options={data}
          />
          <Tags
            selectedHightlight={defaultValue}
            highlightedData={highlightedData}
            setHighlightedData={setHighlightedData}
            setSelectedHightlightedData={setSelectedHightlightedData}
          />
        </div>
      </div>
      <Drawer anchor="left" open={openDrawer}>
        <Box p={2} role="presentation" className="flex flex-col gap-y-2">
          {sameTextMultiHightlighted.map((data) => (
            <Typography
              onClick={() => handleChange(data)}
              key={data.id}
              variant="body1"
              sx={{
                minWidth: "300px",
                cursor: "pointer",
                padding: 2,
                borderRadius: "5px",
              }}
              className={`block mb-3 ${
                previousSelected.id === data.id ? "bg-gray-300" : ""
              } hover:bg-gray-300 `}
            >
              {data.text}
            </Typography>
          ))}
        </Box>
      </Drawer>
    </>
  );
};

export default Annotations;
