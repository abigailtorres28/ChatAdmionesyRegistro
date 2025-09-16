import { useChatStore } from "../store/chatStore";
import botAvatar from "../../public/LOGO BOT UFPS.png";
import { FaUser } from "react-icons/fa";
import { useEffect, useRef } from "react";

const ChatHistory = () => {
  const messages = useChatStore((state) => state.messages);
  const scrollRef = useRef<HTMLDivElement>(null);
  // Efecto: cada vez que cambian los mensajes, baja al final
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col gap-x-4 overflow-y-auto scrollbar-default">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex py-4 px-4 ${msg.role === "user" ? "justify-end" : "justify-start"
            }`}
        >
          {msg.role === "assistant" && (
            <img
              src={botAvatar}
              alt="Bot"
              className="w-8 h-8 rounded-full object-contain bg-red-600 p-1 overflow-hidden"
            />
          )}

          <div
            className={`max-w-[70%] px-4 py-2 rounded-2xl shadow text-sm break-words ${msg.role === "assistant"
              ? "bg-white text-gray-800 ml-2"
              : "bg-white text-gray-800 mr-2 text-left"
              }`}
          >

            {msg.content}
          </div>

          {msg.role === "user" && (
            <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center ml-0 place-self-end">
              <FaUser className="text-xs" />
            </div>
          )}
        </div>
      ))}
      {/* Elemento invisible que usamos para hacer scroll */}
      <div ref={scrollRef} />
    </div>
  );
};

export default ChatHistory;