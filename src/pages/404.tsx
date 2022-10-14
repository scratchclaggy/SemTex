//404 page not found
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { Stack } from "@mui/material";
import Link from "next/link";
import React from "react";

const FourOhFour = () => {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={0.5}
      style={{ minHeight: "80vh" }}
    >
      <SentimentVeryDissatisfiedIcon fontSize="large" color="disabled" />

      <h1>404 | Page Not Found </h1>

      <Link href="/">
        <a>Go back home</a>
      </Link>
    </Stack>
  );
};
export default FourOhFour;
