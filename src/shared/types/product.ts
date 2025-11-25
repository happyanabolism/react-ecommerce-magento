import type { Money } from './pricing';
import { SortEnum } from './sorting';
import type {
  AttributeMetadataError,
  AttributeValueInterface,
} from './attribute';

export enum ProductStockStatus {
  IN_STOCK = 'IN_STOCK',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
}

export interface ProductDiscount {
  amount_off?: number;
  percent_off?: number;
}

export interface FixedProductTax {
  amount?: Money;
  label?: string;
}

export interface ProductPrice {
  discount?: ProductDiscount;
  final_price: Money;
  fixed_product_taxes?: FixedProductTax[];
  regular_price: Money;
}

export interface PriceRange {
  maximum_price?: ProductPrice;
  minimum_price: ProductPrice;
}

export interface ProductAttributeSortInput {
  name?: SortEnum;
  position?: SortEnum;
  price?: SortEnum;
  relevance?: SortEnum;
}

export interface ProductImage {
  disabled?: boolean;
  label?: string;
  position?: number;
  url?: string;
}

export type ProductCustomAttributes = {
  errors: AttributeMetadataError[];
  items: AttributeValueInterface[];
};
