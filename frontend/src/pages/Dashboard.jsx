  <a href="/dashboard/usuarios" className="bg-gray-700 text-white p-6 rounded shadow text-center font-bold">Gestión de Usuarios</a>
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/_m/entrar");
      return;
    }
    fetch("http://localhost:8000/api/v1/me", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error("No autorizado");
        return res.json();
      })
      .then(setUser)
      .catch(() => navigate("/_m/entrar"))
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) return <div className="p-8">Cargando panel...</div>;
  if (!user) return null;

  const [qr, setQR] = useState(null);
  const [secret, setSecret] = useState(null);
  const [setupError, setSetupError] = useState("");

  const handleSetup2FA = async () => {
    setSetupError("");
    setQR(null);
    setSecret(null);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/v1/2fa/setup", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Error al activar 2FA");
      setSecret(data.secret);
      setQR(data.otp_uri);
    } catch (err) {
      setSetupError(err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-serif font-bold mb-6">Panel de Misioneros</h2>
      <div className="mb-4">Bienvenido, <b>{user.username}</b> ({user.role})</div>
      {!user.totp_secret && (
        <div className="mb-4 p-4 bg-yellow-100 border border-yellow-300 rounded">
          <div className="mb-2 font-bold">Protege tu cuenta con 2FA</div>
          <button className="bg-primary text-white px-4 py-2 rounded font-bold" onClick={handleSetup2FA}>Activar 2FA</button>
          {setupError && <div className="text-red-600 mt-2">{setupError}</div>}
          {qr && (
            <div className="mt-2">
              <div>Escanea este código QR en tu app de autenticación (Google Authenticator, Authy, etc):</div>
              <img src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qr)}&size=200x200`} alt="QR 2FA" className="my-2 mx-auto" />
              <div className="text-xs break-all">O usa este código secreto: <b>{secret}</b></div>
            </div>
          )}
        </div>
      )}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <a href="/dashboard/articulos" className="bg-primary text-white p-6 rounded shadow text-center font-bold">Gestionar Artículos</a>
        <a href="/dashboard/preguntas" className="bg-secondary text-primary p-6 rounded shadow text-center font-bold">Gestionar Preguntas</a>
        <a href="/dashboard/metricas" className="bg-accent text-primary p-6 rounded shadow text-center font-bold">Ver Métricas</a>
      </div>
      {/* Aquí se agregará la gestión real */}
    </div>
  );
}
