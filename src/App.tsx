import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import ReceptionPage from "./pages/ReceptionPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home version="both" />} />
      <Route path="/22-nov" element={<ReceptionPage />} />
      <Route path="/reception" element={<ReceptionPage />} />
      <Route path="/22-nov.html" element={<ReceptionPage />} />
      <Route path="*" element={<Home version="both" />} />
    </Routes>
  );
}
