import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import myAxios from "./myAxios";

// Company Dashboard
export const myDashboard = createAsyncThunk(
  "company/myDashboard",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await myAxios.get("/company/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (e) {
      if (e.message === "Network Error") {
        return rejectWithValue("Check The Server");
      }
    }
  }
);

// Company Services
export const myServices = createAsyncThunk(
  "company/myServices",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await myAxios.get("/company/myServices", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (e) {
      if (e.message === "Network Error") {
        return rejectWithValue("Check The Server");
      }
    }
  }
);

// Show Service Info for Company
export const showService = createAsyncThunk(
  "company/showService",
  async (serviceId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await myAxios.get(`/company/service/${serviceId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (e) {
      if (e.message === "Network Error") {
        return rejectWithValue("Check The Server");
      }
    }
  }
);

// Create Company Service
export const createService = createAsyncThunk(
  "company/createService",
  async (body, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await myAxios.post("/company/service", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (e) {
      if (e.message === "Network Error") {
        return rejectWithValue("Check The Server");
      }
    }
  }
);

// Update Company Service
export const updateService = createAsyncThunk(
  "company/updateService",
  async ({ serviceId, body }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await myAxios.put(`/company/service/${serviceId}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (e) {
      if (e.message === "Network Error") {
        return rejectWithValue("Check The Server");
      }
    }
  }
);

// Delete Company Service
export const deleteService = createAsyncThunk(
  "company/deleteService",
  async (serviceId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await myAxios.delete(`/company/service/${serviceId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (e) {
      if (e.message === "Network Error") {
        return rejectWithValue("Check The Server");
      }
    }
  }
);

const companySlice = createSlice({
  name: "company",
  initialState: {
    data: [],
    error: null,
  },
  extraReducers: (builder) => {
    // Get Company Dashboard
    builder.addCase(myDashboard.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(myDashboard.rejected, (state, action) => {
      state.error = action.payload;
    });
    // Get Company Services
    builder.addCase(myServices.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(myServices.rejected, (state, action) => {
      state.error = action.payload;
    });
    // Show Company Service
    builder.addCase(showService.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(showService.rejected, (state, action) => {
      state.error = action.payload;
    });
    // Create Company Service
    builder.addCase(createService.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(createService.rejected, (state, action) => {
      state.error = action.payload;
    });
    // Edit Company Service
    builder.addCase(updateService.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(updateService.rejected, (state, action) => {
      state.error = action.payload;
    });
    // Delete Company Service
    builder.addCase(deleteService.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(deleteService.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export default companySlice.reducer;
