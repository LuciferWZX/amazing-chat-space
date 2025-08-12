import type { ReactNode } from "react"
import ReactDOM from "react-dom"

export const Portal = ({ children,container }: { children?: ReactNode,container?:HTMLElement }) => {
    return typeof document === 'object'
      ? ReactDOM.createPortal(children, container ?? document.body)
      : null
  }