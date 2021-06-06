import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import typeReducer from '../features/inputTypeSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    type: typeReducer,
  },
});
