import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
// import spriteUrl from "../../assets/sprite.svg?url";
import type { IconType } from "react-icons";

type TailwindColor =
  | "slate"
  | "gray"
  | "zinc"
  | "neutral"
  | "stone"
  | "red"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "green"
  | "emerald"
  | "teal"
  | "cyan"
  | "sky"
  | "blue"
  | "indigo"
  | "violet"
  | "purple"
  | "fuchsia"
  | "pink"
  | "rose";

interface ModuleCardProps {
  title: string;
  description: string;
  // icon: string;
  icon: IconType;
  to: string;
  color?: TailwindColor;
  badge?: string;
  actionText?: string;
  className?: string;
}

export function Card({
  title,
  description,
  icon: Icon,
  to,
  color = "cyan",
  badge = "Directorio de producción",
  actionText = "Abrir directorio",
  className = "col-span-full",
}: ModuleCardProps) {
  const style = {
    "--card-50": `var(--color-${color}-50)`,
    "--card-100": `var(--color-${color}-100)`,
    "--card-200": `var(--color-${color}-200)`,
    "--card-300": `var(--color-${color}-300)`,
    "--card-400": `var(--color-${color}-400)`,
    "--card-500": `var(--color-${color}-500)`,
    "--card-700": `var(--color-${color}-700)`,
    "--card-900": `var(--color-${color}-900)`,
    "--card-950": `var(--color-${color}-950)`,
  } as CSSProperties;

  return (
    <Link
      to={to}
      style={style}
      className={`group relative isolate overflow-hidden
        rounded-3xl border border-2 border-[var(--card-700)] bg-linear-to-br
        from-slate-950 via-[var(--card-950)] to-[var(--card-700)]
        px-7 py-5 text-white shadow-lg shadow-[color:var(--card-950)]/15
        transition duration-300
        hover:-translate-y-1 hover:border-[var(--card-400)]
        hover:shadow-xl hover:shadow-[color:var(--card-900)]/25
        focus-visible:outline-2 focus-visible:outline-offset-4
        focus-visible:outline-[var(--card-500)]
        motion-reduce:transform-none motion-reduce:transition-none
         ${className}`}
    >
      {/* Luz decorativa */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-24
          size-72 rounded-full bg-[var(--card-400)]/20 blur-3xl
          transition-opacity duration-300 group-hover:opacity-80"
      />

      {/* Icono del sprite */}
      {/* <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="pointer-events-none absolute -bottom-10 -right-10
          size-72 -rotate-12 text-[color:var(--card-200)]/15
          transition-transform duration-500
          group-hover:rotate-0 group-hover:scale-110
          motion-reduce:transform-none motion-reduce:transition-none
          sm:-bottom-12 sm:right-4 sm:size-72"
      >
        <use href={`${spriteUrl}#${icon}`} />
      </svg> */}
      <Icon
        aria-hidden="true"
        focusable="false"
        className="pointer-events-none absolute -bottom-10 -right-10
        size-65 -rotate-12 text-[color:var(--card-200)]/15
        transition-transform duration-500
        group-hover:rotate-0 group-hover:scale-110
        motion-reduce:transform-none motion-reduce:transition-none
        sm:-bottom-10 sm:right-4"
      />

      <div className="relative z-10 max-w-lg">
        <span
          className="inline-flex items-center gap-2 rounded-full
            border border-white/15 bg-white/10 px-3 py-1.5
            text-xs font-medium text-[color:var(--card-100)]"
        >
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full bg-[var(--card-300)]"
          />
          {badge}
        </span>

        <h2 className="mt-4 text-xl font-bold tracking-tight">{title}</h2>

        <p
          className="mt-3 max-w-sm text-sm leading-relaxed
            text-[color:var(--card-100)]/80 sm:text-base"
        >
          {description}
        </p>

        <span
          className="mt-5 inline-flex items-center gap-3 rounded-xl
            bg-white px-4 py-2 text-sm font-semibold
            text-[color:var(--card-950)] shadow-sm transition-colors
            group-hover:bg-[var(--card-50)]"
        >
          {actionText}

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
