import { Relation } from '@/fonts'
import { MouseEventHandler } from 'react'

export interface FontBlockProps {
  fontFamily: string
  previewText: string
  previewSize: number
  relation: Relation
  onClick: MouseEventHandler<HTMLButtonElement>
}

export default function FontBlock({ fontFamily, previewText, previewSize, relation, onClick }: FontBlockProps) {
  return (
    <button
      onClick={onClick}
      className={
        `w-80 px-6 rounded-3xl overflow-hidden bg-white dark:bg-gray-800 p-4 
        justify-center items-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`
      }
    >
      <h6 className="text-gray-700 dark:text-gray-400 text-base pb-4">{fontFamily}</h6>

      <span className="text-gray-700 dark:text-gray-200 overflow"
        style={{
          fontFamily: fontFamily,
          fontSize: `${previewSize}px`,
          lineHeight: `${previewSize * 1.1}px`,
        }}
      >{previewText}</span>

    </button>
  )
}
