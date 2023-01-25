import "./App.css";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/Homepage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
