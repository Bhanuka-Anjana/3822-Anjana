import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers } from "../../services/userService";

// Define the async thunk for fetching user data
export const fetchUsers = createAsyncThunk("user/fetctUsers", async () => {
  const response = await getUsers();
  return response.data;
});

// Define the user slice
export const userSlice = createSlice({
  name: "user",
  initialState: { data: [], loading: false, error: null },
  reducers: {
    // Add a reducer for updating a user
    userUpdated(state, action) {
      const updatedUser = action.payload;
      state.data = state.data.map((user) =>
        user._id === updatedUser._id ? updatedUser : user
      );
    },
    // Add a reducer for deleting a user
    userDeleted(state, action) {
      const _id = action.payload;
      state.data = state.data.filter((user) => user._id !== _id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { userUpdated, userDeleted } = userSlice.actions;
export default userSlice.reducer;
