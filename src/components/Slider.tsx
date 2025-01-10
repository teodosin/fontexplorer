
export default function Slider({ value, onChange }: { value: number, onChange: (size: number) => void }) {
  return (
    <div className="flex flex-row items-center gap-2">
        <span>
            Preview Size: {value}
        </span>

        <input
            type="range"
            min="10"
            max="100"
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value))}
        >
        </input>
    </div>
  )
}
