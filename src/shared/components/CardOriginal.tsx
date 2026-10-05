import { Link } from "react-router-dom";
import spriteUrl from "../../assets/sprite.svg?url";

interface ModuleCardProps {
  title: string;
  description: string;
  icon: string;
  to: string;
  color?: string;
  colortext?: string;
  badge?: string;
  actionText?: string;
  className?: string;
}

export function CardOriginal({
  title,
  description,
  icon,
  to,
  color = "cyan",
  colortext = "white",
  badge = "Directorio de producción",
  actionText = "Abrir directorio",
  className = "col-span-full",
}: ModuleCardProps) {
  return (
    <Link
      to="/maquileros"
      className={`group relative isolate ${className} overflow-hidden
    rounded-3xl border border-${color}-700 bg-linear-to-br
    from-slate-950 via-${color}-950 to-${color}-700 p-7 text-${colortext}
    shadow-lg shadow-${color}-950/15 transition duration-300
    hover:-translate-y-1 hover:border-${color}-400
    hover:shadow-xl hover:shadow-${color}-900/25
    focus-visible:outline-2 focus-visible:outline-offset-4
    focus-visible:outline-${color}-500 motion-reduce:transform-none
    motion-reduce:transition-none sm:p-9`}
    >
      {/* Luz decorativa */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -right-16 -top-24
      size-72 rounded-full bg-${color}-400/20 blur-3xl
      transition-opacity duration-300 group-hover:opacity-80`}
      />

      {/* Icono del sprite */}
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={`pointer-events-none absolute -bottom-10 -right-10
      size-56 -rotate-12 text-${color}-200 opacity-15
      transition-transform duration-500
      group-hover:rotate-0 group-hover:scale-110
      motion-reduce:transform-none motion-reduce:transition-none
      sm:-bottom-12 sm:right-4 sm:size-72`}
      >
        <use href={`${spriteUrl}#${icon}`} />
      </svg>

      <div className="relative z-10 max-w-lg">
        <span
          className={`inline-flex items-center gap-2 rounded-full
        border border-white/15 bg-white/10 px-3 py-1.5
        text-xs font-medium text-${color}-100`}
        >
          <span
            aria-hidden="true"
            className={`size-1.5 rounded-full bg-${color}-300`}
          />
          {badge}
        </span>

        <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h2>

        <p
          className={`mt-3 max-w-sm text-sm leading-relaxed text-${color}-100/80 sm:text-base`}
        >
          {description}
        </p>

        <span
          className={`mt-7 inline-flex items-center gap-3 rounded-xl
        bg-white px-4 py-3 text-sm font-semibold text-${color}-950
        shadow-sm transition-colors group-hover:bg-${color}-50`}
        >
          Abrir directorio
          <span
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-1
          motion-reduce:transform-none"
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
