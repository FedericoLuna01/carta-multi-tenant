"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ChevronUp } from "lucide-react";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Calcular la posición actual de desplazamiento
      const scrollY = window.scrollY || document.documentElement.scrollTop;

      // Mostrar o ocultar el botón según la posición de desplazamiento
      setIsVisible(scrollY > 800);
    };

    // Agregar el event listener cuando el componente se monta
    window.addEventListener("scroll", handleScroll);

    // Limpiar el event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Función para manejar el clic en el botón de volver arriba
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {isVisible && (
        <Button
          className={`fixed font-bold bottom-24 sm:bottom-32 right-8 sm:right-12 z-50 transition-opacity duration-500 ease-in-out transform hover:scale-110 ${isVisible ? "opacity-100" : "opacity-0"
            }`}
          onClick={scrollToTop}
          size="icon"
        >
          <ChevronUp className="w-6 h-6" />
        </Button>
      )}
    </div>
  );
};

export default BackToTop;
