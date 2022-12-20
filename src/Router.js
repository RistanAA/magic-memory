import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Leaderboard from "./pages/Leaderboard"

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/leaderboard" element={<Leaderboard/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router