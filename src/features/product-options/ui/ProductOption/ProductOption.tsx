import type { ConfigurableProductOptionsFragment } from '@shared/api';
import {
  ToggleGroup,
  ToggleGroupItem,
  TooltipContent,
  TooltipTrigger,
} from '@shared/ui';
import { Swatch } from '../Swatch/Swatch';
import { Tooltip } from '@shared/ui';

interface ProductOptionProps {
  option: ConfigurableProductOptionsFragment;
}

export const ProductOption = ({ option }: ProductOptionProps) => {
  return (
    <div className='flex flex-col gap-4'>
      <span>{option.label}</span>
      <ToggleGroup type='single' className='flex flex-wrap gap-4'>
        {(option.values ?? [])
          .filter((value) => value !== null)
          .map((value) => {
            if (!value.uid) return null;
            return (
              <ToggleGroupItem key={value.uid} value={value.uid}>
                <Tooltip>
                  <TooltipTrigger>
                    <Swatch value={value} />
                  </TooltipTrigger>
                  <TooltipContent>{value.label}</TooltipContent>
                </Tooltip>
              </ToggleGroupItem>
            );
          })}
      </ToggleGroup>
    </div>
  );
};
