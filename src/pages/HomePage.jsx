import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const HomePage = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Typography sx={{ mt: 4 }} variant="h2" component="h1">
        It`s home page
      </Typography>
    </Box>
  );
};

export default HomePage;
