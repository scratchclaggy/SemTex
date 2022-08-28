import { Box, Typography } from "@mui/material";

const History = () => {

  const textSamples = [
    {
      body: "Sed a bibendum ex, nec venenatis magna. Nunc sagittis tincidunt dui, at posuere nisi. Etiam hendrerit nec dolor eu blandit. Maecenas turpis.",
      id: "852ca1e5-a345-4a09-956b-a53c8a1d4ec5",
    },
    {
      body: "Maecenas nec mauris sit amet mauris efficitur viverra. Phasellus sodales est est, a venenatis dui dignissim id. Sed ut lacus vitae pharetra.",
      id: "4c640cc9-f466-4377-9bec-f8ad6f622751",
    },
    {
      body: "Vivamus a facilisis dolor. In vel sem quis lectus pulvinar dapibus nec ut tortor. Suspendisse potenti. Sed iaculis laoreet mauris at tellus.",
      id: "fbfcdcb4-8cd8-4b49-bdf2-f51ef614f9e6",
    },
    {
      body: "Sed a bibendum ex, nec venenatis magna. Nunc sagittis tincidunt dui, at posuere nisi. Etiam hendrerit nec dolor eu blandit. Maecenas turpis.",
      id: "852ca1e5-a345-4a09-956b-a53c8a1d4ec5",
    },
    {
      body: "Maecenas nec mauris sit amet mauris efficitur viverra. Phasellus sodales est est, a venenatis dui dignissim id. Sed ut lacus vitae pharetra.",
      id: "4c640cc9-f466-4377-9bec-f8ad6f622751",
    },
    {
      body: "Vivamus a facilisis dolor. In vel sem quis lectus pulvinar dapibus nec ut tortor. Suspendisse potenti. Sed iaculis laoreet mauris at tellus.",
      id: "fbfcdcb4-8cd8-4b49-bdf2-f51ef614f9e6",
    },
    {
      body: "Sed a bibendum ex, nec venenatis magna. Nunc sagittis tincidunt dui, at posuere nisi. Etiam hendrerit nec dolor eu blandit. Maecenas turpis.",
      id: "852ca1e5-a345-4a09-956b-a53c8a1d4ec5",
    },
    {
      body: "Maecenas nec mauris sit amet mauris efficitur viverra. Phasellus sodales est est, a venenatis dui dignissim id. Sed ut lacus vitae pharetra.",
      id: "4c640cc9-f466-4377-9bec-f8ad6f622751",
    },
    {
      body: "Vivamus a facilisis dolor. In vel sem quis lectus pulvinar dapibus nec ut tortor. Suspendisse potenti. Sed iaculis laoreet mauris at tellus.",
      id: "fbfcdcb4-8cd8-4b49-bdf2-f51ef614f9e6",
    },
    {
      body: "Sed a bibendum ex, nec venenatis magna. Nunc sagittis tincidunt dui, at posuere nisi. Etiam hendrerit nec dolor eu blandit. Maecenas turpis.",
      id: "852ca1e5-a345-4a09-956b-a53c8a1d4ec5",
    },
    {
      body: "Maecenas nec mauris sit amet mauris efficitur viverra. Phasellus sodales est est, a venenatis dui dignissim id. Sed ut lacus vitae pharetra.",
      id: "4c640cc9-f466-4377-9bec-f8ad6f622751",
    },
    {
      body: "Vivamus a facilisis dolor. In vel sem quis lectus pulvinar dapibus nec ut tortor. Suspendisse potenti. Sed iaculis laoreet mauris at tellus.",
      id: "fbfcdcb4-8cd8-4b49-bdf2-f51ef614f9e6",
    },
    {
      body: "Sed a bibendum ex, nec venenatis magna. Nunc sagittis tincidunt dui, at posuere nisi. Etiam hendrerit nec dolor eu blandit. Maecenas turpis.",
      id: "852ca1e5-a345-4a09-956b-a53c8a1d4ec5",
    },
    {
      body: "Maecenas nec mauris sit amet mauris efficitur viverra. Phasellus sodales est est, a venenatis dui dignissim id. Sed ut lacus vitae pharetra.",
      id: "4c640cc9-f466-4377-9bec-f8ad6f622751",
    },
    {
      body: "Vivamus a facilisis dolor. In vel sem quis lectus pulvinar dapibus nec ut tortor. Suspendisse potenti. Sed iaculis laoreet mauris at tellus.",
      id: "fbfcdcb4-8cd8-4b49-bdf2-f51ef614f9e6",
    },
    {
      body: "Sed a bibendum ex, nec venenatis magna. Nunc sagittis tincidunt dui, at posuere nisi. Etiam hendrerit nec dolor eu blandit. Maecenas turpis.",
      id: "852ca1e5-a345-4a09-956b-a53c8a1d4ec5",
    },
    {
      body: "Maecenas nec mauris sit amet mauris efficitur viverra. Phasellus sodales est est, a venenatis dui dignissim id. Sed ut lacus vitae pharetra.",
      id: "4c640cc9-f466-4377-9bec-f8ad6f622751",
    },
    {
      body: "Vivamus a facilisis dolor. In vel sem quis lectus pulvinar dapibus nec ut tortor. Suspendisse potenti. Sed iaculis laoreet mauris at tellus.",
      id: "fbfcdcb4-8cd8-4b49-bdf2-f51ef614f9e6",
    },
    {
      body: "Sed a bibendum ex, nec venenatis magna. Nunc sagittis tincidunt dui, at posuere nisi. Etiam hendrerit nec dolor eu blandit. Maecenas turpis.",
      id: "852ca1e5-a345-4a09-956b-a53c8a1d4ec5",
    },
    {
      body: "Maecenas nec mauris sit amet mauris efficitur viverra. Phasellus sodales est est, a venenatis dui dignissim id. Sed ut lacus vitae pharetra.",
      id: "4c640cc9-f466-4377-9bec-f8ad6f622751",
    },
    {
      body: "Vivamus a facilisis dolor. In vel sem quis lectus pulvinar dapibus nec ut tortor. Suspendisse potenti. Sed iaculis laoreet mauris at tellus.",
      id: "fbfcdcb4-8cd8-4b49-bdf2-f51ef614f9e6",
    },
    {
      body: "Sed a bibendum ex, nec venenatis magna. Nunc sagittis tincidunt dui, at posuere nisi. Etiam hendrerit nec dolor eu blandit. Maecenas turpis.",
      id: "852ca1e5-a345-4a09-956b-a53c8a1d4ec5",
    },
    {
      body: "Maecenas nec mauris sit amet mauris efficitur viverra. Phasellus sodales est est, a venenatis dui dignissim id. Sed ut lacus vitae pharetra.",
      id: "4c640cc9-f466-4377-9bec-f8ad6f622751",
    },
    {
      body: "Vivamus a facilisis dolor. In vel sem quis lectus pulvinar dapibus nec ut tortor. Suspendisse potenti. Sed iaculis laoreet mauris at tellus.",
      id: "fbfcdcb4-8cd8-4b49-bdf2-f51ef614f9e6",
    },
  ]
  
  function handleClick()
  {
    console.log("Button pressed!")
  }

  return (
  <Box
  
  sx={{
    margin: "10px",
    width: "250px",
    maxHeight: "80vh",
    border: 1,
    overflow: 'hidden',
    overflowY: 'scroll'
  }}
  >
    <div>
    {
      textSamples.map((val, i)=>
      (
        <Typography
        onClick={handleClick}
        noWrap
        key={i}
        sx={{
          padding: "5px",
          borderBottom: 1,
          '&:hover':{
          fontWeight: 'bold',
          border: 1
          }
        }}
        >
        {val.body}
        </Typography>
      ))
    }
  </div>
  </Box>

  )
};

export default History;
