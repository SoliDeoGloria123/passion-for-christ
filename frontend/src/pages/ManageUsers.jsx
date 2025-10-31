import { useEffect, useState } from "react";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ username: "", password: "", role: "editor" });
  const [editing, setEditing] = useState(null);
  const token = localStorage.getItem("token");

  const fetchUsers = () => {
    setLoading(true);
    fetch("http://localhost:8000/api/v1/users", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error("No autorizado o no admin");
        return res.json();
      })
      .then(setUsers)
      .catch(setError)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const method = editing ? "PUT" : "POST";
    const url = editing ? `http://localhost:8000/api/v1/users/${editing}` : "http://localhost:8000/api/v1/users";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      setForm({ username: "", password: "", role: "editor" });
      setEditing(null);
      fetchUsers();
    } else {
      alert("Error al guardar el usuario");
    }
  };

  const handleEdit = user => {
    setForm({ username: user.username, password: "", role: user.role });
    setEditing(user.id);
  };

  return (
    <div className="py-8">
      <h3 className="text-2xl font-bold mb-4">Gestión de Usuarios (solo admin)</h3>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
        <input name="username" value={form.username} onChange={handleChange} placeholder="Usuario" className="w-full mb-2 p-2 border rounded" required />
        <input name="password" value={form.password} onChange={handleChange} placeholder="Contraseña" className="w-full mb-2 p-2 border rounded" type="password" required={!editing} />
        <select name="role" value={form.role} onChange={handleChange} className="w-full mb-2 p-2 border rounded">
          <option value="editor">Editor</option>
          <option value="admin">Admin</option>
        </select>
        <button className="bg-primary text-white px-4 py-2 rounded font-bold" type="submit">{editing ? "Actualizar" : "Crear"} usuario</button>
        {editing && <button type="button" className="ml-4 text-sm underline" onClick={() => { setEditing(null); setForm({ username: "", password: "", role: "editor" }); }}>Cancelar edición</button>}
      </form>
      {loading ? <p>Cargando...</p> : (
        <div className="grid gap-4">
          {users.map(user => (
            <div key={user.id} className="bg-secondary p-4 rounded shadow flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div className="font-bold">{user.username}</div>
                <div className="text-xs text-gray-600">Rol: {user.role}</div>
              </div>
              <div className="flex gap-2 mt-2 md:mt-0">
                <button className="text-blue-700 underline" onClick={() => handleEdit(user)}>Editar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
