import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import useUserResponseList from "src/hooks/user_response_list";

const ProgressBar = () => {
  const router = useRouter();
  const { userResponseList } = useUserResponseList(
    router.query.datasetID as string | undefined
  );

  const completed =
    userResponseList?.filter((response) => response.responseOptionID !== null)
      .length ?? 0;
  const count = userResponseList?.length ?? 0;
  const percentage = count ? (completed / count) * 100 : 0;

  return (
    <Box sx={{ display: "flex", alignItems: "center", padding: 1 }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          variant="determinate"
          value={percentage}
          sx={{ height: 12, borderRadius: 12 }}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body1" color="text.secondary">{`${Math.round(
          percentage
        )}%`}</Typography>
      </Box>
    </Box>
  );
};

export default ProgressBar;
