import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Views/HomePage";
import PoseAcc from "./Views/PoseAcc";

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/poseaccuracy" element={<PoseAcc />} />
        </Routes>
      </Router>
  );
};

export default App;
