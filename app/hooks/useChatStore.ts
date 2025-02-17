import { useActionState, useEffect } from "react";
import { create } from "zustand";
import { sendPrompt } from "../api/chat/sendPrompt";

interface ChatState {
  state: Awaited<ReturnType<typeof sendPrompt>> | null; // Use the return type of sendPrompt
  formAction: (payload: FormData) => void; // Adjust the return type as needed
  pending: boolean;
  setState: (state: Awaited<ReturnType<typeof sendPrompt>> | null) => void;
  setPending: (pending: boolean) => void;
  setFormAction: (formAction: (payload: FormData) => void) => void;
}

const useChatStore = create<ChatState>((set) => ({
  state: null,
  formAction: () => {},
  pending: false,
  setState: (state) => state?.promptId && set({ state }),
  setPending: (pending) => set({ pending }),
  setFormAction: (formAction) => set({ formAction }),
}));

export const useChatState = () => {
  const [state, formAction, pending] = useActionState(sendPrompt, null);
  const setFormAction = useChatStore((state) => state.setFormAction);
  const setPending = useChatStore((state) => state.setPending);
  const setState = useChatStore((state) => state.setState);

  useEffect(() => {
    setFormAction(formAction);
    setPending(pending);
    setState(state);
  }, [formAction, pending, state, setFormAction, setPending, setState]);
  return useChatStore();
};
