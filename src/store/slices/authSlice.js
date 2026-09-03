import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/authService";

const TOKEN_KEY = "sevasetu_token";

/**
 * The backend returns { success: false, message: "Validation failed",
 * details: [{ field, message }, ...] } for express-validator failures.
 * Previously only `message` was surfaced, so the user just saw the generic
 * "Validation failed" with no idea which field or why. This builds a
 * readable combined message from both.
 */
function extractErrorMessage(err, fallback) {
  const data = err.response?.data;
  if (!data) return fallback;
  if (Array.isArray(data.details) && data.details.length > 0) {
    const fieldMessages = data.details.map((d) => d.message).join(" · ");
    return fieldMessages;
  }
  return data.message || fallback;
}

export const registerCustomer = createAsyncThunk(
  "auth/registerCustomer",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await authService.registerCustomer(payload);
      return res.data; // { token, user }
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err, "Registration failed"));
    }
  }
);

export const registerWorker = createAsyncThunk(
  "auth/registerWorker",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await authService.registerWorker(payload);
      return res.data; // { token, user, worker }
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err, "Registration failed"));
    }
  }
);

export const login = createAsyncThunk("auth/login", async (payload, { rejectWithValue }) => {
  try {
    const res = await authService.login(payload);
    return res.data; // { token, user }
  } catch (err) {
    return rejectWithValue(extractErrorMessage(err, "Login failed"));
  }
});

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await authService.me();
      return res.data.user;
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err, "Session invalid"));
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    await authService.logout();
  } catch {
    // even if the server call fails, we still clear the local session
  }
  return true;
});

const initialState = {
  currentUser: null,
  token: localStorage.getItem(TOKEN_KEY) || null,
  role: null,
  isAuthenticated: false,
  loading: false,
  // "booting" covers the very first app load, where we try to restore a
  // session from a stored token before deciding what to render.
  booting: !!localStorage.getItem(TOKEN_KEY),
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const pending = (state) => {
      state.loading = true;
      state.error = null;
    };
    const rejected = (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    };
    const applySession = (state, { token, user }) => {
      state.loading = false;
      state.currentUser = user;
      state.role = user.role;
      state.isAuthenticated = true;
      state.token = token;
      localStorage.setItem(TOKEN_KEY, token);
    };

    builder
      .addCase(registerCustomer.pending, pending)
      .addCase(registerCustomer.fulfilled, (state, action) => applySession(state, action.payload))
      .addCase(registerCustomer.rejected, rejected)

      .addCase(registerWorker.pending, pending)
      .addCase(registerWorker.fulfilled, (state, action) => applySession(state, action.payload))
      .addCase(registerWorker.rejected, rejected)

      .addCase(login.pending, pending)
      .addCase(login.fulfilled, (state, action) => applySession(state, action.payload))
      .addCase(login.rejected, rejected)

      .addCase(fetchCurrentUser.pending, (state) => {
        state.booting = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.booting = false;
        state.currentUser = action.payload;
        state.role = action.payload.role;
        state.isAuthenticated = true;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.booting = false;
        state.isAuthenticated = false;
        state.currentUser = null;
        state.token = null;
        localStorage.removeItem(TOKEN_KEY);
      })

      .addCase(logout.fulfilled, (state) => {
        state.currentUser = null;
        state.role = null;
        state.isAuthenticated = false;
        state.token = null;
        localStorage.removeItem(TOKEN_KEY);
      });
  },
});

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;
