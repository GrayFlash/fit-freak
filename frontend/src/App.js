import React from "react";
import { BrowserRouter as Router, Routes, useNavigate, Route } from "react-router-dom";
import HomePage from "./Views/HomePage";
import PoseAcc from "./Views/PoseAcc";
import Room from './Views/Room';

const App = () => {
  // let navigate = useNavigate();

  return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/room/:roomID" element={<Room/>} />
          <Route path="/poseaccuracy" element={<PoseAcc />} />
        </Routes>
      </Router>
  );
};

export default App;
