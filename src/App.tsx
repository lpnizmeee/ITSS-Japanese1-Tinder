import { Routes, Route } from "react-router-dom";
import { Home, LoginPage, RegisterPage, NotFoundPage, Profile, EditProfile, Dashboard, Settings, ResetPassword, ChatBox, MatchingList, EventList, AddEvent } from "./pages";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/forgotpassword" element={<ResetPassword />} />
        <Route path="/chatbox/:matchingID" element={<ChatBox />} />
        <Route path="/matchinglist" element={<MatchingList />} />
        <Route path="/eventlist" element={<EventList />} />
        <Route path="/add-event" element={<AddEvent />} />
      </Routes>
    </>
  );
}

export default App;
