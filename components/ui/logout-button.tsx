import { signOut } from "@/auth";
import { Button } from "./button";

const LogoutButton = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button className="w-full" variant="destructive">
        Cerrar sesión
      </Button>
    </form>
  );
};

export default LogoutButton;
