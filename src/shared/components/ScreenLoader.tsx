import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FullScreenLoaderProps {
  loading: boolean;
}

export default function ScreenLoader({ loading }: FullScreenLoaderProps) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (loading && !dialog.current?.open) {
      dialog.current?.showModal();
    }
  }, [loading]);

  return (
    <dialog
      ref={dialog}
      aria-label="Procesando operación"
      onCancel={(event) => event.preventDefault()}
      className="fixed inset-0 m-0 h-dvh w-screen max-h-none
        max-w-none border-0 bg-transparent p-0 backdrop:bg-transparent"
    >
      <AnimatePresence
        onExitComplete={() => {
          if (!loading) dialog.current?.close();
        }}
      >
        {loading && (
          <motion.div
            key="loader"
            className="absolute inset-0 flex flex-col items-center
              justify-center gap-5 bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="rounded-full bg-white/90 p-5 shadow-xl"
            >
              <div
                aria-hidden="true"
                className="h-20 w-20 animate-spin rounded-full
                  border-8 border-cyan-500 border-t-transparent"
              />
            </motion.div>

            <p
              role="status"
              className="rounded-full bg-white px-4 py-2
                text-sm font-semibold text-slate-700 shadow-sm"
            >
              Procesando, espera un momento...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </dialog>
  );
}
