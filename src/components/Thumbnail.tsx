import Image from 'next/image'
import Link from 'next/link'

interface ThumbnailProps {
    title: string
    description: string
    imageUrl: string
    link: string
}

export default function Thumbnail({ title, description, imageUrl, link }: ThumbnailProps) {
    return (
        <div className="max-w-sm rounded-lg overflow-hidden shadow-lg transition-transform duration-200 hover:scale-105">
            <div className="relative h-48 w-full">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            <div className="px-6 py-4">
                <h2 className="font-bold text-xl mb-2 group-hover:text-blue-600">{title}</h2>
                <p className="text-gray-700 text-base">{description}</p>
            </div>
        </div>
    )
}
