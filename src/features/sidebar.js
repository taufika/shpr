import { createSlice } from '@reduxjs/toolkit'

export const sidebarSlice = createSlice({
  name: 'users',
  initialState: {
    isSidebarActive: false,
  },
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarActive = !state.isSidebarActive;
    },
  }
});

export const { toggleSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;