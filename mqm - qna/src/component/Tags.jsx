import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Box, Button, ButtonGroup } from "@mui/material";
import SingleTag from "./SingleTag";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem", color: "white" }} />
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const accordionData = [
  {
    title: "Accuracy",
    dropdowns: ["Mistranslation", "Addition", "Omission", "Untranslated"],
  },
  {
    title: "Linguistic Conventions",
    dropdowns: [
      "Grammar",
      "Punctuation",
      "Spelling",
      "Character encoding",
      "Register",
    ],
  },
  {
    title: "Terminology",
    dropdowns: ["Inconsistent use of terminology", "Wrong term"],
  },
  {
    title: "Style",
    dropdowns: ["Non-fluent"],
  },
  {
    title: "Locale Conventions",
    dropdowns: [
      "Number format",
      "Currency format",
      "Measurement format",
      "Time format",
      "Date format",
      "Address format",
      "Telephone format",
    ],
  },
];

export default function Tags({
  selectedHightlight = [],
  highlightedData = [],
  setHighlightedData = () => {},
  setSelectedHightlightedData = () => {},
}) {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleSelect = (key, value) => {
    if (Object.keys(selectedHightlight).length) {
      let data = [...highlightedData[selectedHightlight.group]];
      const index = data.findIndex((d) => d.id === selectedHightlight.id);
      let tags = data[index].tags || {};

      const updateData = {
        ...data[index],
        tags: {
          ...tags,
          [key]: value,
        },
      };

      data[index] = updateData;
      setSelectedHightlightedData(updateData);
      setHighlightedData((prev) => ({
        ...prev,
        [selectedHightlight.group]: data,
      }));
    }
  };

  return (
    <Box mt={2}>
      <SingleTag
        data="Source Error"
        handleSelect={handleSelect}
        selectedHightlight={selectedHightlight}
      />
      {accordionData.map((item) => (
        <Accordion
          key={item.title}
          expanded={expanded === item.title}
          onChange={handleChange(item.title)}
        >
          <AccordionSummary
            aria-controls={`${item.title}d-content`}
            id={`${item.title}d-header`}
            sx={{ backgroundColor: "#0E1B6B", color: "white" }}
          >
            <Typography>{item.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {item.dropdowns.map((data) => (
              <SingleTag
                key={data}
                data={data}
                handleSelect={handleSelect}
                selectedHightlight={selectedHightlight}
              />
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
      <Box mt={2}>
        <SingleTag
          data="Other"
          handleSelect={handleSelect}
          selectedHightlight={selectedHightlight}
        />
        <SingleTag
          data="Unintelligible"
          handleSelect={handleSelect}
          selectedHightlight={selectedHightlight}
        />
      </Box>
    </Box>
  );
}
