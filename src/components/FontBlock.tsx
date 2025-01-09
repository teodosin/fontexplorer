import { MouseEventHandler } from 'react'

interface FontBlockProps {
  currentFont: string
  focus: boolean
  text: string
  onClick: MouseEventHandler<HTMLButtonElement>
}

export default function FontBlock({ currentFont, focus, text, onClick }: FontBlockProps) {
  return (
    <button 
      onClick={onClick}
      className="w-32 rounded-full overflow-hidden bg-white dark:bg-gray-800 p-4 justify-center items-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
    >
      <span className="text-gray-700 text-base">{text}</span>
    </button>
  )
}
