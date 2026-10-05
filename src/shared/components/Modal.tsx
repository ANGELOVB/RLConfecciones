import { useEffect, useId, useRef, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  title: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  busy?: boolean;
}

export default function Modal({
  title,
  open,
  onClose,
  children,
  busy = false,
}: ModalProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (open && !dialog.current?.open) {
      dialog.current?.showModal();
    }
  }, [open]);

  const cerrar = () => {
    if (!busy) onClose();
  };

  return (
    <dialog
      ref={dialog}
      aria-labelledby={titleId}
      aria-busy={busy}
      onCancel={(event) => {
        event.preventDefault();
        cerrar();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) cerrar();
      }}
      className="fixed inset-0 m-auto max-h-none max-w-none
        overflow-visible border-0 bg-transparent p-4
        backdrop:bg-black/40 backdrop:backdrop-blur-sm"
    >
      <AnimatePresence
        onExitComplete={() => {
          if (!open) dialog.current?.close();
        }}
      >
        {open && (
          <motion.div
            key="contenido"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex max-h-[85dvh] w-[min(28rem,calc(100vw-2rem))]
              flex-col overflow-hidden rounded-2xl bg-white shadow-xl"
          >
            <header className="flex shrink-0 items-center justify-between gap-4 border-b border-slate-200 p-5">
              <h2 id={titleId} className="text-xl font-bold text-slate-900">
                {title}
              </h2>

              <button
                type="button"
                aria-label="Cerrar modal"
                disabled={busy}
                onClick={cerrar}
                className="btn-secondary"
              >
                ✕
              </button>
            </header>

            <div className="min-h-0 overflow-y-auto p-6">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </dialog>
  );
}