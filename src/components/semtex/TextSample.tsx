import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { Box, Typography } from "@mui/material";
import { useAtomValue } from "jotai";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useAuth from "src/contexts/AuthContext";
import useDataset from "src/hooks/dataset";
import useUserResponse from "src/hooks/user_response";
import { Highlight } from "src/types/client";
import { isLight } from "src/utils/color";
import { highlightAtom } from "./Highlighters";
import { textSampleIdAtom, userResponseIdAtom } from "./Semtex";

const TextSample = () => {
  const router = useRouter();
  const { dataset } = useDataset(router.query.datasetID as string | undefined);

  const textSampleID = useAtomValue(textSampleIdAtom);
  const textSample = dataset?.textSamples.find(
    (textSample) => textSample.id === textSampleID
  );

  const userResponseID = useAtomValue(userResponseIdAtom);
  const { user } = useAuth();
  const { userResponse, setHighlights } = useUserResponse(user, userResponseID);

  const highlights = userResponse?.highlights;

  const activeHighlight = useAtomValue(highlightAtom);
  const [textContent, setTextContent] = useState<ReactJSXElement[]>([]);
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
  }, [highlights, textSampleID, textSample?.body]);

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

      const tempHighlights = highlights?.filter(
        (highlight) =>
          highlight.startIndex >= end || highlight.endIndex <= start
      );
      (tempHighlights ?? []).push(newSelection as Highlight);

      setHighlights(userResponse, tempHighlights);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: activeHighlight ? "#DCDCDC" : "#F5F5F0",
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
