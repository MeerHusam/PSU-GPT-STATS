import React from "react";
import { AppBar, Toolbar, Container, Typography } from "@mui/material";
import Chart from "./Chart";

const App = () => {
  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Dashboard</Typography>
        </Toolbar>
      </AppBar>
      <Chart />
    </Container>
  );
};

export default App;
