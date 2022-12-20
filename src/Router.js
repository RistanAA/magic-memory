import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";
import Leaderboard from "./pages/Leaderboard"

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact index element={<LoginPage />} />
        <Route exact path="/signup" element={<SignupPage />} />
        {/* <Route path="/" element={<Home/>}/> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
