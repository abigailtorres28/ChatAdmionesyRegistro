import { useState } from "react";
import ChatBubble from "./components/ChatBuble";
import ChatHistory from "./components/ChatHistory";
import MessageInput from "./components/MessageInput";
import RoleSelector from "./components/RoleSelector";
import { useChatStore } from "./store/chatStore";
import { CgClose } from "react-icons/cg"
import { FaWindowMinimize } from "react-icons/fa6";


const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const userRole = useChatStore((state) => state.userRole);

    const toggleChat = () => setIsOpen((prev) => !prev);

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
                            <button className="text-white text-xl hover:text-gray-200" title="Minimizar">
                                < FaWindowMinimize className="text-xl font-semibold" />
                            </button>
                            <button className="text-white text-xl hover:text-gray-200" title="Cerrar">
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
                            </>
                        )}

                    </div>
                    {userRole && <MessageInput />}
                </div>
            )}

            {/* ChatBubble siempre visible */}
            <ChatBubble onClick={toggleChat} isOpen={isOpen} />
        </>
    );
};
export default ChatWidget;