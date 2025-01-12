import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={
        `w-32 rounded-full overflow-hidden bg-white dark:bg-gray-800 
        p-4 justify-center items-center hover:bg-gray-100 
        dark:hover:bg-gray-700 transition-colors pointer-events-auto`
      }>
      <span className="dark:text-gray-300 text-gray-700 text-base">{children}</span>
    </button>
  )
}
