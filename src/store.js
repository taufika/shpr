import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './features/users';
import sidebarReducer from './features/sidebar';

export default configureStore({
  reducer: {
    users: usersReducer,
    sidebar: sidebarReducer,
  },
})
