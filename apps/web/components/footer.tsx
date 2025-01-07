const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="py-8 border-t border-border w-full">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center md:justify-between">
        <p>
          {/* TODO: Agregar link */}
          Te interesa un menú como este? <a className="text-blue-500 underline cursor-pointer" href="#">Contacto</a>
        </p>
        <p>
          &copy; {year} <a className="text-blue-500 underline cursor-pointer" href="#">Plato Menu</a>. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
