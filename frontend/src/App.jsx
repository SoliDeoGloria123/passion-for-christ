import ManageUsers from "./pages/ManageUsers";
import Metrics from "./pages/Metrics";
import ManageQuestions from "./pages/ManageQuestions";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Articles from "./pages/Articles";
import Questions from "./pages/Questions";
import HiddenLogin from "./pages/HiddenLogin";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import ManageArticles from "./pages/ManageArticles";


// Wrapper para proteger rutas privadas
function RequireAuth({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/_m/entrar" replace />;
  }
  return children;
}

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/_m/entrar" element={<HiddenLogin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/articulos" element={<RequireAuth><ManageArticles /></RequireAuth>} />
            <Route path="/dashboard/preguntas" element={<RequireAuth><ManageQuestions /></RequireAuth>} />
            <Route path="/dashboard/usuarios" element={<RequireAuth><ManageUsers /></RequireAuth>} />
            <Route path="/dashboard/metricas" element={<RequireAuth><Metrics /></RequireAuth>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
