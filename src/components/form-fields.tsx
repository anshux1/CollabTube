"use client"

import type { JSX } from "react"
import { CalendarIcon, LucideIcon } from "lucide-react"
import { Control, FieldValues, Path } from "react-hook-form"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

export function FieldLabel(props: {
  children?: React.ReactNode
  required?: boolean
  className?: string
}) {
  return (
    <FormLabel className={cn("flex", props.className)}>
      {props.children}
      {props.required ? <span className="text-zinc-500">{"*"}</span> : null}
    </FormLabel>
  )
}

export function TextAreaField<F extends FieldValues>(props: {
  rows?: number
  required?: boolean
  placeholder?: string
  helperText?: string | JSX.Element
  control: Control<F>
  name: Path<F>
  label: React.ReactNode
  monospace?: boolean
}) {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <label className="flex flex-col gap-2">
            <FieldLabel required={props.required}>{props.label}</FieldLabel>
            <FormControl>
              <Textarea
                {...field}
                rows={props.rows}
                placeholder={props.placeholder}
                value={field.value ?? ""}
                style={{
                  fontFamily: props.monospace ? "ui-monospace, monospace" : undefined,
                }}
              />
            </FormControl>
            <FormMessage />
          </label>
        </FormItem>
      )}
    />
  )
}

export function InputField<F extends FieldValues>(props: {
  className?: string
  control: Control<F>
  name: Path<F>
  label?: React.ReactNode
  placeholder?: string
  required?: boolean
  type?: string
  disabled?: boolean
  prefixItem?: React.ReactNode
  autoComplete?: string
  Icon?: LucideIcon
  withIconPrefix?: boolean
}) {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          {props.label ? (
            <FieldLabel required={props.required}>{props.label}</FieldLabel>
          ) : null}
          <div className={cn(props.withIconPrefix && "relative")}>
            <FormControl>
              <Input
                {...field}
                value={field.value ?? ""}
                placeholder={props.placeholder}
                className={cn(props.withIconPrefix && "peer ps-9", props.className)}
                disabled={props.disabled}
                type={props.type}
                autoComplete={props.autoComplete}
              />
            </FormControl>
            {props.Icon && (
              <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-2 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                <props.Icon size={16} aria-hidden="true" />
              </div>
            )}
          </div>
        </FormItem>
      )}
    />
  )
}

export function SwitchField<F extends FieldValues>(props: {
  control: Control<F>
  name: Path<F>
  label: React.ReactNode
  required?: boolean
  border?: boolean
  disabled?: boolean
}) {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <label
            className={cn(
              "flex flex-row items-center gap-2",
              props.border ? "rounded-lg border p-3 shadow-sm" : null,
            )}
          >
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={props.disabled}
              />
            </FormControl>
            <FieldLabel required={props.required}>{props.label}</FieldLabel>
          </label>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export function SwitchListField<F extends FieldValues>(props: {
  variant?: "switch" | "checkbox"
  control: Control<F>
  name: Path<F>
  label: React.ReactNode
  options: { value: string; label: string }[]
  required?: boolean
  disabled?: boolean
  info?: string
}) {
  const Trigger = props.variant === "checkbox" ? Checkbox : Switch

  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{props.label}</FormLabel>
          <div className="flex flex-col space-y-4 rounded-lg border p-3 shadow-sm">
            {props.options.map((provider) => (
              <label
                className="flex flex-row items-center justify-between"
                key={provider.value}
              >
                <FieldLabel required={props.required}>{provider.label}</FieldLabel>
                <FormControl>
                  <Trigger
                    checked={field.value.includes(provider.value)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        field.onChange([...field.value, provider.value])
                      } else {
                        field.onChange(
                          field.value.filter((v: string) => v !== provider.value),
                        )
                      }
                    }}
                    disabled={props.disabled}
                  />
                </FormControl>
              </label>
            ))}
            {props.info ? (
              <p className="px-8 text-center text-xs text-zinc-400 dark:text-zinc-500">
                {props.info}
              </p>
            ) : null}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export function DateField<F extends FieldValues>(props: {
  control: Control<F>
  name: Path<F>
  label: React.ReactNode
  required?: boolean
  disabled?: boolean
}) {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FieldLabel required={props.required}>{props.label}</FieldLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground",
                  )}
                  disabled={props.disabled}
                >
                  {field.value ? (
                    field.value.toLocaleDateString()
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                initialFocus
                disabled={props.disabled}
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export function SelectField<F extends FieldValues>(props: {
  control: Control<F>
  name: Path<F>
  label: React.ReactNode
  options: { value: string; label: string }[]
  placeholder?: string
  required?: boolean
  disabled?: boolean
}) {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <FieldLabel required={props.required}>{props.label}</FieldLabel>
          <FormControl>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              disabled={props.disabled}
            >
              <SelectTrigger className="max-w-lg">
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {props.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export function CheckboxField<F extends FieldValues>(props: {
  control: Control<F>
  name: Path<F>
  label: React.ReactNode
  description?: string
  disabled?: boolean
}) {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-center space-y-0 space-x-1.5 rounded-md p-2">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={props.disabled}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel className={cn(props.disabled && "text-muted-foreground")}>
              {props.label}
            </FormLabel>
            {props.description && (
              <p className="text-muted-foreground text-sm">{props.description}</p>
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
