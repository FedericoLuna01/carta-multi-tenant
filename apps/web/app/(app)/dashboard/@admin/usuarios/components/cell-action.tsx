"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AlertModal } from "@/components/modals/alert-modal";
import { UserNoPass } from "@/types/types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { deleteUser } from "@/actions/user/delete-user";

interface CellActionProps {
  data: UserNoPass;
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [dropOpen, setDropOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      deleteUser(data).then((res) => {
        if (res.success) {
          return toast.success("Usuario eliminado");
        }
        return toast.error(res.error)
      })
    } catch (error) {
      toast.error("Algo salio mal");
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
      <DropdownMenu
        open={dropOpen}
        onOpenChange={setDropOpen}
      >
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={`/dashboard/usuarios/${data.id}`}>
              <Pencil className="w-5 h-5 mr-2" /> Editar Usuario
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setIsOpen(true);
              setDropOpen(false);
            }}
            className="text-red-500 hover:bg-red-500 hover:text-white"
          >
            <Trash className="w-5 h-5 mr-2" />
            Eliminar usuario
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellAction;
