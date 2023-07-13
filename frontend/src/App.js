import React from "react";
import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Chart from "./Chart";
import Stats from "./Stats";

const App = () => {
  return (
    <Container>
      <AppBar position="static" color="primary">
        <Toolbar style={{ justifyContent: "center" }}>
          <Typography variant="h4">PSU Models Statistics</Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ pt: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Chart />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Stats />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default App;
