import { createSlice } from '@reduxjs/toolkit'

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    status: 'ready',
  },
  reducers: {
    setLoading: (state) => {
      state.status = 'loading';
    },
    setReady: (state) => {
      state.status = 'ready';
    },
    setError: (state) => {
      state.status = 'error';
    },
    assignUsers: (state, action) => {
      state.users = action.payload;
    },
  }
});

export const { assignUsers, setError, setReady, setLoading } = usersSlice.actions;

export default usersSlice.reducer;