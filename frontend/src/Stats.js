import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  CircularProgress,
  Typography,
  Stack,
} from "@mui/material";

import Paper from "@mui/material/Paper";

import { styled } from "@mui/material/styles";

const Stats = () => {
  const [average, setAverage] = useState(0);
  const [numResponses, setNumResponses] = useState(0);
  const [numEvaluations, setNumEvaluations] = useState(0);
  const [ratio, setRatio] = useState(0);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/averageScore");
        const jsonData = await response.json();
        console.log("average", jsonData);
        setAverage(jsonData);
      } catch (error) {
        console.log("Error fetching data :", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/numResponses");
        const jsonData = await response.json();
        setNumResponses(jsonData.numResponses);
      } catch (error) {
        console.log("Error fetching data :", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/numEvaluations");
        const jsonData = await response.json();
        setNumEvaluations(jsonData.numEvaluations);
      } catch (error) {
        console.log("Error fetching data :", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (numResponses > 0) {
      setRatio((numEvaluations / numResponses) * 100);
    }
  }, [numEvaluations, numResponses]);

  return (
    <Container>
      <Stack spacing={2}>
        <Item>Number of Responses: {numResponses}</Item>
        <Item>Number of Evaluations: {numEvaluations}</Item>
        <Item>The Average of Evaluations: {average}</Item>
      </Stack>

      <Stack spacing={2} direction="row">
        <Box position="relative" display="inline-flex">
          <CircularProgress
            variant="determinate"
            sx={{ pt: 4 }}
            value={ratio}
            size={105}
          />
          <Box
            top={0}
            left={20}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography
              variant="caption"
              sx={{ px: 5 }}
              component="div"
              color="text.secondary"
              style={{ fontSize: "0.8rem" }}
            >
              {`${Math.round(ratio)}% Evaluated`}
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default Stats;
