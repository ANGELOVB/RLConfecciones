// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import toast from "react-hot-toast";
// import { useAuthStore } from "../stores/auth.store";
// import { loginSchema, type LoginFormValues } from "../schemas/auth.schema";

// export function LoginPage() {
//   const { login, loading } = useAuthStore();
//   const [showPassword, setShowPassword] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     setError,
//     clearErrors,
//     formState: { errors, isSubmitting },
//   } = useForm<LoginFormValues>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   const busy = loading || isSubmitting;

//   const ingresar = async (datos: LoginFormValues) => {
//     clearErrors("root");
//     setShowPassword(false);

//     try {
//       await login(datos);
//       toast.success("Bienvenido");
//     } catch {
//       setError("root", {
//         message:
//           "No se pudo iniciar sesión. Revisa tus credenciales o inténtalo de nuevo.",
//       });
//     }
//   };

//   const inputClass = `w-full rounded-2xl border border-white/15
//     bg-slate-950/50 py-3.5 text-base text-white outline-none
//     placeholder:text-slate-500 transition
//     focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10
//     aria-invalid:border-rose-400 aria-invalid:focus:ring-rose-400/10
//     disabled:cursor-wait disabled:opacity-60`;

//   return (
//     <main className="relative isolate grid min-h-dvh place-items-center overflow-hidden bg-slate-950 px-4 py-10 text-white sm:px-6">
//       {/* Fondo decorativo */}
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute inset-0 -z-10"
//       >
//         <div className="absolute -left-40 -top-40 size-[500px] rounded-full bg-cyan-600/15 blur-[100px]" />
//         <div className="absolute -bottom-40 -right-40 size-[500px] rounded-full bg-indigo-600/15 blur-[100px]" />

//         <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] bg-size-[28px_28px]" />
//       </div>

//       <section
//         aria-labelledby="login-title"
//         className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 shadow-2xl shadow-black/30 backdrop-blur-xl lg:grid-cols-2"
//       >
//         {/* Panel de bienvenida */}
//         <aside className="relative hidden overflow-hidden border-r border-white/10 bg-linear-to-br from-cyan-950 via-slate-900 to-slate-950 p-12 lg:flex lg:flex-col lg:justify-between">
//           <div
//             aria-hidden="true"
//             className="pointer-events-none absolute -left-24 -top-24 size-80 rounded-full bg-cyan-400/15 blur-3xl"
//           />

//           <div className="relative">
//             <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200/15 bg-cyan-200/5 px-3 py-1.5 text-xs font-medium text-cyan-100">
//               <span
//                 aria-hidden="true"
//                 className="size-1.5 rounded-full bg-cyan-300"
//               />
//               Directorio de producción
//             </span>

//             <h2 className="mt-12 text-5xl font-semibold leading-tight tracking-tight">
//               Tu producción.
//               <br />
//               Tu equipo.
//               <br />
//               <span className="text-cyan-300">Todo conectado.</span>
//             </h2>

//             <p className="mt-6 max-w-xs text-sm leading-7 text-slate-400">
//               Organiza tus contactos y accede a las herramientas que necesitas
//               para trabajar cada día.
//             </p>
//           </div>

//           {/* Ilustración decorativa */}
//           <div
//             aria-hidden="true"
//             className="relative mx-auto my-10 grid size-52 place-items-center"
//           >
//             <div className="absolute inset-0 rounded-full border border-cyan-300/10" />
//             <div className="absolute inset-6 rounded-full border border-cyan-300/15" />
//             <div className="absolute inset-12 rounded-full bg-cyan-400/10 blur-xl" />

//             <div className="grid size-20 -rotate-12 place-items-center rounded-3xl border border-cyan-200/20 bg-linear-to-br from-cyan-300/20 to-cyan-600/5 shadow-xl shadow-cyan-950/40">
//               <svg
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="1.4"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="size-10 rotate-12 text-cyan-200"
//               >
//                 <path d="m12 3 9 5-9 5-9-5 9-5Z" />
//                 <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
//               </svg>
//             </div>

//             <span className="absolute right-4 top-8 size-3 rounded-full bg-cyan-300 shadow-lg shadow-cyan-300/30" />
//             <span className="absolute bottom-8 left-5 size-2 rounded-full bg-indigo-300" />
//           </div>

//           <p className="relative text-xs tracking-wide text-slate-500">
//             Un espacio para mantener todo en orden.
//           </p>
//         </aside>

