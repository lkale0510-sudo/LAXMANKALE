import { Navigate, Route, Routes } from "react-router-dom";
import AdminPage from "./pages/AdminPage.jsx";
import PortfolioPage from "./pages/PortfolioPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PortfolioPage />} />
      <Route path="/LK" element={<AdminPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
