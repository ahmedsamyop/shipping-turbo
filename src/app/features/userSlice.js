import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Users } from "../../firebase/users";
import { toast } from "react-toastify";

const user = new Users();
// admin
export const getAdmin = createAsyncThunk("user/getAdmin", async (id, { rejectWithValue }) => {
  try {
    const res = await user.getDA(id);
    return res;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
// Delivery
export const displayDeliveries = createAsyncThunk(
  "user/displayDeliveries",
  async (_, { rejectWithValue }) => {
    try {
      const res = await user.displayDAs();
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const createDelivery = createAsyncThunk(
  "user/createDelivery",
  async (data, { rejectWithValue }) => {
    try {
      const { fname, lname, phone, email, password } = data;
      const res = await user.createDA(fname, lname, phone, email, password);
      return res;
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  }
);
export const editDelivery = createAsyncThunk(
  "user/editDelivery",
  async (newData, { rejectWithValue }) => {
    try {
      const res = await user.editDA(newData);
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteDelivery = createAsyncThunk(
  "user/deleteDelivery",
  async (id, { rejectWithValue }) => {
    try {
      const res = await user.deleteDA(id);
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getDelivery = createAsyncThunk(
  "user/getDelivery",
  async (id, { rejectWithValue }) => {
    try {
      const res = await user.getDA(id);
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// auth
export const userlogin = createAsyncThunk(
  "user/userlogin",
  async (userData, { rejectWithValue }) => {
    try {
      const { email, password } = userData;
      const res = await user.login(email, password);
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const userlogout = createAsyncThunk("user/userlogout", async (_, { rejectWithValue }) => {
  try {
    const res = await user.logout();
    return res;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const initialState = {
  // login userID
  userData: {
    id: "",
    email: "",
    fname: "",
    lname: "",
    phone: "",
    role: "",
  },
  deliveries: [],
  loading: false,
  error: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
    },
    addRealTimeData: (state, action) => {
      state.deliveries = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // getDelivery
      .addCase(getAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdmin.fulfilled, (state) => {
        state.loading = false;
        // state.userData = action.payload
        toast.success("succ", { theme: "dark" });
      })
      .addCase(getAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload, { theme: "dark" });
      })
      // displayDeliveries
      .addCase(displayDeliveries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(displayDeliveries.fulfilled, (state, action) => {
        state.loading = false;
        state.deliveries = action.payload;
        toast.success(action.payload, { theme: "dark" });
      })
      .addCase(displayDeliveries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(action.payload);
        toast.error(action.payload, { theme: "dark" });
      })
      // getDelivery
      .addCase(getDelivery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDelivery.fulfilled, (state) => {
        state.loading = false;
        // state.userData = action.payload
        toast.success("succ", { theme: "dark" });
      })
      .addCase(getDelivery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload, { theme: "dark" });
      })
      // CreateDelivery
      .addCase(createDelivery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDelivery.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(action.payload, { theme: "dark" });
      })
      .addCase(createDelivery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(action.payload);
        toast.error(action.payload, { theme: "dark" });
      })
      // editDelivery
      .addCase(editDelivery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editDelivery.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(action.payload, { theme: "dark" });
      })
      .addCase(editDelivery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(action.payload);
        toast.error(action.payload, { theme: "dark" });
      })
      // deleteDelivery
      .addCase(deleteDelivery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDelivery.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(action.payload, { theme: "dark" });
      })
      .addCase(deleteDelivery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload, { theme: "dark" });
      })
      // userlogin
      .addCase(userlogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userlogin.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
        toast.success(`Successfully logged in with ${action.payload.email}`, { theme: "dark" });
      })
      .addCase(userlogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        toast.error(action.payload, { theme: "dark" });
      })
      // userlogout
      .addCase(userlogout.fulfilled, (state, action) => {
        // Add user to the state
        state.userData = action.payload;
      })
      .addCase(userlogout.rejected, (state, action) => {
        // Add user to the state
        console.log(action.payload);
        state.error = action.payload;
        toast.error(action.payload, { theme: "dark" });
      });
  },
});

export const { setUser, addRealTimeData } = userSlice.actions;
export default userSlice.reducer;
