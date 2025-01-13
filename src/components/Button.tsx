import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode,
  width?: string,
  height?: string,
  opaque?: boolean
}

export default function Button({
  children, 
  width = '16px', 
  height = '16px',
  opaque = false,
  ...props 
}: ButtonProps) {


  return (
    <button
      {...props}
      className={
        `${width} ${height} 
        rounded-full overflow-hidden 
        ${opaque ? 'bg-white dark:bg-gray-800' : ''}
        ${props.disabled ? '' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}
        transition-colors 
        p-4 justify-center items-center 
        pointer-events-auto`
      }>
      <span className="dark:text-gray-300 text-gray-700 text-base">{children}</span>
    </button>
  )
}
