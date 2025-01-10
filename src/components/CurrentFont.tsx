import { MouseEventHandler } from 'react'

interface CurrentFontProps {
  font: string
  size: number
  text: string
}

export default function CurrentFont({ font, size, text }: CurrentFontProps) {
  let preview = text == '' ? 'Quick Brown Fox' : text
  
  return (
    <div
      className="max-w-36rem w-full px-8 pt-6 pb-16 text-center rounded-full overflow-hidden bg-white dark:bg-gray-800 p-4 justify-center items-center"
    >
      <h6 className="text-gray-700 dark:text-gray-400 text-base pb-8">
        {font}
      </h6>
      <span className="text-gray-900 dark:text-gray-100"
        style={{
          fontFamily: font,
          fontSize: `${size}px`,
          lineHeight: `${size * 1.1}px`,
        }}
      >
        {preview}
      </span>
    </div>
  )
}

