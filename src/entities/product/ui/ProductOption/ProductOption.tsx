import type { ConfigurableProductOptionsFragment } from '@shared/api';
import {
  Tooltip,
  ToggleGroup,
  ToggleGroupItem,
  TooltipContent,
  TooltipTrigger,
} from '@shared/ui';
import { Swatch } from '../Swatch/Swatch';
import type {
  OptionDisabledCheck,
  OptionSelection,
  OptionSelectHandler,
  OptionValueImageGetter,
} from '../../model/types';

interface ProductOptionProps {
  option: ConfigurableProductOptionsFragment;
  selected: OptionSelection;
  onSelect: OptionSelectHandler;
  isDisabled: OptionDisabledCheck;
  getValueImage: OptionValueImageGetter;
}

export const ProductOption = ({
  option,
  selected,
  onSelect,
  isDisabled,
  getValueImage,
}: ProductOptionProps) => {
  const code = option.attribute_code;
  if (!code) return null;

  return (
    <div className='flex flex-col gap-4'>
      <span>{option.label}</span>
      <ToggleGroup
        type='single'
        className='grid grid-cols-8 gap-4 w-full'
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
                    disabled={isDisabled(code, value.uid)}
                    aria-label={value.label ?? ''}
                    variant='outline'
                    className='h-auto min-h-8 w-full overflow-hidden p-0 hover:border-foreground aria-checked:border-foreground aria-checked:ring-1 aria-checked:ring-foreground'
                  >
                    <Swatch
                      value={value}
                      swatchThumbnail={getValueImage(code, value.uid)}
                    />
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
