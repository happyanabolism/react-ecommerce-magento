import type { ConfigurableProductOptionsFragment } from '@shared/api';
import {
  Tooltip,
  ToggleGroup,
  ToggleGroupItem,
  TooltipContent,
  TooltipTrigger,
} from '@shared/ui';
import { Swatch } from '../Swatch/Swatch';
import type { OptionSelection, OptionSelectHandler } from '../../model/types';

interface ProductOptionProps {
  option: ConfigurableProductOptionsFragment;
  selected: OptionSelection;
  onSelect: OptionSelectHandler;
}

export const ProductOption = ({
  option,
  selected,
  onSelect,
}: ProductOptionProps) => {
  const code = option.attribute_code;
  if (!code) return null;

  return (
    <div className='flex flex-col gap-4'>
      <span>{option.label}</span>
      <ToggleGroup
        type='single'
        className='flex flex-wrap gap-4'
        value={selected[code] ?? ''}
        onValueChange={(uid) => onSelect(code, uid)}
      >
        {(option.values ?? [])
          .filter((value) => value !== null)
          .map((value) => {
            if (!value.uid) return null;
            return (
              <Tooltip key={value.uid}>
                <TooltipTrigger asChild>
                  <ToggleGroupItem
                    value={value.uid}
                    aria-label={value.label ?? ''}
                  >
                    <Swatch value={value} />
                  </ToggleGroupItem>
                </TooltipTrigger>
                <TooltipContent>{value.label}</TooltipContent>
              </Tooltip>
            );
          })}
      </ToggleGroup>
    </div>
  );
};
