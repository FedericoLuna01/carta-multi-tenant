"use client";

import { getIsOpen } from "@/actions/getIsOpen";
import { Badge } from "./ui/badge";
import { UserSettings } from "@prisma/client";

const StatusBadge = ({
  userSettings,
}: {
  userSettings: UserSettings | null;
}) => {
  const isOpen = getIsOpen(userSettings);
  return (
    <>
      {isOpen ? (
        <Badge variant="open">Abierto</Badge>
      ) : (
        <Badge variant="closed">Cerrado</Badge>
      )}
    </>
  );
};

export default StatusBadge;
