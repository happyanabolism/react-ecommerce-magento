import clsx from 'clsx';
import './Grid.scss';

export const Grid = ({
  columns = 4,
  gap = 8,
  className,
  children,
  ...rest
}) => {
  const gridStyle = {
    '--grid-columns': columns,
    '--grid-gap': `${gap}px`
  }

  return (
    <div className={clsx('grid', className)} style={gridStyle} {...rest}>
      { children }
    </div>
  )
}
