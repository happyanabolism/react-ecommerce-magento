import { useId } from 'react';
import { StarIcon } from 'lucide-react';
import { cn } from 'cn';
import { FieldError, FieldLegend, FieldSet } from '../../shadcn/field';

interface RatingFieldProps {
  className?: string;
  name: string;
  label?: string;
  options: { label: string; value: string }[];
  error?: string;
  value?: string;
  onChange: (value: string) => void;
}

export const RatingField = ({
  className,
  name,
  label,
  options,
  error,
  value,
  onChange,
}: RatingFieldProps) => {
  const errorId = `${useId()}-error`;
  // stars up to the chosen one are filled
  const selectedIndex = options.findIndex((option) => option.value === value);

  return (
    <FieldSet
      data-invalid={!!error}
      aria-invalid={!!error}
      aria-describedby={error ? errorId : undefined}
      className={cn('gap-2', className)}
    >
      {label && (
        <FieldLegend variant='label' className='mb-0 first-letter:uppercase'>
          {label}
        </FieldLegend>
      )}
      {/* hovering previews the rating: the hovered star and the ones before it light up */}
      <div className='group/rating -mx-0.5 flex w-fit'>
        {options.map((option, index) => (
          <label
            key={option.value}
            className='cursor-pointer rounded-sm px-0.5 outline-none has-focus-visible:ring-3 has-focus-visible:ring-ring/50 [&:hover~label>svg]:fill-transparent [&:hover~label>svg]:text-muted-foreground/40'
          >
            <input
              type='radio'
              className='sr-only'
              name={name}
              value={option.value}
              checked={option.value === value}
              onChange={() => onChange(option.value)}
            />
            <StarIcon
              aria-hidden='true'
              className={cn(
                'size-7 stroke-[1.5] transition-[color,fill,scale] group-hover/rating:fill-warning group-hover/rating:text-warning',
                index <= selectedIndex
                  ? 'fill-warning text-warning'
                  : 'fill-transparent text-muted-foreground/40'
              )}
            />
            <span className='sr-only'>{option.label}</span>
          </label>
        ))}
      </div>
      {error && <FieldError id={errorId}>{error}</FieldError>}
    </FieldSet>
  );
};
