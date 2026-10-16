import type { ProductImageFragment, SwatchValueFragment } from '@shared/api';

interface SwatchProps {
  value: SwatchValueFragment;
  swatchThumbnail: ProductImageFragment | null;
}

const isColor = (value: string | null): value is string =>
  !!value && CSS.supports('color', value);

export const Swatch = ({ value, swatchThumbnail }: SwatchProps) => {
  switch (value.swatch_data?.__typename) {
    case 'TextSwatchData':
      return value.swatch_data.value ?? value.label;
    case 'ColorSwatchData':
      if (isColor(value.swatch_data.value)) {
        return (
          <span
            className='size-6 rounded-full border'
            style={{ backgroundColor: value.swatch_data.value }}
          />
        );
      } else if (swatchThumbnail?.url) {
        return (
          <img
            src={swatchThumbnail.url}
            alt=''
            className='block h-auto w-full'
          />
        );
      } else {
        break;
      }
    case 'ImageSwatchData':
      return (
        <img
          src={value.swatch_data.thumbnail ?? ''}
          alt=''
          className='block h-auto w-full'
        />
      );
  }
  return value.label;
};
