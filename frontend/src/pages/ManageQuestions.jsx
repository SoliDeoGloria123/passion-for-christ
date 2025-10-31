import { useEffect, useState } from "react";

export default function ManageQuestions() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answer, setAnswer] = useState("");
  const [selected, setSelected] = useState(null);
  const token = localStorage.getItem("token");

  const fetchQuestions = () => {
    setLoading(true);
    fetch("http://localhost:8000/api/v1/private/questions", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setQuestions)
      .catch(setError)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchQuestions(); }, []);

  const handleAnswer = async (id) => {
    if (!answer) return;
    const res = await fetch(`http://localhost:8000/api/v1/questions/${id}/answer?answer=${encodeURIComponent(answer)}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      setAnswer("");
      setSelected(null);
      fetchQuestions();
    } else {
      alert("Error al responder");
    }
  };

  const handleDelete = async id => {
    if (!window.confirm("¿Eliminar esta pregunta?")) return;
    const res = await fetch(`http://localhost:8000/api/v1/questions/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) fetchQuestions();
    else alert("Error al eliminar");
  };

  return (
    <div className="py-8">
      <h3 className="text-2xl font-bold mb-4">Gestionar Preguntas</h3>
      {loading ? <p>Cargando...</p> : (
        <div className="grid gap-4">
          {questions.map(q => (
            <div key={q.id} className="bg-secondary p-4 rounded shadow flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div className="font-bold">{q.question}</div>
                <div className="text-xs text-gray-600">Estado: {q.status}</div>
                <div className="text-sm text-gray-500">{q.answer || <span className="italic text-gray-400">Sin respuesta</span>}</div>
              </div>
              <div className="flex flex-col gap-2 mt-2 md:mt-0 md:flex-row md:items-center">
                {q.status !== "respondida" && (
                  <>
                    <input
                      className="border p-1 rounded mr-2"
                      placeholder="Respuesta"
                      value={selected === q.id ? answer : ""}
                      onChange={e => { setSelected(q.id); setAnswer(e.target.value); }}
                    />
                    <button className="text-blue-700 underline" onClick={() => handleAnswer(q.id)}>Responder</button>
                  </>
                )}
                <button className="text-red-700 underline" onClick={() => handleDelete(q.id)}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
