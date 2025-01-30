/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Container, Typography } from "@mui/material";
import "./App.css";
import HabitForm from "./components/HabitForm";
import HabitList from "./components/HabitList";
import useHabitStore from "./store/store";
import { useEffect } from "react";

function App() {
  const {fetchHabits}=useHabitStore();

  useEffect(()=>{
    fetchHabits();
  },[])
  return (
    <>
      <Container>
        <Box>
          <Typography variant="h2" component={"h1"} gutterBottom align="center">
            Habit Tracker
          </Typography>
          <HabitForm />
          <HabitList/>
        </Box>
      </Container>
    </>
  );
}

export default App;
