import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchEpisodes = createAsyncThunk(
  "heroes/fetchEpisodes",
  async (page) => {
    try {
      const data = await axios.get(
        `https://rickandmortyapi.com/api/episode?page=${page}`
      );
      return data.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const episodesSlice = createSlice({
  name: "episodes",

  initialState: {
    listOfEpisodes: [],
    infoPage: null,
    status: null,
    error: null,
  },

  extraReducers: {
    [fetchEpisodes.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchEpisodes.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.listOfEpisodes = action.payload.results;
      state.infoPage = action.payload.info;
    },
  },
});

export default episodesSlice.reducer;