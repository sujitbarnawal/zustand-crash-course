import useHabitStore from "../store/store";
import { Box, Button, Grid2, LinearProgress, Paper, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";


const HabitList = () => {
  const { habits = [], removeHabit, toggleHabit } = useHabitStore(); // Ensure habits is always an array
  const today = new Date().toISOString().split("T")[0];

  const getStreak = (habit) => {
    if (!habit || !habit.completedDates) return 0;
  
    const today = new Date().toISOString().split("T")[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];
  
    let streak = habit.streak || 0;
  
    if (habit.completedDates.includes(today)) {
      // Check if yesterday was also completed
      if (habit.completedDates.includes(yesterdayStr)) {
        streak++;
      } else {
        streak = 1; // Reset streak if yesterday was missed
      }
    }
  
    return streak;
  };
  

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
      {habits.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No habits added yet.
        </Typography>
      ) : (
        habits.map((habit) =>
          habit ? ( // Ensuring habit is not null
            <Paper elevation={2} sx={{ p: 2 }} key={habit.id}>
              <Grid2
                container
                alignItems={"center"}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Grid2 xs={12} sm={6}>
                  <Typography variant="h6">{habit.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {habit.frequency}
                  </Typography>
                </Grid2>
                <Grid2 xs={12} sm={6}>
                  <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                    <Button
                      onClick={() => toggleHabit(habit.id, today)}
                      variant="outlined"
                      color={
                        habit.completedDates.includes(today)
                          ? "success"
                          : "primary"
                      }
                      startIcon={<CheckCircleIcon />}
                    >
                      {habit.completedDates.includes(today)
                        ? "Completed"
                        : "Mark Complete"}
                    </Button>
                    <Button
                      onClick={() => removeHabit(habit.id)}
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                    >
                      Remove
                    </Button>
                  </Box>
                </Grid2>
              </Grid2>
              <Box sx={{mt:2}}>
                 <Typography>Current Streak :{ getStreak(habit)}</Typography>
                 <LinearProgress variant="determinate" value={(getStreak(habit)/30)*100} />
              </Box>
            </Paper>
          ) : null
        )
      )}
    </Box>
  );
};


export default HabitList;
