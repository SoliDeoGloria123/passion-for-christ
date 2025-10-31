export default function Footer() {
  return (
    <footer className="bg-primary text-white p-4 text-center mt-8">
      <div className="mb-2">&copy; {new Date().getFullYear()} Passion For Christ</div>
      <div className="flex justify-center gap-4">
        <a href="#" className="hover:underline">Política de Privacidad</a>
        <a href="#" className="hover:underline">Contacto</a>
        <a href="#" className="hover:underline">Instagram</a>
      </div>
    </footer>
  );
}
