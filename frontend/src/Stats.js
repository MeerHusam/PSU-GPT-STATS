import React, { useEffect, useState } from "react";

const Stats = () => {
  const [average, setAverage] = useState(0);
  const [numResponses, setNumResponses] = useState(0);
  const [numEvaluations, setNumEvaluations] = useState(0);

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
  return (
    <h3>
      The total number of responses are {numResponses} of which there are{" "}
      {numEvaluations} evaluation. The average score of the model as evaluated
      by the users is {average}.
    </h3>
  );
};

export default Stats;
