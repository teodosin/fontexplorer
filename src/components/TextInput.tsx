import Image from 'next/image'
import Link from 'next/link'

interface TextInputProps {
    type: "search" | "preview-text" | "relation-type" | "relation-value",
    text?: string,
}

export default function TextInput({ type, text }: TextInputProps) {
    return (
        <div className="max-w-sm rounded-lg overflow-hidden shadow-lg transition-transform duration-200 hover:scale-105">
            <input type="text" className="border border-gray-300 rounded-lg px-4 py-2 w-full" placeholder="Enter text..." />
        </div>
    )
}
