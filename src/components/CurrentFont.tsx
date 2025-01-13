import { MouseEventHandler } from 'react'
import Button from './Button'

interface CurrentFontProps {
  font: string
  size: number
  text: string
  leftBtn: MouseEventHandler<HTMLButtonElement> | undefined
  rightBtn: MouseEventHandler<HTMLButtonElement> | undefined
}

export default function CurrentFont({ font, size, text, leftBtn, rightBtn }: CurrentFontProps) {
  let preview = text == '' ? 'Quick Brown Fox' : text

  return (
    <div
      className="max-w-36rem w-full px-8 pt-2 pb-16 text-center rounded-1/3 overflow-hidden bg-white dark:bg-gray-800 p-4 justify-center items-center"
    >
      <div className="flex flex-row w-full px-6 justify-center items-center gap-4 pb-8">
        <Button
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
          disabled={rightBtn === undefined}
          onClick={(e) => {
            if (rightBtn === undefined) return;
            rightBtn(e);
          }}
        >
          <span className="text-2xl">↣</span>
        </Button>
      </div>

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

