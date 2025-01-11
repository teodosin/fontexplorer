import { Relation } from '@/utils/fonts_client'
import { MouseEventHandler } from 'react'

export interface FontBlockProps {
  fontFamily: string
  previewText: string
  previewSize: number
  relation: Relation
  onClick: MouseEventHandler<HTMLButtonElement>
}

export default function FontBlock({ fontFamily, previewText, previewSize, relation, onClick }: FontBlockProps) {
  let preview = previewText == '' ? 'Quick Brown Fox' : previewText

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    onClick(event)
    
  }

  return (
    <div
      className={
        `w-80 px-2 rounded-3xl overflow-hidden bg-white dark:bg-gray-800 p-4 
      justify-center items-center flex flex-col`
      }
    >
      <div className="flex-shrink-0" >
        <h6 className="text-gray-700 dark:text-gray-400 text-base">{fontFamily}</h6>
      </div>

      <button
        onClick={handleButtonClick}
        className="flex flex-grow flex-col w-full py-4 justify-center rounded-3xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <span className="w-full text-center text-gray-700 dark:text-gray-200 overflow"
          style={{
            fontFamily: fontFamily,
            fontSize: `${previewSize}px`,
            lineHeight: `${previewSize * 1.1}px`,
          }}
        >
          {preview}
        </span>
      </button>

      <div className="flex flex-col flex-shrink-0 w-full p-2">
        <span className="w-full text-center text-gray-500 dark:text-gray-400 text-sm">
          Compare to current font:
        </span>
        <textarea rows={2}
          className="resize-none mt-2 bg-slate-100 dark:bg-slate-700 w-full rounded-lg p-2"
        />
      </div>

    </div>
  )
}
