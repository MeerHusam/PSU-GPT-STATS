import React, { useEffect, useState, useRef } from "react";
import { Typography, Box } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { Container } from "@mui/material";

const Chart = () => {
  const [data, setData] = useState([0, 0, 0, 0, 0]);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const chartContainerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/ratingsCount");
        const jsonData = await response.json();
        const dataArray = Object.values(jsonData);
        setData(dataArray);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const updateSize = () => {
      if (chartContainerRef.current) {
        setWidth(Math.max(chartContainerRef.current.offsetWidth, 300)); // minimum width: 300
        setHeight(Math.max(chartContainerRef.current.offsetHeight, 300)); // minimum height: 300
      }
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        style={{
          width: "50%",
          minHeight: "300px",
          display: "flex",
          flexDirection: "column",
          alignSelf: "flex-start", // Align the component to the left
        }}
        ref={chartContainerRef}
      >
        <div style={{ flexGrow: 1 }}>
          <BarChart
            xAxis={[
              {
                id: "barCategories",
                data: ["1", "2", "3", "4", "5", "No Response"],
                scaleType: "band",
              },
            ]}
            series={[
              {
                data: data,
                color: "#013e87",
              },
            ]}
            width={width}
            height={height}
          />
        </div>
        <Typography
          variant="subtitle1"
          align="center"
          style={{
            marginTop: "-25px",
          }}
        >
          Rating scale 1-5
        </Typography>
      </Box>
    </Container>
  );
};

export default Chart;
