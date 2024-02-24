import { configureStore } from '@reduxjs/toolkit';
import userReduser from './usersSlice';

export const store = configureStore({
  reducer: {
    users: userReduser,
  },
});

export default store;
