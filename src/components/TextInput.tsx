import Image from 'next/image'
import Link from 'next/link'

interface TextInputProps {
    type: "search" | "preview-text" | "relation-type" | "relation-value",
    text?: string,
}

export default function TextInput({ type, text }: TextInputProps) {
    const inputClasses = "border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-4 py-2 w-full"
    const containerClasses = "max-w-sm rounded-lg overflow-hidden shadow-lg transition-transform duration-200 hover:scale-105"

    switch (type) {
        case "search":
            return (
                <div className={containerClasses}>
                    <input type="text" className={inputClasses} placeholder="Enter text..." />
                </div>
            )
        case "preview-text":
            return (
                <div className={containerClasses}>
                    <input type="text" className={inputClasses} placeholder="Enter text..." />
                </div>
            )
        case "relation-type":
            return (
                <div className={containerClasses}>
                    <input type="text" className={inputClasses} placeholder="Enter text..." />
                </div>
            )
        case "relation-value":
            return (
                <div className={containerClasses}>
                    <input type="text" className={inputClasses} placeholder="Enter text..." />
                </div>
            )
    }
}
