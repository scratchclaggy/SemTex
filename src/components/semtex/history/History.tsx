import { List } from "@mui/material";
import { useRouter } from "next/router";
import useDataset from "src/hooks/dataset";
import HistoryCard from "../history/HistoryCard";

const History = () => {
  const router = useRouter();
  const { dataset } = useDataset(router.query.datasetID as string | undefined);
  const textSamples = dataset?.textSamples ?? [];

  return (
    <List
      sx={{
        margin: "10px",
        width: "250px",
        maxHeight: "80vh",
        overflow: "hidden",
        overflowY: "scroll",
      }}
    >
      {textSamples.map((history) => (
        <HistoryCard body={history.body} id={history.id} key={history.id} />
      ))}
    </List>
  );
};

export default History;
