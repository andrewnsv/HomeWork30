import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchHeroes = createAsyncThunk(
  "heroes/fetchHeroes",
  async (page) => {
    try {
      const data = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
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
    status: null,
    error: null,
  },

  extraReducers: {
    [fetchHeroes.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchHeroes.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.listOfСharacter = action.payload.results;
      state.infoPage = action.payload.info;
    },
    [fetchHeroes.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});

export default heroesSlice.reducer;
