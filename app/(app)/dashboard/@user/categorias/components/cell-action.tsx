"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Pencil, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AlertModal } from "@/components/modals/alert-modal";
import { type Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "@/utils/user";

interface CellActionProps {
  data: Category;
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const user = useUser()

  const onDelete = async () => {
    try {
      setLoading(true);
      await fetch(`/api/${user.slug}/categories/${data.id}`, {
        method: "DELETE",
      },);
      router.refresh();
      toast.success("Categoría eliminada");
    } catch (error) {
      toast.error(
        "Asegúrate de haber eliminado todas las subcategorias que estén usando esta categoría"
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
        <Button size="icon" variant="outline" title="Editar categoría" asChild>
          <Link
            href={`/dashboard/categorias/${data.id}`}
            prefetch={false}
          >
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
