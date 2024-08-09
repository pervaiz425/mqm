import React, { useMemo, useState } from "react";
import Text from "../component/Text";
import Button from "../component/Button";
import Annotations from "../component/Annotations";

const Sources = () => {
  const [highlightedData, setHighlightedData] = useState({
    source: [],
    translation: [],
  });
  const [selectedHightlightedData, setSelectedHightlightedData] = useState({});

  const [sourceHTML, setSourceHTML] = useState(
    "MEDIKAMENTöSE THERAPIE: Die aktualisierte Dyslipidämie-Leitlinie der European Society of Cardiology senkt nochmals die LDL-Cholesterinzielwerte. MEDIKAMENTöSE THERAPIE: Die aktualisierte Dyslipidämie-Leitlinie der European Society of Cardiology senkt nochmals die LDL-Cholesterinzielwerte. MEDIKAMENTöSE THERAPIE:  Die aktualisierte Dyslipidämie-Leitlinie der European Society of Cardiology senkt nochmals die LDL-Cholesterinzielwerte. MEDIKAMENTöSE THERAPIE: Die aktualisierte Dyslipidämie-Leitlinie der European Society of Cardiology senkt nochmals die LDL-Cholesterinzielwerte.MEDIKAMENTöSE THERAPIE: Die aktualisierte Dyslipidämie-Leitlinie der European Society of Cardiology senkt nochmals die LDL-Cholesterinzielwerte. MEDIKAMENTöSE THERAPIE: Die aktualisierte Dyslipidämie-Leitlinie der European Society of Cardiology senkt nochmals die LDL-Cholesterinzielwerte. MEDIKAMENTöSE THERAPIE:  Die aktualisierte Dyslipidämie-Leitlinie der European Society of Cardiology senkt nochmals die LDL-Cholesterinzielwerte. MEDIKAMENTöSE THERAPIE: Die aktualisierte Dyslipidämie-Leitlinie der European Society of Cardiology senkt nochmals die LDL-Cholesterinzielwerte.MEDIKAMENTöSE THERAPIE: Die aktualisierte Dyslipidämie-Leitlinie der European Society of Cardiology senkt nochmals die LDL-Cholesterinzielwerte. MEDIKAMENTöSE THERAPIE: Die aktualisierte Dyslipidämie-Leitlinie der European Society of Cardiology senkt nochmals die LDL-Cholesterinzielwerte. MEDIKAMENTöSE THERAPIE:  Die aktualisierte Dyslipidämie-Leitlinie der European Society of Cardiology senkt nochmals die LDL-Cholesterinzielwerte. MEDIKAMENTöSE THERAPIE: Die aktualisierte Dyslipidämie-Leitlinie der European Society of Cardiology senkt nochmals die LDL-Cholesterinzielwerte.MEDIKAMENTöSE THERAPIE: Die aktualisierte Dyslipidämie-Leitlinie der European Society of Cardiology senkt nochmals die LDL-Cholesterinzielwerte. MEDIKAMENTöSE THERAPIE: Die aktualisierte Dyslipidämie-Leitlinie der European Society of Cardiology senkt nochmals die LDL-Cholesterinzielwerte. MEDIKAMENTöSE THERAPIE:  Die aktualisierte Dyslipidämie-Leitlinie der European Society of Cardiology senkt nochmals die LDL-Cholesterinzielwerte. MEDIKAMENTöSE THERAPIE: Die aktualisierte Dyslipidämie-Leitlinie der European Society of Cardiology senkt nochmals die LDL-Cholesterinzielwerte."
  );

  const [translationHtml, setTranslationHTML] = useState(
    "MEDIKAMENTöSE THERAPIE: Die aktualisierte Dyslipidämie-Leitlinie der European Society of Cardiology senkt nochmals die LDL-Cholesterinzielwerte. MEDIKAMENTöSE THERAPIE: Die aktualisierte Dyslipidämie-Leitlinie der European Society of Cardiology senkt nochmals die LDL-Cholesterinzielwerte. MEDIKAMENTöSE THERAPIE:  Die aktualisierte Dyslipidämie-Leitlinie der European Society of Cardiology senkt nochmals die LDL-Cholesterinzielwerte. MEDIKAMENTöSE THERAPIE: Die aktualisierte Dyslipidämie-Leitlinie der European Society of Cardiology senkt nochmals die LDL-Cholesterinzielwerte.MEDIKAMENTöSE THERAPIE: Die aktualisierte Dyslipidämie-Leitlinie der European Society of Cardiology senkt nochmals die LDL-Cholesterinzielwerte. MEDIKAMENTöSE THERAPIE: Die aktualisierte Dyslipidämie-Leitlinie der European Society of Cardiology senkt nochmals die LDL-Cholesterinzielwerte. MEDIKAMENTöSE THERAPIE:  Die aktualisierte Dyslipidämie-Leitlinie der European Society of Cardiology senkt nochmals die LDL-Cholesterinzielwerte. MEDIKAMENTöSE THERAPIE: Die aktualisierte Dyslipidämie-Leitlinie der European Society of Cardiology senkt nochmals die LDL-Cholesterinzielwerte.MEDIKAMENTöSE THERAPIE: Die aktualisierte Dyslipidämie-Leitlinie der European Society of Cardiology senkt nochmals die LDL-Cholesterinzielwerte. MEDIKAMENTöSE THERAPIE: Die aktualisierte Dyslipidämie-Leitlinie der European Society of Cardiology senkt nochmals die LDL-Cholesterinzielwerte. MEDIKAMENTöSE THERAPIE:  Die aktualisierte Dyslipidämie-Leitlinie der European Society of Cardiology senkt nochmals die LDL-Cholesterinzielwerte. MEDIKAMENTöSE THERAPIE: Die aktualisierte Dyslipidämie-Leitlinie der European Society of Cardiology senkt nochmals die LDL-Cholesterinzielwerte.MEDIKAMENTöSE THERAPIE: Die aktualisierte Dyslipidämie-Leitlinie der European Society of Cardiology senkt nochmals die LDL-Cholesterinzielwerte. MEDIKAMENTöSE THERAPIE: Die aktualisierte Dyslipidämie-Leitlinie der European Society of Cardiology senkt nochmals die LDL-Cholesterinzielwerte. MEDIKAMENTöSE THERAPIE:  Die aktualisierte Dyslipidämie-Leitlinie der European Society of Cardiology senkt nochmals die LDL-Cholesterinzielwerte. MEDIKAMENTöSE THERAPIE: Die aktualisierte Dyslipidämie-Leitlinie der European Society of Cardiology senkt nochmals die LDL-Cholesterinzielwerte."
  );

  const [openDrawer, setOpenDrawer] = useState(false);

  const dropdownValues = useMemo(() => {
    let options = [];
    Object.keys(highlightedData).forEach((key) => {
      options = [...options, ...highlightedData[key]];
    });

    return options;
  }, [highlightedData]);

  return (
    <div className="bg-[#F4F4F4] flex justify-center flex-col items-center h-full">
      <div>
        <div className="flex gap-[24px] ">
          <div className="flex gap-[24px]">
            <Text
              highlightedData={highlightedData}
              setHighlightedData={setHighlightedData}
              setSelectedHightlightedData={setSelectedHightlightedData}
              title="Source Text"
              id="source"
              setHtml={setSourceHTML}
              html={sourceHTML}
              setOpenDrawer={setOpenDrawer}
            />
            <Text
              highlightedData={highlightedData}
              setHighlightedData={setHighlightedData}
              setSelectedHightlightedData={setSelectedHightlightedData}
              title="Translation Text"
              id="translation"
              setHtml={setTranslationHTML}
              html={translationHtml}
              setOpenDrawer={setOpenDrawer}
            />
          </div>

          <Annotations
            defaultValue={selectedHightlightedData}
            data={dropdownValues}
            setHtml={
              selectedHightlightedData["group"] === "source"
                ? setSourceHTML
                : setTranslationHTML
            }
            html={
              selectedHightlightedData["group"] === "source"
                ? sourceHTML
                : translationHtml
            }
            setHighlightedData={setHighlightedData}
            highlightedData={highlightedData}
            setSelectedHightlightedData={setSelectedHightlightedData}
            openDrawer={openDrawer}
            setOpenDrawer={setOpenDrawer}
          />
        </div>
      </div>

      <div className="w-[70%]">
        <div className="flex justify-between mt-[18px]">
          <div>
            <Button>Save</Button>
          </div>
          <div className="flex gap-[8px]">
            <Button>No issue</Button>
            <Button>Jump to next unevaluated</Button>
            <Button>Submit</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sources;
