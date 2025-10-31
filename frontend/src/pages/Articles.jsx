import { useEffect, useState } from "react";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/articles")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar artículos");
        return res.json();
      })
      .then(setArticles)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-serif font-bold mb-6">Artículos Teológicos</h2>
      {loading && <p>Cargando artículos...</p>}
      {error && <p className="text-red-600">{error.message}</p>}
      <div className="grid gap-6">
        {articles.map((a) => (
          <div key={a.id} className="bg-white rounded shadow p-4">
            <h3 className="text-xl font-bold mb-2">{a.title}</h3>
            <p className="mb-2">{a.summary}</p>
            <span className="text-sm text-gray-500">Por {a.author} · {new Date(a.created_at).getFullYear()}</span>
            <div className="mt-2 text-xs text-gray-400">{a.tags}</div>
          </div>
        ))}
        {(!loading && articles.length === 0) && <p>No hay artículos publicados aún.</p>}
      </div>
    </div>
  );
}
