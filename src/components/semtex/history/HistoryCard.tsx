import { Done, DoneAll } from "@mui/icons-material";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { useAtomValue, useSetAtom } from "jotai";
import { useRouter } from "next/router";
import useAuth from "src/contexts/AuthContext";
import useDataset from "src/hooks/dataset";
import useUserResponseList from "src/hooks/user_response_list";
import type { TextSample } from "src/types/client";
import { navButtonIndexAtom, textSampleIdAtom } from "../Semtex";

const HistoryCard = (textSample: TextSample) => {
  const router = useRouter();
  const datasetID = router.query.datasetID as string | undefined;
  const { dataset } = useDataset(datasetID);
  const { user } = useAuth();
  const { userResponseList } = useUserResponseList(user, datasetID);
  const setNavButtonIndex = useSetAtom(navButtonIndexAtom);
  const textSampleID = useAtomValue(textSampleIdAtom);

  const userResponse = userResponseList?.find(
    (userResponse) => userResponse.textSampleID === textSample.id
  );

  const responseIcon = userResponse?.hasResponse ? (
    userResponse?.hasHighlight ? (
      // Returns <DoneAll /> when there's a response && highlights
      <DoneAll />
    ) : (
      // Returns <Done /> when there's a response
      <Done />
    )
  ) : // Else returns null
  null;

  const isSelected = textSample.id === textSampleID;

  const handleClick = () => {
    const selectedTextSampleID = dataset?.textSamples.findIndex(
      (sample) => sample.id === textSample.id
    );

    if (selectedTextSampleID !== undefined) {
      setNavButtonIndex(selectedTextSampleID);
    }
  };

  return (
    <ListItem divider sx={{ backgroundColor: "#F5F5F0" }} disablePadding>
      <ListItemButton selected={isSelected} onClick={handleClick}>
        <Typography noWrap>{textSample.body}</Typography>
        <ListItemIcon>{responseIcon}</ListItemIcon>
      </ListItemButton>
    </ListItem>
  );
};

export default HistoryCard;
