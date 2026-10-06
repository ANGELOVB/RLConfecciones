import { useAuthStore } from "../../features/auth/presentation/stores/auth.store";
import { Card } from "../../shared/components/Card";
import { GiSewingMachine } from "react-icons/gi";
import { FaBuildingUser } from "react-icons/fa6";
import { GrCut } from "react-icons/gr";
import { HiDocumentText } from "react-icons/hi2";

export function HomePage() {
  const user = useAuthStore((state) => state.user);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
      <p className="mb-2 text-xs font-bold uppercase tracking-widest text-cyan-600">
        Panel principal
      </p>

      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        Hola, {user?.name ?? "bienvenido"}
      </h1>

      <p className="mt-3 text-xl text-slate-500">
        Selecciona un módulo para comenzar.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {/* <Link
          to="/maquileros"
          className="panel block transition hover:border-cyan-300
            hover:shadow-md focus-visible:outline-2
            focus-visible:outline-offset-4 focus-visible:outline-cyan-600 col-span-3"
        >
          <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 text-xl font-bold text-cyan-600">
            M
          </span>

          <h2 className="text-lg font-bold text-slate-900">Maquileros</h2>

          <p className="mt-2 text-sm text-slate-500">
            Consulta, agrega y actualiza los contactos de producción.
          </p>

          <p className="mt-5 text-sm font-semibold text-cyan-600">
            Abrir directorio →
          </p>
        </Link> */}
        <Card
          to="/maquileros"
          color="cyan"
          icon={GiSewingMachine}
          badge="Directorio de producción"
          title="Maquileros"
          description="Administra los datos de los maquileros externos. Consulta, agrega y actualiza su información."
          actionText="Abrir directorio"
          className="col-span-1"
        />
        <Card
          to="/clientes"
          color="lime"
          icon={FaBuildingUser}
          badge="Directorio de producción"
          title="Clientes"
          description="Administra los datos de los clientes. Consulta, agrega y actualiza su información."
          actionText="Abrir directorio"
          className="col-span-1"
        />
        <Card
          to="/contratos"
          color="violet"
          icon={HiDocumentText}
          badge="Directorio de producción"
          title="Contratos"
          description="Administra los datos de los contratos. Consulta, agrega y actualiza su información."
          actionText="Abrir directorio"
          className="col-span-1"
        />
        <Card
          to="/cortes"
          color="fuchsia"
          icon={GrCut}
          badge="Directorio de producción"
          title="Cortes"
          description="Administra los datos de los cortes. Consulta, agrega y actualiza su información."
          actionText="Abrir directorio"
          className="col-span-1"
        />
        {/* 
        <Card
          to="/maquileros"
          color="blue"
          icon="icon-facebook"
          badge="Directorio de producción"
          title="Maquileros"
          description="Todos tus contactos de producción en un solo lugar. Consulta, agrega y actualiza su información."
          actionText="Abrir directorio"
          className="col-span-2"
        />

        <Card
          to="/maquileros"
          color="neutral"
          icon="icon-github"
          badge="Directorio de producción"
          title="Maquileros"
          description="Todos tus contactos de producción en un solo lugar. Consulta, agrega y actualiza su información."
          actionText="Abrir directorio"
          className="col-span-2"
        />
        <Card
          to="/maquileros"
          color="fuchsia"
          icon="icon-instagram"
          badge="Directorio de producción"
          title="Maquileros"
          description="Todos tus contactos de producción en un solo lugar. Consulta, agrega y actualiza su información."
          actionText="Abrir directorio"
          className="col-span-1"
        />
        <Card
          to="/maquileros"
          color="amber"
          icon="icon-x"
          badge="Directorio de producción"
          title="Maquileros"
          description="Todos tus contactos de producción en un solo lugar. Consulta, agrega y actualiza su información."
          actionText="Abrir directorio"
          className="col-span-2"
        />
        <Card
          to="/maquileros"
          color="red"
          icon="icon-youtube"
          badge="Directorio de producción"
          title="Maquileros"
          description="Todos tus contactos de producción en un solo lugar. Consulta, agrega y actualiza su información."
          actionText="Abrir directorio"
          className="col-span-1"
        />
        <Card
          to="/maquileros"
          color="stone"
          icon="icon-linkedin"
          badge="Directorio de producción"
          title="Maquileros"
          description="Todos tus contactos de producción en un solo lugar. Consulta, agrega y actualiza su información."
          actionText="Abrir directorio"
          className="col-span-2"
        /> */}
      </div>
    </main>
  );
}
