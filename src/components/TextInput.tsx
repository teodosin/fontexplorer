import Image from 'next/image'
import Link from 'next/link'

interface TextInputProps {
    type: "search" | "preview-text",
    text?: string,
    list?: string,
    onChange?: (text: string) => void,
}

export default function TextInput({ type, text, onChange }: TextInputProps) {
    const containerClasses = "pointer-events-auto max-w-32rem w-full rounded-lg overflow-hidden shadow-lg transition-transform duration-200 hover:scale-105"
    const inputClasses = "dark:bg-gray-700 dark:text-white rounded-lg px-4 py-2 w-full"

    const placeholderMap = {
        "search": "Search fonts...",
        "preview-text": "Enter preview text...",
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value)
    }

    return (
        <div className={containerClasses}>
            <input 
                type="text" 
                list={type === "search" ? "fonts" : undefined}
                className={inputClasses} 
                placeholder={placeholderMap[type]}
                value={text}
                onChange={handleChange}
            />
        </div>
    )
}
