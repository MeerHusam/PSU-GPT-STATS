import React from "react";
import { Container, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";

const res = [1, 3, 5, 1, 4, 0];

const App = () => {
  return (
    <Container>
      <div style={{ display: "flex", justifyContent: "left" }}>
        <div style={{ position: "relative" }}>
          <Typography
            variant="subtitle1"
            style={{
              position: "absolute",
              left: "50px",
              top: "50%",
              transform: "rotate(-90deg)",
              transformOrigin: "center",
              textAlign: "center",
            }}
          >
            Number of Responses
          </Typography>
          <div style={{ marginLeft: "120px" }}>
            <BarChart
              xAxis={[
                {
                  id: "barCategories",
                  data: ["0", "1", "2", "3", "4", "5"],
                  scaleType: "band",
                },
              ]}
              series={[
                {
                  data: res,
                },
              ]}
              width={500}
              height={300}
            />
            <Typography
              variant="subtitle1"
              align="center"
              style={{
                marginTop: "-25px", // Adjust the value to move the label up or down
              }}
            >
              Rating scale 0-5
            </Typography>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default App;
