import * as React from "react"
import { cn } from "@/lib/utils"

export interface SliderProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "onChange"> {
  value?: number
  onValueChange?: (value: number) => void
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, value, onValueChange, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState<number>(
      value || 0
    )

    const currentValue = value ?? internalValue

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(e.target.value)
      setInternalValue(newValue)
      onValueChange?.(newValue)
    }

    return (
      <div className={cn("relative flex w-full items-center", className)}>
        <input
          type="range"
          min={props.min || 0}
          max={props.max || 100000}
          value={currentValue}
          onChange={handleChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Slider.displayName = "Slider"

export { Slider }

