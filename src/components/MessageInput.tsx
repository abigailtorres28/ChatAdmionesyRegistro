import { useState } from 'react'
import { IoSend } from 'react-icons/io5' // Ícono de enviar
import { useChatStore } from '../store/chatStore'

export const MessageInput = () => {
  const [input, setInput] = useState('')
  const addMessage = useChatStore((state) => state.addMessage)

  const handleSend = () => {
    if (!input.trim()) return
    addMessage({
      id: crypto.randomUUID(),
      role: 'user',
      content: input.trim(),
    })
    setInput('')
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="bg-zinc-200 px-4 py-4 rounded-b-xl">
      <div className="relative w-full">
        <textarea
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Escribe un mensaje..."
          className="
            w-full pr-10 pl-4 py-2 rounded-full bg-white
            resize-none focus:outline-none
            whitespace-pre-wrap break-words
            overflow-y-auto max-h-32 scrollbar-hide
          "
        />
        <button
          onClick={handleSend}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-red-600 hover:text-red-800 transition"
        >
          <IoSend size={22} />
        </button>
      </div>
    </div>
  )
}

export default MessageInput;