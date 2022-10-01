import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { Box, Typography } from "@mui/material";
import { useAtomValue } from "jotai";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useDataset from "src/hooks/dataset";
import useHighlights from "src/hooks/highlights";
import useUserResponses from "src/hooks/user_responses";
import { Highlight } from "src/types/client";
import { isLight } from "src/utils/color";
import { highlightsDbAccess } from "src/utils/user_response";
import { highlightAtom } from "./Highlighters";
import { textSampleIndexAtom } from "./Semtex";

const TextSample = () => {
  const router = useRouter();
  const datasetID = router.query.datasetID as string | undefined;
  const { dataset } = useDataset(datasetID);
  const textSampleIndex = useAtomValue(textSampleIndexAtom);
  const textSample = dataset?.textSamples[textSampleIndex];
  const { userResponses, mutate } = useUserResponses(datasetID);
  const [textContent, setTextContent] = useState<ReactJSXElement[]>([]);

  const { highlights } = useHighlights(
    userResponses?.find((response) => response.textSample.id === textSample?.id)
      ?.id
  );

  const activeHighlight = useAtomValue(highlightAtom);

  const { insertHighlight, deleteHighlight } = highlightsDbAccess(
    userResponses,
    textSample?.id,
    mutate
  );

  useEffect(() => {
    // If no highlights
    if (highlights === undefined || highlights.length === 0) {
      setTextContent([<span key={0}>{textSample?.body}</span>]);
      return;
    }

    const tempTextContent = [];

    // Create span / mark elements for all highlights
    let nextIndex = 0;
    highlights.forEach((highlight) => {
      if (highlight.startIndex !== nextIndex) {
        tempTextContent.push(
          <span key={nextIndex}>
            {textSample?.body.slice(nextIndex, highlight.startIndex)}
          </span>
        );
      }

      const color = highlight.highlightOption!.color;

      tempTextContent.push(
        <mark
          key={highlight.startIndex}
          style={{
            backgroundColor: color,
            color: isLight(color) === true ? "black" : "white",
          }}
        >
          {textSample?.body.slice(highlight.startIndex, highlight.endIndex)}
        </mark>
      );
      nextIndex = highlight.endIndex;
    });

    // Last span
    if (nextIndex !== textSample?.body.length) {
      tempTextContent.push(
        <span key={nextIndex}>
          {textSample?.body.slice(nextIndex, textSample.body.length)}
        </span>
      );
    }

    setTextContent(tempTextContent);
  }, [highlights, textSample]);

  // --------------------------------- Function for Comparing Highlight Indicies ----------------------
  // const compareStart = (a: highlightData, b: highlightData) => {
  //   if (a.start < b.start) {
  //     return -1;
  //   }
  //   if (a.start > b.start) {
  //     return 1;
  //   }
  //   return 0;
  // };

  // ------------------------------------ Function For Handling Sorting the Highlights ------------------

  // Constructs the highlighter state using the given sorted highlightMap.
  // const constructText = (map: highlightData[]) => {
  //   const output: object[] = [];
  //
  //   map.forEach((item) => {
  //     // If the item is plain text, put it in a span
  //     if (item.color == null) {
  //       output.push(<span>{item.value}</span>);
  //     }
  //     // If the item is a highlight, put it in a mark with the corresponding
  //     // color
  //     else {
  //       output.push(<mark>{item.value}</mark>);
  //     }
  //   });
  //
  //   return output;
  // };
  //
  // // -------------------------------------- Function For Handling the Highlight --------------------------
  const handleMouseUp = () => {
    if (activeHighlight === undefined) return;

    const selObj = window.getSelection();

    if (selObj != null && selObj.focusNode == selObj.anchorNode) {
      let start = selObj.anchorOffset;
      let end = selObj.focusOffset;

      // Make it so the user can highlight backwards
      if (start > end) {
        const temp = start;
        start = end;
        end = temp;
      }

      const newSelection: Omit<Highlight, "id"> = {
        startIndex: start,
        endIndex: end,
        selection: selObj.toString(),
        highlightOption: activeHighlight,
      };

      highlights
        .filter((highlight) => highlight.endIndex > start)
        .forEach((highlight) => {
          console.log(highlight);
          // deleteHighlight(highlight.id);
        });

      insertHighlight(newSelection);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#F5F5F0",
        height: "40vh",
        borderRadius: "16px",
        padding: "10px",
        overflowY: "scroll",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <Typography
        onMouseUp={handleMouseUp}
        fontFamily="Roboto Mono"
        fontSize="24px"
      >
        {activeHighlight ? textSample?.body : textContent}
      </Typography>
    </Box>
  );
};

export default TextSample;
