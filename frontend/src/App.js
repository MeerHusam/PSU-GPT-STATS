import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";
// {"0": 10, "1": 20, "2": 30, "3": 40, "4": 50, "5": 60}
const App = () => {
  const [data, setData] = useState([0, 0, 0, 0, 0]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/ratingsCount");
        const jsonData = await response.json();
        console.log("json", jsonData);
        const dataArray = Object.values(jsonData); // Convert jsonData to an array

        console.log("arr", dataArray);
        setData(dataArray);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
                  data: ["0", "1", "2", "3", "4"],
                  scaleType: "band",
                },
              ]}
              series={[
                {
                  data: data,
                },
              ]}
              width={500}
              height={300}
            />
            <Typography
              variant="subtitle1"
              align="center"
              style={{
                marginTop: "-25px",
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
