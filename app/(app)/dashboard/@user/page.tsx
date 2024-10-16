import { Hammer } from "lucide-react";

const UserPage = () => {
  return (
    <main
      className="flex items-center justify-center h-full"
    >
      <div className="flex flex-col gap-4 items-center max-w-md text-center">
        <Hammer className="w-24 h-24" strokeWidth={1.2} />
        <p className="text-3xl font-bold">
          En construcción!
        </p>
        <p className="text-lg text-muted-foreground">
          Próximamente vas a poder ver las estadísticas de tu negocio con tableros y gráficos detallados
        </p>
      </div>
    </main>
  );
};

export default UserPage;
