import { BrowserRouter, Routes, Route } from "react-router-dom";
import QRCodeScanner from "./components/QRCodeScanner";
import InputData from "./components/InputData";
import HomePage from "./components/HomePage";
import "./App.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/scan" element={<QRCodeScanner />} />
          <Route path="/result" element={<InputData />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
