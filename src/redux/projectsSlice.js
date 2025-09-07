import { createSlice } from "@reduxjs/toolkit";

const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    reloadFlag: 0, // this will tell LatestProjects to refetch
  },
  reducers: {
    triggerReload: (state) => {
      state.reloadFlag += 1; // increment so useEffect in LatestProjects runs
    },
  },
});

export const { triggerReload } = projectsSlice.actions;
export default projectsSlice.reducer;
