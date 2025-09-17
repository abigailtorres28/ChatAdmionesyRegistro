import { useState } from "react";
import ChatBubble from "./components/ChatBuble";
import ChatHistory from "./components/ChatHistory";
import MessageInput from "./components/MessageInput";
import RoleSelector from "./components/RoleSelector";
import RatingStars from "./components/Calificacion";
import { useChatStore } from "./store/chatStore";
import { CgClose } from "react-icons/cg"
import { FaWindowMinimize } from "react-icons/fa6";
import { useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";


const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showRating, setShowRating] = useState(false);
    const clearMessages = useChatStore((state) => state.clearMessages);
    const userRole = useChatStore((state) => state.userRole);
    const setUserRole = useChatStore((state) => state.setUserRole);
    const toggleChat = () => setIsOpen((prev) => !prev);
    const addMessage = useChatStore((state) => state.addMessage);
    const handleMinimize = () => {
        setIsOpen(false); // solo cierra el panel, la conversación se mantiene
    };
    const handleClose = () => {
        setShowRating(true); // muestra la sección de estrellas
    };
    const hasGreeted = useRef(false);

    useEffect(() => {
        if (userRole && !hasGreeted.current) {
            addMessage({
                id: uuidv4(),
                role: "assistant",
                content: `¡Hola! Soy el bot de la UFPS. ¿En qué puedo ayudarte como ${userRole.toLowerCase()}?`,
            });
            hasGreeted.current = true;
        }
    }, [userRole, addMessage]);

    return (
        <>
            {/* ChatPanel solo si está abierto */}
            {isOpen && (
                <div className="fixed bottom-24 right-24 w-[350px] max-w-[90vw] h-[500px] max-h-[90vh] bg-white rounded-[35px] shadow-xl flex flex-col overflow-hidden z-50">
                    <div className="bg-red-600 text-white p-4 font-semibold flex items-center justify-between">
                        {/** div que contiene la imagen del logo */}
                        <div className="flex items-center gap-2">
                            <img src="./LOGO BOT UFPS.png "
                                className="object-contain max-h-10 max-w-10"
                            />
                            <span className="text-white font-semibold text-lg">ADMI UFPS</span>
                        </div>
                        {/** div que los iconos de cerrar y minimizar*/}
                        <div className="flex items-center gap-2">
                            <button className="text-white text-xl hover:text-gray-200"
                                title="Minimizar"
                                onClick={handleMinimize}>
                                < FaWindowMinimize className="text-xl font-semibold" />
                            </button>
                            <button className={`text-sm ${!userRole
                                ? "text-red-400 cursor-not-allowed"
                                : "text-white hover:text-gray-200"
                                }`}
                                title="Cerrar"
                                disabled={!userRole}
                                onClick={handleClose}>
                                <CgClose className="text-3xl font-extrabold" />
                            </button>
                        </div>
                    </div>
                    {/*Seleccion de rol*/}
                    <div className="flex-1 bg-gray-50 overflow-y-auto">
                        {!userRole ? (
                            <RoleSelector />
                        ) : (
                            <>
                                <ChatHistory />
                                {showRating && (
                                    <div className="p-4 border-t text-center">
                                        <p className="mb-2 font-medium">¿Cómo fue tu experiencia con UFPS BOT?</p>
                                        <RatingStars
                                            onRate={(rating) => {
                                                console.log(`Calificación: ${rating} estrellas`);
                                                setShowRating(false);
                                                setIsOpen(false);
                                                clearMessages();
                                                setUserRole(null);
                                                hasGreeted.current = false;
                                            }}
                                        />
                                        <p className="text-sm text-gray-600">Haz clic en una estrella calificar</p>
                                    </div>
                                )}

                            </>
                        )}

                    </div>
                    {userRole && <MessageInput />}
                </div>
            )}
            <ChatBubble onClick={toggleChat} isOpen={isOpen} />
        </>
    );
};
export default ChatWidget;