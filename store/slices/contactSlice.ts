// src/lib/slices/contactSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ?? "https://admin.marble-moscow.ru";

export type ContactInfo = {
  id: number;
  author_name: string;
  inn: string;
  phone: string;
  email: string;
  address: string;
  whatsapp: string;
  telegram: string;
  time_working: string;
  created_at: string;
  updated_at: string;
};

type ContactState = {
  data: ContactInfo | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: ContactState = {
  data: null,
  status: "idle",
  error: null,
};

export const fetchContactInfo = createAsyncThunk<ContactInfo>(
  "contact/fetchContactInfo",
  async () => {
    const res = await fetch(`${API_BASE}/api/master/contact-info/`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Не удалось загрузить контактные данные");
    return (await res.json()) as ContactInfo;
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactInfo.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchContactInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchContactInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Ошибка";
      });
  },
});

export default contactSlice.reducer;
