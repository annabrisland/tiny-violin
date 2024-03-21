import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Landing from "./screens/landing/Landing";
import ViolinPlay from "./screens/violin/ViolinPlay";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/violin" element={<ViolinPlay />} />
      </Routes>
    </Router>
  );
}

export default App;
