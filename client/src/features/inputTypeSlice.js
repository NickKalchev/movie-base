import { createSlice } from "@reduxjs/toolkit";

export const inputTypeSlice = createSlice({
  name: "inputType",
  initialState: {
    type: "Title",
  },
  reducers: {
    setType: (state, action) => {
      state.type = action.payload;
    },
  },
});

export const { setType } = inputTypeSlice.actions;

export const selectType = (state) => state.type.type;

export default inputTypeSlice.reducer;
