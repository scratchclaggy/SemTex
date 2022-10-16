import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import useUserResponses from "src/hooks/user_responses";

const ProgressBar = () => {
  const router = useRouter();
  const { userResponses } = useUserResponses(
    router.query.datasetID as string | undefined
  );

  const completed =
    userResponses?.filter((response) => response.response !== null).length ?? 0;
  const count = userResponses?.length ?? 0;
  const percentage = count ? (completed / count) * 100 : 0;

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" value={percentage} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          percentage
        )}%`}</Typography>
      </Box>
    </Box>
  );
};

export default ProgressBar;
