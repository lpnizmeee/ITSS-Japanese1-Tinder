import { Routes, Route } from "react-router-dom";
import { Home, LoginPage, RegisterPage, NotFoundPage, Profile ,  EditProfile, Settings, ResetPassword } from "./pages";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/editprofile" element ={<EditProfile/>}/>
        <Route path="/settings" element ={<Settings/>}/>
        <Route path="/forgotpassword" element ={<ResetPassword/>}/>
      </Routes>
    </>
  );
}

export default App;
