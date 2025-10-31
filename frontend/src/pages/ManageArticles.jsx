import { useEffect, useState } from "react";

export default function ManageArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ title: "", summary: "", content: "", author: "", tags: "" });
  const [editing, setEditing] = useState(null);
  const token = localStorage.getItem("token");

  const fetchArticles = () => {
    setLoading(true);
    fetch("http://localhost:8000/api/v1/articles")
      .then(res => res.json())
      .then(setArticles)
      .catch(setError)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchArticles(); }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const method = editing ? "PUT" : "POST";
    const url = editing ? `http://localhost:8000/api/v1/articles/${editing}` : "http://localhost:8000/api/v1/articles";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      setForm({ title: "", summary: "", content: "", author: "", tags: "" });
      setEditing(null);
      fetchArticles();
    } else {
      alert("Error al guardar el artículo");
    }
  };

  const handleEdit = art => {
    setForm({ title: art.title, summary: art.summary, content: art.content, author: art.author, tags: art.tags });
    setEditing(art.id);
  };

  const handleDelete = async id => {
    if (!window.confirm("¿Eliminar este artículo?")) return;
    const res = await fetch(`http://localhost:8000/api/v1/articles/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) fetchArticles();
    else alert("Error al eliminar");
  };

  return (
    <div className="py-8">
      <h3 className="text-2xl font-bold mb-4">Gestionar Artículos</h3>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Título" className="w-full mb-2 p-2 border rounded" required />
        <input name="summary" value={form.summary} onChange={handleChange} placeholder="Resumen" className="w-full mb-2 p-2 border rounded" />
        <input name="author" value={form.author} onChange={handleChange} placeholder="Autor" className="w-full mb-2 p-2 border rounded" />
        <input name="tags" value={form.tags} onChange={handleChange} placeholder="Tags (coma)" className="w-full mb-2 p-2 border rounded" />
        <textarea name="content" value={form.content} onChange={handleChange} placeholder="Contenido" className="w-full mb-2 p-2 border rounded" rows={4} />
        <button className="bg-primary text-white px-4 py-2 rounded font-bold" type="submit">{editing ? "Actualizar" : "Crear"} artículo</button>
        {editing && <button type="button" className="ml-4 text-sm underline" onClick={() => { setEditing(null); setForm({ title: "", summary: "", content: "", author: "", tags: "" }); }}>Cancelar edición</button>}
      </form>
      {loading ? <p>Cargando...</p> : (
        <div className="grid gap-4">
          {articles.map(art => (
            <div key={art.id} className="bg-secondary p-4 rounded shadow flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div className="font-bold">{art.title}</div>
                <div className="text-xs text-gray-600">{art.author} · {art.tags}</div>
                <div className="text-sm text-gray-500">{art.summary}</div>
              </div>
              <div className="flex gap-2 mt-2 md:mt-0">
                <button className="text-blue-700 underline" onClick={() => handleEdit(art)}>Editar</button>
                <button className="text-red-700 underline" onClick={() => handleDelete(art.id)}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
