import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Orders } from "../../firebase/orders";
import { toast } from "react-toastify";

const order = new Orders();

export const displayOrders = createAsyncThunk(
  "order/displayOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await order.displayAll();
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const res = await order.create(orderData);
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const editOrderStatus = createAsyncThunk(
  "order/editOrderStatus",
  async (newData, { rejectWithValue }) => {
    try {
      const res = await order.editStatus(newData);
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteOrderByID = createAsyncThunk(
  "order/deleteOrderByID",
  async (id, { rejectWithValue }) => {
    try {
      const res = await order.delete(id);
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// [DA Only]
export const editOrder = createAsyncThunk(
  "order/editOrder",
  async (newData, { rejectWithValue }) => {
    try {
      const res = await order.edit(newData);
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  data: [],
  daData: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addRealTimeData: (state, action) => {
      state.data = action.payload;
    },
    addRealTimeDaData: (state, action) => {
      if (state.daData.length < action.payload.length) {
        toast.success("Check Available Orders", { theme: "dark" });
      }
      state.daData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // displayOrders
      .addCase(displayOrders.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(displayOrders.rejected, (state, action) => {
        state.error = action.payload;
      })
      // createOrder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(action.payload, { theme: "dark" });
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload, { theme: "dark" });
      })
      // editOrderByID
      .addCase(editOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editOrder.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(action.payload, { theme: "dark" });
      })
      .addCase(editOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload, { theme: "dark" });
      })
      // editOrderStatusByID [DA Only]
      .addCase(editOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(action.payload, { theme: "dark" });
      })
      .addCase(editOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload, { theme: "dark" });
      })
      // deleteOrderByID
      .addCase(deleteOrderByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrderByID.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(action.payload, { theme: "dark" });
      })
      .addCase(deleteOrderByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload, { theme: "dark" });
      });
  },
});

export const { addRealTimeData, addRealTimeDaData } = orderSlice.actions;
export default orderSlice.reducer;
