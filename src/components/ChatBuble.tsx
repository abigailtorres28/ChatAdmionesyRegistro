interface ChatBubbleProps {
  onClick: () => void;
  isOpen: boolean;
}

const ChatBubble = ({ onClick}: ChatBubbleProps) => {
  return (
    <button
      onClick={onClick}
      className="group"
    >
      <img src="./LOGO BOT UFPS.png" 
      alt="chat" 
      className="fixed bottom-6 right-6 object-contain max-h-20 max-w-20 transition-transform duration-300 ease-in-out group-hover:scale-110" />
    </button>
  );
};

export default ChatBubble;
