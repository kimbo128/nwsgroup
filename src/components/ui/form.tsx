import * as React from "react"
import { cn } from "@/lib/utils"

interface FormContextValue {
  errors: Record<string, string | undefined>
}

const FormContext = React.createContext<FormContextValue | undefined>(undefined)

interface FormProps {
  children: React.ReactNode
  onSubmit?: (e: React.FormEvent) => void
  errors?: Record<string, string | undefined>
}

const Form = ({ children, onSubmit, errors = {} }: FormProps) => {
  return (
    <FormContext.Provider value={{ errors }}>
      <form onSubmit={onSubmit} className="space-y-4">
        {children}
      </form>
    </FormContext.Provider>
  )
}

const FormField = ({ children }: { children: React.ReactNode }) => {
  return <div className="space-y-2">{children}</div>
}

const FormItem = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={cn("space-y-2", className)}>{children}</div>
}

const FormLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

const FormMessage = ({ name }: { name: string }) => {
  const context = React.useContext(FormContext)
  if (!context) return null

  const error = context.errors[name]
  if (!error) return null

  return <p className="text-sm font-medium text-destructive">{error}</p>
}

export { Form, FormField, FormItem, FormLabel, FormMessage }

