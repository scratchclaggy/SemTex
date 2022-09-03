import { Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

const UserCodeBox = () => {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/semtex');
  }


  return (
    <Stack alignItems="center" spacing={1} mt={"40vh"}>
      <Typography>Welcome To SemTex</Typography>
      <form
      onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Enter Code"
          style={{
            width: "450px",
            height: "85px",
            textAlign: "left",
            fontSize: "70px",
            margin: "5px",
          }}
        ></input>
      </form>
      <a href="">Don't Have a Code?</a>
      <a href="">Administrator Login</a>
    </Stack>
  );
};

export default UserCodeBox;
