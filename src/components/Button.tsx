import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode,
  width?: number,
  height?: number,
  opaque?: boolean
}

export default function Button({
  children, 
  width = 64, 
  height = 64,
  opaque = false,
  ...props 
}: ButtonProps) {


  return (
    <button
      {...props}
      style={{ width: `${width}px`, height: `${height}px` }}
      className={
        `rounded-full overflow-hidden 
        ${opaque ? 'bg-white dark:bg-gray-800' : ''}
        ${props.disabled ? 'opacity-60' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}
        transition-colors 
        justify-center items-center 
        pointer-events-auto`
      }>
      <span className="dark:text-gray-300 text-gray-700">{children}</span>
    </button>
  )
}
