import { Box, TextField,FormControl,Select,MenuItem, InputLabel, Button } from "@mui/material";
import { useState } from "react";
import useHabitStore from "../store/store";

const HabitForm = () => {
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const addHabit=useHabitStore((state)=>state.addHabit);

  const handleFormSubmit=(e)=>{
    e.preventDefault();
    if(!name||!frequency){
        alert("Please fill in all fields");
    }
    addHabit({
        name:name,
        frequency:frequency,
        id:Math.ceil(Math.random()*1000000),
        createdAt:new Date().toISOString(),
        completedDates:[]
    })
    setName("");
    setFrequency("daily");
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <Box sx={{display:"flex",flexDirection:"column",gap:2}}>
        <TextField
          label="Habit Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Habit Name"
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Frequency</InputLabel>
          <Select
            value={frequency}
            label="Frequency"
            onChange={(e)=>setFrequency(e.target.value)}
          >
            <MenuItem value={"daily"}>Daily</MenuItem>
            <MenuItem value={"weekly"}>Weekly</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">Add Habit</Button>
      </Box>
    </form>
  );
};

export default HabitForm;
