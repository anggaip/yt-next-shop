import * as React from "react";

const TOAST_LIMIT = 5;
const TOAST_REMOVE_DELAY = 1_000;

type ToasterToast = {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
  open?: boolean;
};

type ToastAction =
  | { type: "ADD_TOAST"; toast: ToasterToast }
  | { type: "UPDATE_TOAST"; toast: Partial<ToasterToast> & { id: string } }
  | { type: "DISMISS_TOAST"; toastId?: string }
  | { type: "REMOVE_TOAST"; toastId?: string };

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) return;

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({ type: "REMOVE_TOAST", toastId });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

const reducer = (state: ToasterToast[], action: ToastAction): ToasterToast[] => {
  switch (action.type) {
    case "ADD_TOAST":
      return [action.toast, ...state].slice(0, TOAST_LIMIT);
    case "UPDATE_TOAST":
      return state.map((toast) =>
        toast.id === action.toast.id ? { ...toast, ...action.toast } : toast,
      );
    case "DISMISS_TOAST": {
      const { toastId } = action;

      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.forEach((toast) => addToRemoveQueue(toast.id));
      }

      return state.map((toast) =>
        toast.id === toastId || toastId === undefined
          ? { ...toast, open: false }
          : toast,
      );
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return [];
      }
      return state.filter((toast) => toast.id !== action.toastId);
    default:
      return state;
  }
};

const listeners = new Set<(toast: ToasterToast[]) => void>();

let memoryState: ToasterToast[] = [];

export const dispatch = (action: ToastAction) => {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => listener(memoryState));
};

export function useToast() {
  const [toasts, setToasts] = React.useState<ToasterToast[]>(memoryState);

  React.useEffect(() => {
    listeners.add(setToasts);
    return () => {
      listeners.delete(setToasts);
    };
  }, []);

  const toast = React.useCallback(
    ({ ...props }: Omit<ToasterToast, "id">) => {
      const id = crypto.randomUUID();
      const update = (props: Partial<ToasterToast>) =>
        dispatch({ type: "UPDATE_TOAST", toast: { ...props, id } });
      const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });

      dispatch({
        type: "ADD_TOAST",
        toast: {
          id,
          open: true,
          ...props,
        },
      });

      return {
        id,
        dismiss,
        update,
      };
    },
    [],
  );

  const dismiss = React.useCallback((toastId?: string) => {
    dispatch({ type: "DISMISS_TOAST", toastId });
  }, []);

  return {
    toasts,
    toast,
    dismiss,
  };
}

export type { ToasterToast };
