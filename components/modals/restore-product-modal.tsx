"use client";

import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import useRestoreProductModal from "@/hooks/use-restore-product-modal";
import { formatter } from "@/lib/utils";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "../ui/spinner";
import { useUser } from "@/utils/user";

const ProductDescription = ({ data }) => {
  return (
    <div className="space-y-2 pt-4">
      <div>
        <p className="text-sm font-bold">Imagen</p>
        <Image
          src={data.image}
          alt={data.name}
          width={260}
          height={150}
          className="rounded-md aspect-[16/10] object-cover mt-1"
        />
      </div>
      <div>
        <p className="text-sm font-bold">Nombre</p>
        <p className="text-sm">{data.name}</p>
      </div>
      <div>
        <p className="text-sm font-bold">Descripción</p>
        <p className="text-sm">{data.description ? data.description : "-"}</p>
      </div>
      <div>
        <p className="text-sm font-bold">Precio</p>
        <p className="text-sm">{formatter.format(data.price)}</p>
      </div>
      <div>
        <p className="text-sm font-bold">Subcategoría</p>
        <p className="text-sm">{data.subcategory.name}</p>
      </div>
      <div>
        <p className="text-sm font-bold">Extras</p>
        <div className="text-sm">
          {data.extras.length > 0 ? (
            <div>
              {data.extras.map((extra) => (
                <p key={extra.id}>
                  {extra.name} - {formatter.format(extra.price)}
                </p>
              ))}
            </div>
          ) : (
            "No hay extras"
          )}
        </div>
      </div>
      <div>
        <p className="text-sm font-bold">Tamaños</p>
        <div className="text-sm">
          {data.sizes.length > 0 ? (
            <div>
              {data.sizes.map((size) => (
                <p key={size.id}>
                  {size.name} - {formatter.format(size.price)}
                </p>
              ))}
            </div>
          ) : (
            "No hay tamaños"
          )}
        </div>
      </div>
      <div>
        <p className="text-sm font-bold">En promoción</p>
        <p className="text-sm">{data.isPromo ? "Si" : "No"}</p>
      </div>
      {
        <div>
          <p className="text-sm font-bold">Precio de promoción</p>
          <p className="text-sm">{formatter.format(data.promoPrice)}</p>
        </div>
      }
      <div>
        <p className="text-sm font-bold">Archivado</p>
        <p className="text-sm">{data.isArchived ? "Si" : "No"}</p>
      </div>
    </div>
  );
};

const RestoreProductModal = () => {
  const [loading, setLoading] = useState(false);
  const { data, onClose, isRestoreModalOpen } = useRestoreProductModal();
  const router = useRouter();
  const user = useUser()

  const handleChange = () => {
    if (isRestoreModalOpen) {
      return onClose();
    }
  };

  const handleRestore = async () => {
    try {
      setLoading(true);
      await axios.patch(`/api/${user.slug}/products/${data.id}/lastChange`);
      router.refresh();
      toast.success("Producto actualizado");
    } catch (error) {
      toast.error("Algo salio mal");
    } finally {
      setLoading(false);
      onClose();
    }
  };

  if (!data) return null;

  return (
    <Dialog open={isRestoreModalOpen} onOpenChange={handleChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-black">
            Ultimo cambio
          </DialogTitle>
          <DialogDescription>Volver a la version anterior</DialogDescription>
          <div className="grid grid-cols-[1fr,auto,1fr]">
            <div className="p-4">
              <p className="text-xl font-bold text-center">Actual</p>
              <ProductDescription data={data} />
            </div>
            <Separator orientation="vertical" />
            <div className="p-4">
              <p className="text-xl font-bold text-center">Anterior</p>
              {data.lastChange ? (
                <ProductDescription data={data.lastChange} />
              ) : (
                <p className="text-xl text-center mt-4">
                  No hay versión anterior
                </p>
              )}
            </div>
          </div>
        </DialogHeader>
        <DialogFooter>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button
            onClick={handleRestore}
            className="flex gap-2"
            disabled={loading}
          >
            {loading ? <Spinner className="w-4 h-4" /> : null}
            Restaurar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RestoreProductModal;
