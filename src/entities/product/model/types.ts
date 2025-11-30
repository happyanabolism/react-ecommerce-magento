import type {
  SearchResultPageInfo,
  FilterEqualTypeInput,
  FilterMatchTypeInput,
  FilterRangeTypeInput,
  ProductImage,
  PriceRange,
  ProductCustomAttributes,
  ProductAttributeSortInput,
} from '@shared/types';

export interface ProductAttributeFilterInput {
  activity?: FilterEqualTypeInput;
  category_gear?: FilterEqualTypeInput;
  category_id?: FilterEqualTypeInput;
  category_uid?: FilterEqualTypeInput;
  category_url_path?: FilterEqualTypeInput;
  climate?: FilterEqualTypeInput;
  collar?: FilterEqualTypeInput;
  color?: FilterEqualTypeInput;
  description?: FilterMatchTypeInput;
  eco_collection?: FilterEqualTypeInput;
  erin_recommends?: FilterEqualTypeInput;
  features_bags?: FilterEqualTypeInput;
  format?: FilterEqualTypeInput;
  gender?: FilterEqualTypeInput;
  material?: FilterEqualTypeInput;
  name?: FilterMatchTypeInput;
  new?: FilterEqualTypeInput;
  pattern?: FilterEqualTypeInput;
  performance_fabric?: FilterEqualTypeInput;
  price?: FilterRangeTypeInput;
  purpose?: FilterEqualTypeInput;
  sale?: FilterEqualTypeInput;
  short_description?: FilterMatchTypeInput;
  size?: FilterEqualTypeInput;
  sku?: FilterEqualTypeInput;
  sleeve?: FilterEqualTypeInput;
  strap_bags?: FilterEqualTypeInput;
  style_bags?: FilterEqualTypeInput;
  style_bottom?: FilterEqualTypeInput;
  style_general?: FilterEqualTypeInput;
  url_key?: FilterEqualTypeInput;
}

export interface Product {
  uid: string;
  name?: string;
  sku?: string;
  small_image?: ProductImage;
  price_range: PriceRange;
  custom_attributesV2?: ProductCustomAttributes;
}

export interface Products {
  aggregations: Aggregation[];
  items: Product[];
  page_info: SearchResultPageInfo;
}

export interface Aggregation {
  attribute_code: string;
  count?: number;
  label?: string;
  options: AggregationOption[];
  position?: number;
}

export type AggregationOption = {
  count?: number;
  label?: string;
  value: string;
};

export interface ProductQuery {
  products: Products;
}

export interface ProductQueryVars {
  search?: string;
  filter?: ProductAttributeFilterInput;
  pageSize?: number;
  currentPage?: number;
  sort?: ProductAttributeSortInput;
}
