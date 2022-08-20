import { Grid, Stack } from "@mui/material";
import { Box } from "@mui/system";

const UserCodeBox = () => {
  
  function submitForm(val: any)
  {
    if(val.key === "Enter"){
      val.preventDefault();
      console.log(val.target.value);
    }
    
  }

    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <form>
          <input 
          type="text"
          onKeyPress={submitForm}
          style={{
            width:"450px",
            height:"85px",
            textAlign: "left",
            fontSize: "70px",
            margin: "5px"
          }}
          >
          </input>
        </form>
        <button>Don't Have a Code?</button>
        <button>Administrator Login</button>


      </Grid>  
    );
};

export default UserCodeBox;