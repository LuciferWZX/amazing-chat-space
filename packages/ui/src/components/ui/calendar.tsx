import * as React from "react"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
}) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "ama-:bg-background ama-:group/calendar ama-:p-3 ama-:[--cell-size:2rem] ama-:[[data-slot=card-content]_&]:bg-transparent ama-:[[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("ama-:w-fit", defaultClassNames.root),
        months: cn(
          "ama-:relative ama-:flex ama-:flex-col ama-:gap-4 ama-:md:flex-row",
          defaultClassNames.months
        ),
        month: cn("ama-:flex ama-:w-full ama-:flex-col ama-:gap-4", defaultClassNames.month),
        nav: cn(
          "ama-:absolute ama-:inset-x-0 ama-:top-0 ama-:flex ama-:w-full ama-:items-center ama-:justify-between ama-:gap-1",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "ama-:h-[--cell-size] ama-:w-[--cell-size] ama-:select-none ama-:p-0 ama-:aria-disabled:opacity-50",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "ama-:h-[--cell-size] ama-:w-[--cell-size] ama-:select-none ama-:p-0 ama-:aria-disabled:opacity-50",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "ama-:flex ama-:h-[--cell-size] ama-:w-full ama-:items-center ama-:justify-center ama-:px-[--cell-size]",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "ama-:flex ama-:h-[--cell-size] ama-:w-full ama-:items-center ama-:justify-center ama-:gap-1.5 ama-:text-sm ama-:font-medium",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "ama-:has-focus:border-ring ama-:border-input ama-:shadow-xs ama-:has-focus:ring-ring/50 ama-:has-focus:ring-[3px] ama-:relative ama-:rounded-md ama-:border",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "ama-:bg-popover ama-:absolute ama-:inset-0 ama-:opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          "ama-:select-none ama-:font-medium",
          captionLayout === "label"
            ? "ama-:text-sm"
            : "ama-:[&>svg]:text-muted-foreground ama-:flex ama-:h-8 ama-:items-center ama-:gap-1 ama-:rounded-md ama-:pl-2 ama-:pr-1 ama-:text-sm ama-:[&>svg]:size-3.5",
          defaultClassNames.caption_label
        ),
        table: "ama-:w-full ama-:border-collapse",
        weekdays: cn("ama-:flex", defaultClassNames.weekdays),
        weekday: cn(
          "ama-:text-muted-foreground ama-:flex-1 ama-:select-none ama-:rounded-md ama-:text-[0.8rem] ama-:font-normal",
          defaultClassNames.weekday
        ),
        week: cn("ama-:mt-2 ama-:flex ama-:w-full", defaultClassNames.week),
        week_number_header: cn(
          "ama-:w-[--cell-size] ama-:select-none",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "ama-:text-muted-foreground ama-:select-none ama-:text-[0.8rem]",
          defaultClassNames.week_number
        ),
        day: cn(
          "ama-:group/day ama-:relative ama-:aspect-square ama-:h-full ama-:w-full ama-:select-none ama-:p-0 ama-:text-center ama-:[&:first-child[data-selected=true]_button]:rounded-l-md ama-:[&:last-child[data-selected=true]_button]:rounded-r-md",
          defaultClassNames.day
        ),
        range_start: cn(
          "ama-:bg-accent ama-:rounded-l-md",
          defaultClassNames.range_start
        ),
        range_middle: cn("ama-:rounded-none", defaultClassNames.range_middle),
        range_end: cn("ama-:bg-accent ama-:rounded-r-md", defaultClassNames.range_end),
        today: cn(
          "ama-:bg-accent ama-:text-accent-foreground ama-:rounded-md ama-:data-[selected=true]:rounded-none",
          defaultClassNames.today
        ),
        outside: cn(
          "ama-:text-muted-foreground ama-:aria-selected:text-muted-foreground",
          defaultClassNames.outside
        ),
        disabled: cn(
          "ama-:text-muted-foreground ama-:opacity-50",
          defaultClassNames.disabled
        ),
        hidden: cn("ama-:invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon className={cn("ama-:size-4", className)} {...props} />
            )
          }

          if (orientation === "right") {
            return (
              <ChevronRightIcon
                className={cn("ama-:size-4", className)}
                {...props}
              />
            )
          }

          return (
            <ChevronDownIcon className={cn("ama-:size-4", className)} {...props} />
          )
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="ama-:flex ama-:size-[--cell-size] ama-:items-center ama-:justify-center ama-:text-center">
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames()

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "ama-:data-[selected-single=true]:bg-primary ama-:data-[selected-single=true]:text-primary-foreground ama-:data-[range-middle=true]:bg-accent ama-:data-[range-middle=true]:text-accent-foreground ama-:data-[range-start=true]:bg-primary ama-:data-[range-start=true]:text-primary-foreground ama-:data-[range-end=true]:bg-primary ama-:data-[range-end=true]:text-primary-foreground ama-:group-data-[focused=true]/day:border-ring ama-:group-data-[focused=true]/day:ring-ring/50 ama-:flex ama-:aspect-square ama-:h-auto ama-:w-full ama-:min-w-[--cell-size] ama-:flex-col ama-:gap-1 ama-:font-normal ama-:leading-none ama-:data-[range-end=true]:rounded-md ama-:data-[range-middle=true]:rounded-none ama-:data-[range-start=true]:rounded-md ama-:group-data-[focused=true]/day:relative ama-:group-data-[focused=true]/day:z-10 ama-:group-data-[focused=true]/day:ring-[3px] ama-:[&>span]:text-xs ama-:[&>span]:opacity-70",
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