//         {/* Formulario */}
//         <div className="px-6 py-10 sm:px-10 sm:py-12 lg:p-12">
//           <header className="mb-9">
//             <div className="mb-7 grid size-12 place-items-center rounded-2xl border border-cyan-300/20 bg-cyan-400/10 text-cyan-300">
//               <svg
//                 aria-hidden="true"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="1.7"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="size-6"
//               >
//                 <rect x="5" y="10" width="14" height="11" rx="3" />
//                 <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" />
//               </svg>
//             </div>

//             <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
//               Bienvenido de nuevo
//             </p>

//             <h1
//               id="login-title"
//               className="text-3xl font-bold tracking-tight sm:text-4xl"
//             >
//               Inicia sesión
//             </h1>

//             <p className="mt-3 text-sm leading-6 text-slate-400">
//               Ingresa tus credenciales para acceder a tu panel.
//             </p>
//           </header>

//           <form onSubmit={handleSubmit(ingresar)} noValidate aria-busy={busy}>
//             <fieldset disabled={busy} className="space-y-6">
//               <legend className="sr-only">Credenciales de acceso</legend>

//               <div>
//                 <label
//                   htmlFor="login-email"
//                   className="mb-2 block text-sm font-medium text-slate-200"
//                 >
//                   Usuario o correo
//                 </label>

//                 <div className="relative">
//                   <svg
//                     aria-hidden="true"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="1.7"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-500"
//                   >
//                     <circle cx="12" cy="8" r="4" />
//                     <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
//                   </svg>

//                   <input
//                     id="login-email"
//                     type="text"
//                     autoComplete="username"
//                     autoCapitalize="none"
//                     spellCheck={false}
//                     placeholder="Tu usuario o correo"
//                     {...register("email")}
//                     aria-invalid={Boolean(errors.email)}
//                     aria-describedby={errors.email ? "email-error" : undefined}
//                     className={`${inputClass} pl-12 pr-4`}
//                   />
//                 </div>

//                 {errors.email && (
//                   <p
//                     id="email-error"
//                     role="alert"
//                     className="mt-2 text-sm text-rose-300"
//                   >
//                     {errors.email.message}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label
//                   htmlFor="login-password"
//                   className="mb-2 block text-sm font-medium text-slate-200"
//                 >
//                   Contraseña
//                 </label>

//                 <div className="relative">
//                   <svg
//                     aria-hidden="true"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="1.7"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-500"
//                   >
//                     <rect x="5" y="10" width="14" height="11" rx="3" />
//                     <path d="M8 10V7a4 4 0 0 1 8 0v3" />
//                   </svg>

//                   <input
//                     id="login-password"
//                     type={showPassword ? "text" : "password"}
//                     autoComplete="current-password"
//                     autoCapitalize="none"
//                     spellCheck={false}
//                     placeholder="Ingresa tu contraseña"
//                     {...register("password")}
//                     aria-invalid={Boolean(errors.password)}
//                     aria-describedby={
//                       errors.password ? "password-error" : undefined
//                     }
//                     className={`${inputClass} pl-12 pr-14`}
//                   />

//                   <button
//                     type="button"
//                     onClick={() => setShowPassword((current) => !current)}
//                     aria-label={
//                       showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
//                     }
//                     aria-controls="login-password"
//                     className="absolute right-1.5 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-xl text-slate-400 transition hover:bg-white/5 hover:text-cyan-200 focus-visible:outline-2 focus-visible:outline-cyan-300 disabled:cursor-wait disabled:opacity-50"
//                   >
//                     <svg
//                       aria-hidden="true"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="1.7"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       className="size-5"
//                     >
//                       {showPassword ? (
//                         <>
//                           <path d="m3 3 18 18" />
//                           <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
//                           <path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c7 0 10 7 10 7a16 16 0 0 1-3.1 4.2" />
//                           <path d="M6.5 6.5A17 17 0 0 0 2 12s3 7 10 7a10.6 10.6 0 0 0 5.5-1.5" />
//                         </>
//                       ) : (
//                         <>
//                           <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12Z" />
//                           <circle cx="12" cy="12" r="3" />
//                         </>
//                       )}
//                     </svg>
//                   </button>
//                 </div>

//                 {errors.password && (
//                   <p
//                     id="password-error"
//                     role="alert"
//                     className="mt-2 text-sm text-rose-300"
//                   >
//                     {errors.password.message}
//                   </p>
//                 )}
//               </div>

