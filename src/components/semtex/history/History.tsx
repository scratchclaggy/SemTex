import { Box, List } from "@mui/material";
import { useRouter } from "next/router";
import useTextSamples from "src/hooks/text_samples";
import HistoryCard from "../history/HistoryCard";

const History = () => {
  const router = useRouter();
  const { textSamples } = useTextSamples(
    router.query.datasetID as string | undefined
  );

  return (
    <Box
      sx={{
        padding: "10px",
        margin: "8px",
        marginTop: "25px",
        width: "100%",
        backgroundColor: "#F5F5F0",
        borderRadius: "16px",
      }}
    >
      <List
        sx={{
          maxHeight: "80vh",
          overflow: "hidden",
          overflowY: "scroll",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            width: 0,
          },
        }}
      >
        {textSamples?.map((history) => (
          <HistoryCard body={history.body} id={history.id} key={history.id} />
        ))}
      </List>
    </Box>
  );
};

export default History;
