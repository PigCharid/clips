import { Route, Routes } from "react-router-dom";
import TopBar from "./components/TopBar";
import Home from "./pages/Home";
import Play from "./pages/Play";
import Alert from "./components/Alert";
import Loading from "./components/Loading";
import AD from "./components/AD";

function App() {
  return (
    <div className="w-full font-rajdhani">
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/how-to-play" element={<Play />} />
      </Routes>
      <Alert />
      <Loading />
      <AD />
    </div>
  );
}

export default App;
