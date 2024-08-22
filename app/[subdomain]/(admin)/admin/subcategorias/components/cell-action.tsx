"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { Pencil, Trash } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { AlertModal } from "@/components/modals/alert-modal";
import { type Category } from "@prisma/client";

interface CellActionProps {
  data: Category;
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onDelete = async () => {
    // Hacer que la categoría se elimine
    try {
      setLoading(true);
      await axios.delete(`/api/subcategories/${data.id}`);
      router.refresh();
      toast.success("Subcategoría eliminada");
    } catch (error) {
      toast.error(
        "Asegúrate de haber eliminado todos los productos de esta subcategoría"
      );
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };
  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="space-x-2">
        <Button size="icon" variant="outline" asChild title="Editar categoría">
          <Link href={`/admin/subcategorias/${data.id}`}>
            <Pencil className="w-5 h-5" />
          </Link>
        </Button>
        <Button size="icon" variant="destructive" title="Borrar categoría">
          <Trash className="w-5 h-5" onClick={() => setIsOpen(true)} />
        </Button>
      </div>
    </>
  );
};

export default CellAction;
