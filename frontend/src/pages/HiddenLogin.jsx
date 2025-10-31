import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HiddenLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [show2FA, setShow2FA] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (!show2FA) {
        // Primer intento: login normal
        const res = await fetch("http://localhost:8000/api/v1/login", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ username, password })
        });
        const data = await res.json();
        if (data.token_type === "2fa-required") {
          setShow2FA(true);
          setError("");
          return;
        }
        if (!res.ok || !data.access_token) throw new Error("Credenciales incorrectas");
        localStorage.setItem("token", data.access_token);
        navigate("/dashboard");
      } else {
        // Segundo paso: login con 2FA
        const res = await fetch("http://localhost:8000/api/v1/login-2fa", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ username, password, code })
        });
        const data = await res.json();
        if (!res.ok || !data.access_token) throw new Error("Código 2FA incorrecto");
        localStorage.setItem("token", data.access_token);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-secondary">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-serif font-bold mb-4">Acceso Misioneros</h2>
        <form onSubmit={handleSubmit}>
          <input className="w-full mb-2 p-2 border rounded" type="text" placeholder="Usuario" value={username} onChange={e => setUsername(e.target.value)} required disabled={show2FA} />
          <input className="w-full mb-2 p-2 border rounded" type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required disabled={show2FA} />
          {show2FA && (
            <input className="w-full mb-2 p-2 border rounded" type="text" placeholder="Código 2FA" value={code} onChange={e => setCode(e.target.value)} required />
          )}
          <button className="bg-primary text-white px-4 py-2 rounded font-bold w-full" type="submit" disabled={loading}>{loading ? "Entrando..." : show2FA ? "Verificar 2FA" : "Entrar"}</button>
        </form>
        {error && <div className="text-red-600 mt-2">{error}</div>}
        <p className="text-xs text-gray-500 mt-2">Ruta privada. Solo para misioneros autorizados.</p>
      </div>
    </div>
  );
}
