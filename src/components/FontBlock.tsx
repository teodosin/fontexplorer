import { Relation, RELATIONS_KEY, RelationsData } from '@/utils/fonts_client'
import { MouseEventHandler, useEffect, useState } from 'react'
import Button from './Button'
import { on } from 'events'

export interface FontBlockProps {
  fontFamily: string
  previewText: string
  previewSize: number
  relation: Relation
  onClick: MouseEventHandler<HTMLButtonElement>
  isFavorited: boolean
  onFavoriteToggle: (fontFamily: string) => void
}

export default function FontBlock({
  fontFamily, previewText, previewSize, relation, onClick, isFavorited, onFavoriteToggle
}: FontBlockProps) {

  let preview = previewText == '' ? 'Quick Brown Fox' : previewText

  const [comparison, setComparison] = useState(relation.comparison)

  useEffect(() => {
    setComparison(relation.comparison)
  }, [relation])

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    onClick(event)
  }

  const saveRelation = () => {
    let key = RELATIONS_KEY + "_" + relation.fromFamily;

    let relData: RelationsData;
    if (localStorage.getItem(key)) {
        const storedData = JSON.parse(localStorage.getItem(key) || "");
        relData = {
            version: "0.0.1",
            fromFamily: relation.fromFamily,
            relations: new Map(Object.entries(storedData.relations || {}))
        }
    }
    else {
        relData = {
            version: "0.0.1",
            fromFamily: relation.fromFamily,
            relations: new Map()
        }
    }

    let newRel: Relation = {
        fromFamily: relation.fromFamily,
        toFamily: relation.toFamily,
        comparison: comparison
    }

    relData.relations.set(relation.toFamily, newRel);

    const dataToStore = {
        ...relData,
        relations: Object.fromEntries(relData.relations)
    };

    localStorage.setItem(key, JSON.stringify(dataToStore));
}


  return (
    <div
      className={
        `w-80 px-2 rounded-3xl overflow-hidden bg-white dark:bg-gray-800 p-1 
      justify-center items-center flex flex-col`
      }
    >
      <div className="w-full justify-between flex flex-row flex-shrink-0" >
        <Button height={32} width={64} 
          onClick={() => {
            onFavoriteToggle(fontFamily)
          }}
        >
            <span className="text-2xl">
              {isFavorited ? '★' : '☆'}
            </span>
        </Button>
        <h6 className="text-gray-700 dark:text-gray-400 text-base pt-1 px-2">{fontFamily}</h6>
        <div className="max-w-16 flex-grow h-8"></div>
      </div>

      <button
        onClick={handleButtonClick}
        className="flex flex-grow flex-col w-full py-4 justify-center rounded-3xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <span className="w-full text-center hover:scale-105 transition-transform text-gray-700 dark:text-gray-200 overflow"
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
          value={comparison}
          onChange={(e) => {
            setComparison(e.target.value)
            saveRelation()
          }}
          className={`scrollbar-thin resize-none mt-2
            bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors
            w-full rounded-lg p-2`}
        />
      </div>

    </div>
  )
}
