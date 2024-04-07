"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Check } from "lucide-react";

interface SuccessOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SuccessOrderModal: React.FC<SuccessOrderModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const handleChange = () => {
    if (isOpen) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-black">
            ¡Orden realizada con éxito!
          </DialogTitle>
          <DialogDescription className="text-center">
            Muchas gracias por tu compra.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center flex-col items-center gap-4">
          <div className="bg-green-500 rounded-full p-4">
            <Check className="w-8 h-8" strokeWidth={3} color="#FFF" />
          </div>
          <div>
            <p className="text-center px-8">
              Vamos a recargar la página para que puedas seguir el estado tu
              orden.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
