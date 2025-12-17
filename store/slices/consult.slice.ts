// store/slices/consult.slice.ts
import { apiFetch } from "@/lib/api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ConsultPayload = {
  name: string;
  phone: string;
  message: string;
};

type ConsultState = {
  open: boolean;
  form: ConsultPayload;
  status: "idle" | "loading" | "success" | "error";
  error: string | null;

  // ✅ yangi: success toast
  toast: { type: "success" | "error"; text: string } | null;
};

const initialState: ConsultState = {
  open: false,
  form: { name: "", phone: "", message: "" },
  status: "idle",
  error: null,
  toast: null,
};

export const submitConsult = createAsyncThunk<
  void,
  ConsultPayload,
  { rejectValue: string }
>("consult/submit", async (payload, { rejectWithValue }) => {
  try {
    await apiFetch("/api/master/consultatsiya/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (e: any) {
    return rejectWithValue(e?.message ?? "Ошибка отправки");
  }
});

const consultSlice = createSlice({
  name: "consult",
  initialState,
  reducers: {
    openConsult(state) {
      state.open = true;
      state.status = "idle";
      state.error = null;
    },
    closeConsult(state) {
      state.open = false;
      state.status = "idle";
      state.error = null;
    },
    setField(
      state,
      action: PayloadAction<{ key: keyof ConsultPayload; value: string }>
    ) {
      state.form[action.payload.key] = action.payload.value;
    },
    resetForm(state) {
      state.form = { name: "", phone: "", message: "" };
      state.status = "idle";
      state.error = null;
    },

    // ✅ toast boshqaruvi
    clearToast(state) {
      state.toast = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(submitConsult.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(submitConsult.fulfilled, (state) => {
        state.status = "success";
        // ✅ success message
        state.toast = {
          type: "success",
          text: "Заявка отправлена! Мы свяжемся с вами в ближайшее время.",
        };
      })
      .addCase(submitConsult.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload ?? "Ошибка";
        // ✅ error toast ham xohlasa bo‘ladi
        state.toast = {
          type: "error",
          text: state.error,
        };
      });
  },
});

export const { openConsult, closeConsult, setField, resetForm, clearToast } =
  consultSlice.actions;

export default consultSlice.reducer;
