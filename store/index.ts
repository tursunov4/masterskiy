// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import consultReducer from "./slices/consult.slice";
import contactReducer from "./slices/contactSlice";

export const store = configureStore({
  reducer: {
    consult: consultReducer,
    contact: contactReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
