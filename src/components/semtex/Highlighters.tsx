import { Delete } from "@mui/icons-material";
import { Box, Button, ClickAwayListener, Stack } from "@mui/material";
import { atom, useAtom, useAtomValue } from "jotai";
import { useRouter } from "next/router";
import useDataset from "src/hooks/dataset";
import useUserResponse from "src/hooks/user_response";
import { HighlightOption } from "src/types/client";
import { isLight } from "src/utils/color";
import { userResponseIdAtom } from "./Semtex";

export const highlightAtom = atom<HighlightOption | undefined>(undefined);

const Highlighters = () => {
  const router = useRouter();
  const datasetID = router.query.datasetID as string | undefined;
  const { dataset } = useDataset(datasetID);
  const HighlightOptions = dataset?.highlightOptions;

  const userResponseID = useAtomValue(userResponseIdAtom);
  const { userResponse, deleteHighlight } = useUserResponse(userResponseID);

  const [active, setActive] = useAtom(highlightAtom);

  const handleClick = (highlighter: HighlightOption) => {
    setActive(highlighter);
  };

  const handleClickAway = () => {
    setActive(undefined);
  };

  const handleDelete = () => {
    userResponse?.highlights?.forEach((highlight) => {
      deleteHighlight(highlight.id);
    });
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box
        marginTop={4}
        style={{
          backgroundColor: "#F5F5F0",
          borderRadius: "16px",
          width: "200px",
          height: "75vh",
        }}
      >
        <Stack
          spacing={5}
          justifyContent="space-evenly"
          alignItems="center"
          style={{
            padding: "10px",
          }}
        >
          {HighlightOptions?.map((highlighter) => (
            <Button
              key={highlighter.id}
              onClick={() => handleClick(highlighter)}
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: highlighter.color,
                padding: "5px",
                minHeight: "8vh",
                color: isLight(highlighter.color) === true ? "black" : "white",
                outline: highlighter === active ? "solid" : null,
                outlineWidth: "1px",
                outlineColor: "black",
                outlineOffset: "3px",
                borderStyle: highlighter === active ? "solid" : null,
                borderWidth: "1px",
                borderColor: "black",
                "&:hover": {
                  backgroundColor: highlighter.color,
                },
              }}
            >
              {highlighter.label}
            </Button>
          ))}
          <Button
            onClick={handleDelete}
            variant="contained"
            fullWidth
            sx={{
              padding: "5px",
              minHeight: "8vh",
              color: "black",
              backgroundColor: "white",
              outlineWidth: "1px",
              outlineColor: "black",
              outlineOffset: "3px",
              borderWidth: "1px",
              borderColor: "black",
              "&:hover": {
                backgroundColor: "white",
              },
            }}
          >
            <Delete sx={{ marginRight: 2 }} />
            Delete All
          </Button>
        </Stack>
      </Box>
    </ClickAwayListener>
  );
};

export default Highlighters;
