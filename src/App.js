import "./App.css";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import AllEvents from "./pages/AllEvents";
import EventDetails from "./pages/EventDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import IsAnon from "./components/IsAnon";
import AddEvent from "./components/AddEvent";
import IsPrivate from "./components/IsPrivate";
import AddTrip from "./pages/AddTrip";


function App() {
  return (
    <div className="App">
      <a href="/"><img src="/images/logo.jpg" alt="logo" /></a>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<AllEvents />} />
        <Route path="/events/:eventId" element={<EventDetails />} />
        <Route path="/signup" element={<IsAnon> <Signup /> </IsAnon>} />
        <Route path="/login" element={<IsAnon> <Login /> </IsAnon>} />
        <Route path="/events" element={<IsPrivate> <AddEvent /> </IsPrivate>} />
        <Route path="/events/:eventId/share-your-trip" element={<IsPrivate> <AddTrip /> </IsPrivate>} />
        <Route path="/:userId" />
      </Routes>
    </div>
  );
}

export default App;
