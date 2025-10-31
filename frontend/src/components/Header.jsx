import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-primary text-white p-4 flex justify-between items-center">
      <Link to="/" className="font-serif text-2xl font-bold">Passion For Christ</Link>
      <nav className="flex gap-4">
        <Link to="/about" className="hover:underline">Sobre Nosotros</Link>
        <Link to="/articles" className="hover:underline">Artículos</Link>
        <Link to="/questions" className="hover:underline">Preguntas</Link>
      </nav>
    </header>
  );
}
