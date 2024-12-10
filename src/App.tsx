import { Routes, Route } from "react-router-dom";
import { Home, LoginPage, RegisterPage, NotFoundPage, Profile ,  EditProfile, Dashboard, Settings, ResetPassword } from "./pages";


function App() {
  const user = {
    avatar: "user-avatar-placeholder.png",
    name: "山田 太郎",
    role: "学生",
    info: "趣味: 音楽、読書",
  };
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard user={user}/>} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/editprofile" element ={<EditProfile/>}/>
        <Route path="/settings" element ={<Settings/>}/>
        <Route path="/forgotpassword" element ={<ResetPassword/>}/>
      </Routes>
    </>
  );
}

export default App;
