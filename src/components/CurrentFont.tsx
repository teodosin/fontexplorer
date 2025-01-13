import { MouseEventHandler, useState } from 'react'
import Button from './Button'

interface CurrentFontProps {
  font: string
  size: number
  text: string
  leftBtn: MouseEventHandler<HTMLButtonElement> | undefined
  rightBtn: MouseEventHandler<HTMLButtonElement> | undefined
  isFavorited: boolean
  onFavoriteToggle: (fontFamily: string) => void
}

export default function CurrentFont({ font, size, text, leftBtn, rightBtn, isFavorited, onFavoriteToggle }: CurrentFontProps) {
  // const [ favorited, setFavorited ] = useState(isFavorited)
  let preview = text == '' ? 'Quick Brown Fox' : text

  return (
    <div
      className={`
        flex flex-col justify-between
        max-w-36rem w-full px-8 pt-2 text-center rounded-1/3 
        overflow-hidden bg-white dark:bg-gray-800 p-4 items-center
      `}
    >
      <div className="flex flex-row w-full px-6 justify-center items-center gap-4 pb-8">
        <Button
          width={56}
          height={38}
          disabled={leftBtn === undefined}
          onClick={(e) => {
            if (leftBtn === undefined) return;
            leftBtn(e);
          }}
        >
          <span className="text-2xl">↢</span>
        </Button>

        <h6 className="text-gray-700 dark:text-gray-400 text-base pt-1">
          {font}
        </h6>

        <Button
          width={56}
          height={38}
          disabled={rightBtn === undefined}
          onClick={(e) => {
            if (rightBtn === undefined) return;
            rightBtn(e);
          }}
        >
          <span className="text-2xl">↣</span>
        </Button>
      </div>

      <span className="text-gray-900 dark:text-gray-100 mb-10"
        style={{
          fontFamily: font,
          fontSize: `${size}px`,
          lineHeight: `${size * 1.1}px`,
        }}
      >
        {preview}
      </span>

      <Button height={32} width={64}
        onClick={() => {
          onFavoriteToggle(font)
        }}
      >
        <span className="text-2xl">
          {isFavorited ? '★' : '☆'}
        </span>
      </Button>

    </div>
  )
}

