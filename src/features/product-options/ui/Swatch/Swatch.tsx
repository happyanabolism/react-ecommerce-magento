import type { SwatchValueFragment } from '@shared/api';

interface SwatchProps {
  value: SwatchValueFragment;
}

const isColor = (value: string | null): value is string =>
  !!value && CSS.supports('color', value);

export const Swatch = ({ value }: SwatchProps) => {
  switch (value.swatch_data?.__typename) {
    case 'TextSwatchData':
      return value.swatch_data.value ?? value.label;
    case 'ColorSwatchData':
      if (!isColor(value.swatch_data.value)) break;
      return (
        <span
          className='size-6 rounded-full border'
          style={{ backgroundColor: value.swatch_data.value }}
        />
      );
    case 'ImageSwatchData':
      return (
        <img
          src={value.swatch_data.thumbnail ?? ''}
          alt=''
          className='size-8'
        />
      );
  }
  return value.label;
};
