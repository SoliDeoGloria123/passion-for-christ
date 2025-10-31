import { useEffect, useState } from "react";

export default function Metrics() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/metrics/basic", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error("No autorizado");
        return res.json();
      })
      .then(setMetrics)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <div className="p-8">Cargando métricas...</div>;
  if (error) return <div className="text-red-600">{error.message}</div>;

  return (
    <div className="py-8">
      <h3 className="text-2xl font-bold mb-4">Métricas Básicas</h3>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <div className="bg-secondary p-6 rounded shadow text-center">
          <div className="text-4xl font-bold">{metrics.visits}</div>
          <div className="text-sm">Visitas</div>
        </div>
        <div className="bg-secondary p-6 rounded shadow text-center">
          <div className="text-4xl font-bold">{metrics.articles}</div>
          <div className="text-sm">Artículos</div>
        </div>
        <div className="bg-secondary p-6 rounded shadow text-center">
          <div className="text-4xl font-bold">{metrics.questions}</div>
          <div className="text-sm">Preguntas</div>
        </div>
      </div>
    </div>
  );
}
