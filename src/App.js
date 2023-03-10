import "./App.css";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import AllEvents from "./pages/AllEvents";
import EventDetails from "./pages/EventDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import IsAnon from "./components/IsAnon";
import AddEvent from "./pages/AddEvent";
import IsPrivate from "./components/IsPrivate";
import AddTrip from "./pages/AddTrip";
import EditTrip from "./pages/EditTrip";
import Footer from "./components/Footer";
import UserProfile from "./pages/UserProfile";
import MessageForm from "./components/MessageForm";
import ReplyForm from "./components/ReplyForm";
import MyNavbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <div className="logoSection">
        <a href="/">
          <img className="logo" src="/images/logo.jpg" alt="logo" />
        </a>
      </div>
      <div>
        <img className="svg" src="/images/svg.png" alt="svg"></img>
      </div>

      <MyNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<AllEvents />} />
        <Route path="/events/create" element={<AddEvent />} />
        <Route
          path="/events/:eventId"
          element={
            <IsPrivate>
              <EventDetails />
            </IsPrivate>
          }
        />
        <Route
          path="/signup"
          element={
            <IsAnon>
              <Signup />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <Login />
            </IsAnon>
          }
        />
        <Route
          path="/events"
          element={
            <IsPrivate>
              <AddEvent />
            </IsPrivate>
          }
        />
        <Route
          path="/events/:eventId/share-your-trip"
          element={
            <IsPrivate>
              <AddTrip />
            </IsPrivate>
          }
        />
        <Route
          path="/events/:eventId/share-your-trip/:tripId/edit"
          element={
            <IsPrivate>
              <EditTrip />
            </IsPrivate>
          }
        />
        <Route
          path="/profile/:userId"
          element={
            <IsPrivate>
              <UserProfile />
            </IsPrivate>
          }
        />
        <Route
          path="/message"
          element={
            <IsPrivate>
              <MessageForm />
              <ReplyForm />
            </IsPrivate>
          }
        />
      </Routes>

      <div>
        <img className="svg" src="/images/svg-bottom.png" alt="svg"></img>
      </div>

      <Footer />
    </div>
  );
}

export default App;
