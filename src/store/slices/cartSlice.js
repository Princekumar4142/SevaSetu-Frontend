import { createSlice } from "@reduxjs/toolkit";

/**
 * Local cart state for the new booking UI. This intentionally does NOT call
 * any backend — there is no cart/booking API yet (Phase 1 backend is auth
 * only, and it was not touched for this task). When a real booking API
 * exists, this slice's shape can stay the same and just gain thunks that
 * sync to the server.
 */
const initialState = {
  items: [], // { id, name, price, qty, durationMins, meta }
  address: null, // { label, line1, line2 }
  slot: null, // { date, time }
  preferredWorkerId: null, // customer-selected preferred worker
  category: null, // booking service category (e.g. "plumbing")
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const item = action.payload;
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        existing.qty += 1;
      } else {
        state.items.push({ ...item, qty: 1 });
      }
    },
    incrementItem(state, action) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.qty += 1;
    },
    decrementItem(state, action) {
      const item = state.items.find((i) => i.id === action.payload);
      if (!item) return;
      item.qty -= 1;
      if (item.qty <= 0) {
        state.items = state.items.filter((i) => i.id !== action.payload);
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    setAddress(state, action) {
      state.address = action.payload;
    },
    setSlot(state, action) {
      state.slot = action.payload;
    },
    setPreferredWorker(state, action) {
      // Toggle: if same worker clicked again, deselect
      state.preferredWorkerId =
        state.preferredWorkerId === action.payload ? null : action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
    clearCart(state) {
      state.items = [];
      state.address = null;
      state.slot = null;
      state.preferredWorkerId = null;
      state.category = null;
    },
  },
});

export const {
  addItem,
  incrementItem,
  decrementItem,
  removeItem,
  setAddress,
  setSlot,
  setPreferredWorker,
  setCategory,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) => state.cart.items.reduce((sum, i) => sum + i.qty, 0);
export const selectCartSubtotal = (state) => state.cart.items.reduce((sum, i) => sum + i.price * i.qty, 0);
export const selectCartAddress = (state) => state.cart.address;
export const selectCartSlot = (state) => state.cart.slot;
export const selectPreferredWorkerId = (state) => state.cart.preferredWorkerId;
export const selectCartCategory = (state) => state.cart.category;
