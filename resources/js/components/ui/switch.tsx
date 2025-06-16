import { Switch as SwitchPrimitive, type SwitchProps } from "react-aria-components"

import { composeTailwindRenderProps } from "./primitive"

const Switch = ({ children, className, ...props }: SwitchProps) => {
  return (
    <SwitchPrimitive
      {...props}
      className={composeTailwindRenderProps(
        className,
        "group inline-flex touch-none items-center sm:text-sm",
      )}
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      {(values) => (
        <>
          <span className="mr-2 h-5 w-8 cursor-pointer rounded-full border-2 border-transparent bg-(--switch) transition duration-200 [--switch:color-mix(in_oklab,var(--color-muted)_90%,black_10%)] group-data-disabled:cursor-default group-data-selected:bg-primary group-data-disabled:opacity-50 group-data-focused:ring-4 group-data-focused:ring-4 group-data-focused:ring-primary/20 group-data-invalid:ring-danger/20 dark:[--switch:color-mix(in_oklab,var(--color-muted)_85%,white_15%)]">
            <span className="block rounded-full shadow-sm transition-all duration-200 origin-right size-4 bg-primary-fg group-data-selected:group-data-[pressed]:ml-2 group-data-selected:ml-3 group-data-pressed:w-5 forced-colors:data-disabled:outline-[GrayText]" />
          </span>
          {typeof children === "function" ? children(values) : children}
        </>
      )}
    </SwitchPrimitive>
  )
}

export { Switch }
