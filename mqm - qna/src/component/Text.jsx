import React, { useEffect, useRef, useState } from "react";
import ContentEditable from "react-contenteditable";
import Button from "./Button";

const Text = ({
  title = "",
  id = "",
  highlightedData = [],
  setHighlightedData = () => {},
  setSelectedHightlightedData = () => {},
  setHtml = () => {},
  html = "",
  setOpenDrawer = () => {},
}) => {
  const contentEditableRef = useRef();
  const [selectedElementID, setSelectedElemenID] = useState(null);
  const scrollDivRef = useRef();

  const handleSelectHightlight = (e) => {
    const elementID = Number(e.target.id);
    setSelectedElemenID(elementID);
  };

  const handleCircleClicked = (elementID) => {
    setOpenDrawer(true);
    setSelectedElemenID(elementID);
  };

  const handleSelect = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString();

    if (selectedText) {
      const range = selection.getRangeAt(0);
      const textNode = range.startContainer;
      let start = range.startOffset;
      let end = range.endOffset;

      // Extend the start to the beginning of the word
      while (start > 0 && /\S/.test(textNode.textContent[start - 1])) {
        start--;
      }

      // Extend the end to the end of the word
      while (
        end < textNode.textContent.length &&
        /\S/.test(textNode.textContent[end])
      ) {
        end++;
      }

      // Update the selection to the whole word
      const newRange = document.createRange();
      newRange.setStart(textNode, start);
      newRange.setEnd(textNode, end);

      selection.removeAllRanges();
      selection.addRange(newRange);
    }
  };

  const handleLabelError = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString();

    if (selectedText) {
      const range = selection.getRangeAt(0);
      const textNode = range.startContainer;
      let start = range.startOffset;
      let end = range.endOffset;

      // Extend the start and end to the beginning and end of the word
      while (start > 0 && /\S/.test(textNode.textContent[start - 1])) {
        start--;
      }

      while (
        end < textNode.textContent.length &&
        /\S/.test(textNode.textContent[end])
      ) {
        end++;
      }

      const fullWord = textNode.textContent.slice(start, end);
      const elementID = new Date().getTime();

      const fullText = contentEditableRef.current.innerText;
      const fullWordStartIndex = fullText.indexOf(fullWord);
      const fullWordEndIndex = fullWordStartIndex + fullWord.length - 1;

      const existingData = highlightedData[id].find(
        (data) =>
          data.startIndex === fullWordStartIndex &&
          data.endIndex === fullWordEndIndex
      );

      if (existingData) {
        // If the selection already exists, update the count in the circle
        const span = document.getElementById(existingData.id);
        if (span) {
          let countCircle = span.querySelector(".count-circle");
          if (countCircle) {
            let count = parseInt(countCircle.textContent, 10);
            count++;
            countCircle.textContent = count;
          } else {
            // If the circle doesn't exist, create it with initial count
            countCircle = document.createElement("span");
            countCircle.classList.add(
              "count-circle",
              "ml-[4px]",
              "rounded-[50%]",
              "bg-[yellow]",
              "text-[10px]",
              "inline-flex",
              "items-center",
              "justify-center",
              "w-[25px]",
              "h-[25px]"
            );
            countCircle.textContent = "2";
            countCircle.addEventListener("click", () =>
              handleCircleClicked(existingData.id)
            );

            span.appendChild(countCircle);
          }
        }
      }

      // Create a new span element for the full word with a new ID
      const span = document.createElement("span");
      span.textContent = fullWord;
      span.id = elementID;
      span.addEventListener("click", handleSelectHightlight);

      // Default underline-offset class
      span.className =
        "underline pb-[2px] decoration-[yellow] inline-block cursor-pointer underline-offset-[4px]";

      // Create new range to replace the full word
      const newRange = document.createRange();
      newRange.setStart(textNode, start);
      newRange.setEnd(textNode, end);

      newRange.deleteContents();
      newRange.insertNode(span);

      // To reset the selection and place the cursor after the inserted span
      const resetRange = document.createRange();
      resetRange.setStartAfter(span);
      resetRange.setEndAfter(span);
      selection.removeAllRanges();
      selection.addRange(resetRange);

      // Update the html state to reflect the change
      const updatedHtml = contentEditableRef.current.innerHTML;
      setHtml(updatedHtml);

      const data = {
        id: elementID,
        text: fullWord,
        startIndex: fullWordStartIndex,
        endIndex: fullWordEndIndex,
        group: id,
      };

      setHighlightedData((prev) => ({
        ...prev,
        [id]: [...(prev[id] || []), data],
      }));

      // Add the new data to setSelectedHightlightedData
      setSelectedHightlightedData(data);
    }
  };

  useEffect(() => {
    if (selectedElementID) {
      setSelectedHightlightedData(
        highlightedData[id].find((ht) => ht.id === selectedElementID)
      );
      setSelectedElemenID("");
    }
  }, [highlightedData, id, selectedElementID]);

  // scroll
  useEffect(() => {
    const element = scrollDivRef.current;
    const handleScroll = () => {
      const otherElementID =
        id === "source" ? "translation-scroll" : "source-scroll";
      const otherElementToScroll = document.getElementById(otherElementID);
      if (otherElementToScroll) {
        otherElementToScroll.scrollTop = element.scrollTop;
      }
    };
    if (element) {
      element.addEventListener("scroll", handleScroll);
    }

    return () => {
      element.removeEventListener("scroll", handleScroll);
    };
  }, [id, scrollDivRef]);

  return (
    <div className="bg-white max-w-[370px] rounded-lg">
      <div className="p-[20px] bg-[white] rounded-lg">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-black text-[20px]">{title}</h2>
          <Button onClick={handleLabelError} variant="secondary">
            Label Error
          </Button>
        </div>

        <div
          id={id + "-scroll"}
          ref={scrollDivRef}
          className="overflow-auto max-h-[620px]"
        >
          <p className="leading-6">
            <ContentEditable
              id={id + "-content"}
              className="content-editable"
              innerRef={contentEditableRef}
              html={html}
              onMouseUp={handleSelect}
              tagName="div"
              disabled
            />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Text;
