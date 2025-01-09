import Image from 'next/image'
import Link from 'next/link'

interface ButtonProps {
  label: string
  onclick: () => void
}

export default function Thumbnail({ label }: ButtonProps) {
  return (
    <button 
      onClick={() => onclick}
      className="w-32 rounded-full overflow-hidden bg-white p-4 justify-center items-center">
      <span className="text-gray-700 text-base">{label}</span>
    </button>
  )
}
