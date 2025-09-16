import { create } from "zustand";

type Role = "Aspirante" | "Estudiante" | "Graduado" | "otro" | null;

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatState {
  messages: Message[];
  userRole: Role;
  setUserRole: (role: Role) => void;
  addMessage: (msg: Message) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [
     {
    id: "1",
    role: "assistant",
    content: "¡Hola!, soy UFPS BOT estoy aquí para ayudarte, no dudes en preguntar lo que necesites.",
  }
  ],
  userRole: null,
  setUserRole: (role) => set({ userRole: role }),
  addMessage: (msg) =>
    set((state) => ({ messages: [...state.messages, msg] })),
  clearMessages: () => set({ messages: [] }),
}));
