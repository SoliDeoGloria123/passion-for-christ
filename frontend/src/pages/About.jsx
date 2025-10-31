export default function About() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
        <img
          src="/jhojan-valentina.jpg"
          alt="Jhojan y Valentina Amaya"
          className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover shadow-lg mb-4 md:mb-0"
        />
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl font-serif font-bold mb-2">Hola, Somos Jhojan y Valentina Amaya</h2>
          <p className="text-lg mb-4">Siervos del Señor, por más de 4 años en el ministerio, donde nuestra pasión es por los perdidos, llevándoles las buenas nuevas hasta lo último de la tierra, para la Gloria de Cristo Rey.</p>
          <div className="flex justify-center md:justify-start gap-4 mt-4">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-accent text-2xl">
              <i className="fab fa-facebook"></i>
              <span className="sr-only">Facebook</span>
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-accent text-2xl">
              <i className="fab fa-instagram"></i>
              <span className="sr-only">Instagram</span>
            </a>
            <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:text-accent text-2xl">
              <i className="fab fa-whatsapp"></i>
              <span className="sr-only">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
      <div className="bg-secondary p-4 rounded mb-4 text-primary font-semibold text-center md:text-left">
        Llamado a oración: Ora por fortaleza, sabiduría y provisión para este ministerio.
      </div>
      <div className="bg-accent text-primary p-4 rounded text-center md:text-left">
        <strong>¿Quieres apoyar o ser voluntario?</strong> <a href="#apoyar" className="underline">Contáctanos aquí</a>.
      </div>
    </div>
  );
}
