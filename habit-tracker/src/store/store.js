/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

// const habitStore = (set) => ({
//   habits: [],
//   addHabit: (habit) => {
//     set((state) => ({
//       habits: [habit, ...state.habits],
//     }));
//   },
//   removeHabit: (habitId) => {
//     set((state) => ({
//       habits: state.habits.filter((habit) => habit.id !== habitId),
//     }));
//   },
//   toggleHabit: (habitId, date) => {
//     set((state) => ({
//       habits: state.habits.map((habit) => {
//         habit.id === habitId
//           ? {
//               ...habit,
//               completedDates: habit.completedDates.includes(date)
//                 ? habit.completedDates.filter((d) => d !== date)
//                 : [...habit.completedDates, date],
//             }
//           : habit;
//       }),
//     }));
//   },
// });

const habitStore = (set,get) => ({
  habits: [],
  isLoading:false,
  error:null,
  addHabit: (habit) => {
    set((state) => ({
      habits: [habit, ...state.habits],
    }));
  },
  removeHabit: (id) =>
    set((state) => ({
      habits: state.habits.filter((habit) => habit && habit.id !== id),
    })),
  toggleHabit: (id, date) =>
    set((state) => ({
      habits: state.habits
        .filter((habit) => habit !== null) // Ensuring no null values
        .map((habit) =>
          habit.id === id
            ? {
                ...habit,
                completedDates: habit.completedDates.includes(date)
                  ? habit.completedDates.filter((d) => d !== date)
                  : [...habit.completedDates, date],
              }
            : habit
        ),
    })),
    fetchHabits:async()=>{
      set({isLoading:true})
      try {
        const currentHabits=get().habits
        if(currentHabits.length>0){
          set({isLoading:false})
          return
        }
        await new Promise((resolve)=>setTimeout(resolve,1000))
        set({
          habits: [
            {
              id: 1,
              name: "Futsal",
              completedDates: [],
              frequency:'weekly',
              createdAt:new Date().toISOString()
            },
            {
              id: 2,
              name: "Running",
              completedDates: [],
              frequency:'daily',
              createdAt:new Date().toISOString()
            }
          ],
          isLoading:false
        })
      } catch (error) {
        set({
          error:"Failed to fetch Habits",isLoading:false
        })
      }
    }
});

const useHabitStore = create(
  devtools(
    persist(habitStore, {
      name: "habits",
    })
  )
);

export default useHabitStore;
