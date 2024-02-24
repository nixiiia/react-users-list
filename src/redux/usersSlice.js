import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('https://reqres.in/api/users');

    if (!response.ok) {
      throw new Error('Server error!');
    }

    const { data } = await response.json();

    return data;
  } catch (error) {
    return rejectWithValue(error.massage);
  }
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    invitedUsers: [],
    filteredUsers: [],
    search: '',
    status: null,
    error: null,
  },

  reducers: {
    searchByName: (state, action) => {
      const filteredUsers = state.users.filter((user) =>
        (user.first_name + user.last_name + user.email)
          .toLowerCase()
          .includes(action.payload.toLowerCase()),
      );
      return {
        ...state,
        filteredUsers: action.payload.length > 0 ? filteredUsers : [...state.users],
      };
    },

    inviteUser: (state, action) => {
      state.invitedUsers.push(action.payload);
    },

    removeUser: (state, action) => {
      state.invitedUsers = state.invitedUsers.filter((user) => user !== action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      });
  },
});

export const { inviteUser, removeUser, searchByName } = usersSlice.actions;

export default usersSlice.reducer;
