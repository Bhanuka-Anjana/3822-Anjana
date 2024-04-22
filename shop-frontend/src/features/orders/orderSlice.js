import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getOrders } from "../../services/orderService";

// Define the async thunk for fetching user data
export const fetchOrders = createAsyncThunk("order/fetctOrders", async () => {
  const response = await getOrders();
  return response.data;
});

// Define the order slice
export const orderSlice = createSlice({
  name: "order",
  initialState: { data: [], loading: false, error: null },
  reducers: {
    updateOrderStatus: (state, action) => {
      const { _id, status } = action.payload;
      const order = state.data.find((order) => order._id === _id);
      order.status = status;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export the action creators
export const { updateOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;
