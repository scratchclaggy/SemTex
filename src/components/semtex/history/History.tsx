import { List, Box } from "@mui/material";
import { useRouter } from "next/router";
import useDataset from "src/hooks/dataset";
import HistoryCard from "../history/HistoryCard";

const History = () => {
  const router = useRouter();
  const { dataset } = useDataset(router.query.datasetID as string | undefined);
  const textSamples = dataset?.textSamples ?? [];

  return (
    <Box
    sx={{
      padding: "10px",
      margin: "8px",
      marginTop: "25px",
      width: "11vw",
      backgroundColor: "#F5F5F0",
      borderRadius: "16px"
    }}
    >
      <List
        sx={{
          width: "10vw",
          maxHeight: "80vh",
          overflow: "hidden",
          overflowY: "scroll",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar":{
            width: 0
          }
        }}
      >
        {textSamples.map((history) => (
          <HistoryCard body={history.body} id={history.id} key={history.id} />
        ))}
      </List>
    </Box>
  );
};

export default History;
