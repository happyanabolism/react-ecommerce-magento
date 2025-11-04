import clsx from "clsx"
import s from "./Container.module.scss"

export const Container = ({ className, children, ...rest }) => {
  return (
    <div className={clsx(s.container, className)} {...rest}>
      { children }
    </div>
  )
}
