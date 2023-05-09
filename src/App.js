import React from "react";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import EpisodesPage from "./pages/EpisodesPage"
import HeroPage from "./pages/HeroPage";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="episodes" element={<EpisodesPage />} />
          <Route path="table" element={<HeroPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
