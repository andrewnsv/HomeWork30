import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchHeroes = createAsyncThunk(
  "heroes/fetchHeroes",
  async (page) => {
    try {
      const data = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
      await new Promise(r => setTimeout(r, 1500));
      return data.data;
    } catch (error) {
      return error.message
    }
  }
);

export const heroesSlice = createSlice({
  name: "heroes",

  initialState: {
    listOfСharacter: [],
    infoPage: "null",
    hero: null,
    isLoading: false,
    error: null,
  },

  extraReducers: {
    [fetchHeroes.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchHeroes.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.listOfСharacter = action.payload.results;
      state.infoPage = action.payload.info;
    },
    [fetchHeroes.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default heroesSlice.reducer;
