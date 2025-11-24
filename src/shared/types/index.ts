/**
 * This enumeration states whether a product stock status is in stock or out of stock
 */
export enum ProductStockStatus {
  IN_STOCK = 'IN_STOCK',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
}

/**
 * This enumeration indicates whether to return results in ascending or descending order
 */
export enum SortEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum FilterMatchTypeEnum {
  FULL = 'FULL',
  PARTIAL = 'PARTIAL',
}

export interface FilterMatchTypeInput {
  match?: string;
  match_type?: FilterMatchTypeEnum;
}

export interface FilterEqualTypeInput {
  eq?: string;
  in?: string[];
}

/**
 * This enumeration defines the entity type.
 */
export enum UrlRewriteEntityTypeEnum {
  BUNDLE_PRODUCT = 'BUNDLE_PRODUCT',
  CATEGORY = 'CATEGORY',
  CATEGORY_PRODUCT_LIST = 'CATEGORY_PRODUCT_LIST',
  CMS_PAGE = 'CMS_PAGE',
  CONFIGURABLE_PRODUCT = 'CONFIGURABLE_PRODUCT',
  GROUPED_PRODUCT = 'GROUPED_PRODUCT',
  PRODUCT = 'PRODUCT',
  SIMPLE_PRODUCT = 'SIMPLE_PRODUCT',
  VIRTUAL_PRODUCT = 'VIRTUAL_PRODUCT',
}

export interface SearchResultPageInfo {
  current_page?: number;
  page_size?: number;
  total_pages?: number;
}