//               <button
//                 type="submit"
//                 className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-linear-to-r from-cyan-300 to-cyan-400 px-5 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/15 transition enabled:hover:-translate-y-0.5 enabled:hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 disabled:cursor-wait disabled:opacity-60 motion-reduce:transform-none motion-reduce:transition-none"
//               >
//                 {busy ? (
//                   <>
//                     <span
//                       aria-hidden="true"
//                       className="size-4 animate-spin rounded-full border-2 border-slate-950/25 border-t-slate-950 motion-reduce:animate-none"
//                     />
//                     Iniciando sesión...
//                   </>
//                 ) : (
//                   <>
//                     Ingresar
//                     <span
//                       aria-hidden="true"
//                       className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
//                     >
//                       →
//                     </span>
//                   </>
//                 )}
//               </button>
//             </fieldset>

//             {errors.root && (
//               <p
//                 role="alert"
//                 className="mt-5 rounded-2xl border border-rose-400/20 bg-rose-400/10 p-4 text-sm leading-6 text-rose-200"
//               >
//                 {errors.root.message}
//               </p>
//             )}
//           </form>

//           <p className="mt-8 text-center text-xs leading-5 text-slate-500">
//             Directorio de producción · Panel de administración
//           </p>
//         </div>
//       </section>
//     </main>
//   );
// }
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useAuthStore } from "../stores/auth.store";
import { loginSchema, type LoginFormValues } from "../schemas/auth.schema";
import { FaRegUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";

const logoUrl = `${import.meta.env.BASE_URL}images/logo-rl.png`;
const produccionUrl = `${import.meta.env.BASE_URL}images/produccion.png`;

export function LoginPage() {
  const { login, loading } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const busy = loading || isSubmitting;

  const ingresar = async (datos: LoginFormValues) => {
    clearErrors("root");
    setShowPassword(false);

    try {
      await login(datos);
      toast.success("Bienvenido");
    } catch {
      setError("root", {
        message:
          "No se pudo iniciar sesión. Revisa tus credenciales o inténtalo de nuevo.",
      });
    }
  };

  const inputClass = `w-full rounded-2xl border border-white/15
    bg-slate-950/50 py-3.5 text-base text-white outline-none
    placeholder:text-slate-500 transition
    focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10
    aria-invalid:border-rose-400 aria-invalid:focus:ring-rose-400/10
    disabled:cursor-wait disabled:opacity-60`;

  return (
    <main
      className="relative isolate grid min-h-dvh place-items-center
        overflow-hidden bg-slate-950 px-4 py-8 text-white
        sm:px-6 sm:py-12"
    >
      {/* Fondo decorativo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div
          className="absolute -left-40 -top-40 size-[500px]
            rounded-full bg-cyan-600/15 blur-[100px]"
        />

        <div
          className="absolute -bottom-40 -right-40 size-[500px]
            rounded-full bg-indigo-600/15 blur-[100px]"
        />

        <div
          className="absolute inset-0
            bg-[radial-gradient(#ffffff08_1px,transparent_1px)]
            bg-size-[28px_28px]"
        />
      </div>

      <section
        aria-labelledby="login-title"
        className="grid w-full max-w-5xl overflow-hidden
          rounded-3xl border border-white/10 bg-slate-900/70
          shadow-2xl shadow-black/30 backdrop-blur-xl
          lg:grid-cols-2"
      >
        {/* Panel de bienvenida */}
        <aside
          className="relative hidden min-w-0 overflow-hidden
            border-r border-white/10 bg-linear-to-br
            from-cyan-950 via-slate-900 to-slate-950
            p-10 lg:flex lg:flex-col lg:justify-between"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 -top-24
              size-80 rounded-full bg-cyan-400/15 blur-3xl"
          />

          <div className="relative">
            <span
              className="inline-flex items-center gap-2 rounded-full
                border border-cyan-200/15 bg-cyan-200/5
                px-3 py-1.5 text-xs font-medium text-cyan-100"
            >
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-cyan-300"
              />
              RL Confecciones
            </span>

            <h2
              className="mt-8 text-4xl font-semibold
                leading-tight tracking-tight text-white"
            >
              Tu producción.
              <br />
              Tu equipo.
              <br />
              <span className="text-cyan-300">Todo conectado.</span>
            </h2>

            <p className="mt-5 max-w-xs text-sm leading-7 text-slate-400">
              Organiza tus contactos y accede a las herramientas que necesitas
              para trabajar cada día.
            </p>
          </div>

          {/* Collage de producción */}
          <div className="relative my-8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-6
                rounded-full bg-cyan-400/15 blur-3xl"
            />

            <div
              className="relative overflow-hidden rounded-2xl
                border border-cyan-200/20 bg-white/5 p-2
                shadow-2xl shadow-black/30"
            >
              <img
                src={produccionUrl}
                alt="Instalaciones y equipo de producción de RL Confecciones"
                className="block h-auto w-full rounded-xl"
              />
            </div>
          </div>

          <p
            className="relative border-t border-white/10 pt-5
              text-xs tracking-wide text-slate-500"
          >
            RL Confecciones S.A. de C.V.
          </p>
        </aside>

        {/* Formulario */}
        <div
          className="flex min-w-0 flex-col justify-center
            px-6 py-10 sm:px-10 sm:py-12 lg:p-12"
        >
          <header className="mb-8 flex flex-col justify-center items-center">
            {/* Fondo blanco para conservar visible el logo negro */}
            <div
              className="mb-7 rounded-2xl 
                border border-white/15 bg-white p-3 shadow-lg w-30"
            >
              <img
                src={logoUrl}
                alt="RL Confecciones"
                className="h-20 w-40 object-contain"
              />
            </div>

            <p
              className="mb-2 text-xs font-semibold uppercase
                tracking-[0.2em] text-cyan-300"
            >
              Bienvenido de nuevo
            </p>

            <h1
              id="login-title"
              className="text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Inicia sesión
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Ingresa tus credenciales para acceder a tu panel.
            </p>
          </header>

          <form onSubmit={handleSubmit(ingresar)} noValidate aria-busy={busy}>
            <fieldset disabled={busy} className="space-y-6">
              <legend className="sr-only">Credenciales de acceso</legend>

              {/* Usuario */}
              <div>
                <label
                  htmlFor="login-email"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Usuario o correo
                </label>

                <div className="relative">
                  <FaRegUser
                    className="pointer-events-none absolute left-4
                      top-1/2 size-5 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    id="login-email"
                    type="text"
                    autoComplete="username"
                    autoCapitalize="none"
                    spellCheck={false}
                    placeholder="Tu usuario o correo"
                    {...register("email")}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={`${inputClass} pl-12 pr-4`}
                  />
                </div>

                {errors.email && (
                  <p
                    id="email-error"
                    role="alert"
                    className="mt-2 text-sm text-rose-300"
                  >
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Contraseña */}
              <div>
                <label
                  htmlFor="login-password"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Contraseña
                </label>

                <div className="relative">
                  <MdLockOutline
                    className="pointer-events-none absolute left-4
                      top-1/2 size-5 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    autoCapitalize="none"
                    spellCheck={false}
                    placeholder="Ingresa tu contraseña"
                    {...register("password")}
                    aria-invalid={Boolean(errors.password)}
                    aria-describedby={
                      errors.password ? "password-error" : undefined
                    }
                    className={`${inputClass} pl-12 pr-14`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    aria-label={
                      showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                    }
                    aria-controls="login-password"
                    className="absolute right-1.5 top-1/2 grid size-11
                      -translate-y-1/2 place-items-center rounded-xl
                      text-slate-400 transition
                      hover:bg-white/5 hover:text-cyan-200
                      focus-visible:outline-2
                      focus-visible:outline-cyan-300
                      disabled:cursor-wait disabled:opacity-50"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                {errors.password && (
                  <p
                    id="password-error"
                    role="alert"
                    className="mt-2 text-sm text-rose-300"
                  >
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Ingresar */}
              <button
                type="submit"
                className="group flex w-full items-center justify-center
                  gap-3 rounded-2xl bg-linear-to-r
                  from-cyan-300 to-cyan-400 px-5 py-3.5
                  text-sm font-bold text-slate-950
                  shadow-lg shadow-cyan-500/15 transition
                  enabled:hover:-translate-y-0.5
                  enabled:hover:brightness-110
                  focus-visible:outline-2 focus-visible:outline-offset-4
                  focus-visible:outline-cyan-300
                  disabled:cursor-wait disabled:opacity-60
                  motion-reduce:transform-none motion-reduce:transition-none"
              >
                {busy ? (
                  <>
                    <span
                      aria-hidden="true"
                      className="size-4 animate-spin rounded-full
                        border-2 border-slate-950/25 border-t-slate-950
                        motion-reduce:animate-none"
                    />
                    Iniciando sesión...
                  </>
                ) : (
                  <>
                    Ingresar
                    <span
                      aria-hidden="true"
                      className="transition-transform
                        group-hover:translate-x-1
                        motion-reduce:transform-none"
                    >
                      →
                    </span>
                  </>
                )}
              </button>
            </fieldset>

            {errors.root && (
              <p
                role="alert"
                className="mt-5 rounded-2xl border border-rose-400/20
                  bg-rose-400/10 p-4 text-sm leading-6 text-rose-200"
              >
                {errors.root.message}
              </p>
            )}
          </form>

          <p className="mt-8 text-center text-xs leading-5 text-slate-500">
            RL Confecciones · Panel de administración
          </p>
        </div>
      </section>
    </main>
  );
}
