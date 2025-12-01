import * as React from "react"
import { cn } from "@/lib/utils"

interface DropdownMenuProps {
  children: React.ReactNode
  trigger: React.ReactNode
  align?: "start" | "end"
}

const DropdownMenu = ({ children, trigger, align = "end" }: DropdownMenuProps) => {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="relative inline-block text-left">
      <div onClick={() => setOpen(!open)}>{trigger}</div>
      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div
            className={cn(
              "absolute z-50 mt-2 w-56 rounded-md bg-popover shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",
              align === "end" ? "right-0" : "left-0"
            )}
          >
            <div className="py-1" role="menu">
              {children}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

const DropdownMenuItem = ({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}) => {
  return (
    <div
      className={cn(
        "block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer",
        className
      )}
      onClick={onClick}
      role="menuitem"
    >
      {children}
    </div>
  )
}

export { DropdownMenu, DropdownMenuItem }



