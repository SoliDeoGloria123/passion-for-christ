export default function About() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="flex flex-col items-center mb-8">
        <img src="/jhojan-valentina.jpg" alt="Jhojan y Valentina" className="w-32 h-32 rounded-full mb-4" />
        <h2 className="text-3xl font-serif font-bold mb-2">Sobre Nosotros</h2>
      </div>
      <p className="mb-4">Jhojan y Valentina Amaya han servido al Señor por más de 4 años, compartiendo el evangelio y enseñando la Palabra de Dios en diferentes contextos. Su testimonio es de fe, entrega y pasión por Cristo.</p>
      <p className="mb-4">Han participado en misiones, discipulado y formación bíblica, y desean que más personas conozcan a Jesús y crezcan en la fe.</p>
      <div className="bg-secondary p-4 rounded mb-4">
        <strong>Llamado a oración:</strong> Ora por fortaleza, sabiduría y provisión para este ministerio.
      </div>
      <div className="bg-accent text-primary p-4 rounded">
        <strong>¿Quieres apoyar o ser voluntario?</strong> <a href="#apoyar" className="underline">Contáctanos aquí</a>.
      </div>
    </div>
  );
}
