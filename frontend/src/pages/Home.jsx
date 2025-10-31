export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary text-white">
      <img src="/jhojan-valentina.jpg" alt="Jhojan y Valentina" className="w-40 h-40 rounded-full shadow-lg mb-6" />
      <h1 className="text-4xl font-serif font-bold mb-2">Hola, somos Jhojan y Valentina Amaya</h1>
      <p className="text-lg font-sans mb-4">Siervos del Señor por más de 4 años. Nuestra misión es compartir el evangelio y responder preguntas bíblicas y teológicas.</p>
      <a href="#apoyar" className="bg-accent text-primary font-bold px-6 py-2 rounded-full shadow hover:bg-yellow-400 transition mb-4">Apóyanos</a>
      <div className="flex gap-4 mb-4">
        <a href="#" aria-label="Instagram" className="hover:underline">Instagram</a>
        <a href="#" aria-label="YouTube" className="hover:underline">YouTube</a>
        <a href="#" aria-label="Facebook" className="hover:underline">Facebook</a>
      </div>
      <form className="bg-white text-primary rounded-lg shadow p-6 w-full max-w-md">
        <h2 className="text-2xl font-serif mb-4">Contacto</h2>
        <input className="w-full mb-2 p-2 border rounded" type="text" placeholder="Nombre" />
        <input className="w-full mb-2 p-2 border rounded" type="email" placeholder="Email" />
        <textarea className="w-full mb-2 p-2 border rounded" placeholder="Mensaje" />
        <button className="bg-primary text-white px-4 py-2 rounded font-bold w-full" type="submit">Enviar</button>
      </form>
    </div>
  );
}
