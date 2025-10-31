import { useEffect, useState } from "react";

export default function Questions() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState("");
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState("");

  const fetchQuestions = () => {
    fetch("http://localhost:8000/api/v1/questions")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar preguntas");
        return res.json();
      })
      .then(setQuestions)
      .catch(setError)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setSuccess("");
    setError(null);
    try {
      const res = await fetch("http://localhost:8000/api/v1/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: form })
      });
      if (!res.ok) throw new Error("No se pudo enviar la pregunta");
      setForm("");
      setSuccess("¡Pregunta enviada! Será respondida pronto.");
      fetchQuestions();
    } catch (err) {
      setError(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-serif font-bold mb-6">Preguntas Frecuentes</h2>
      <form onSubmit={handleSubmit} className="mb-8 bg-white rounded shadow p-4">
        <label className="block mb-2 font-bold">¿Tienes una pregunta bíblica o teológica?</label>
        <textarea
          className="w-full p-2 border rounded mb-2"
          value={form}
          onChange={e => setForm(e.target.value)}
          placeholder="Escribe tu pregunta aquí..."
          required
          rows={3}
        />
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded font-bold" disabled={sending}>
          {sending ? "Enviando..." : "Enviar pregunta"}
        </button>
        {success && <div className="text-green-600 mt-2">{success}</div>}
        {error && <div className="text-red-600 mt-2">{error.message}</div>}
      </form>
      {loading && <p>Cargando preguntas...</p>}
      <div className="grid gap-6">
        {questions.map((q) => (
          <div key={q.id} className="bg-white rounded shadow p-4">
            <h3 className="text-xl font-bold mb-2">{q.question}</h3>
            <p className="mb-2">{q.answer || <span className="italic text-gray-400">Pendiente de respuesta</span>}</p>
            <span className="text-sm text-gray-500">{q.status === "respondida" ? "Respondida" : "Pendiente"}</span>
          </div>
        ))}
        {(!loading && questions.length === 0) && <p>No hay preguntas registradas aún.</p>}
      </div>
    </div>
  );
}
