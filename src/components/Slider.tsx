// Todo: Allow label to be changed

export default function Slider({ value, onChange }: { value: number, onChange: (size: number) => void }) {
  return (
    <div className="pointer-events-auto flex flex-row items-center gap-2 rounded-full bg-slate-200 dark:bg-black p-4 bg-opacity-50 dark:bg-opacity-80 backdrop-blur-md">
        <span className="text-gray-700 dark:text-gray-400">
            Preview Size: {value}
        </span>

        <input
            type="range"
            min="10"
            max="100"
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value))}
            className="h-2 bg-gray-400 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        >
        </input>
    </div>
  )
}
