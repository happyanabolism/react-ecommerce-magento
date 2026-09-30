import type {
  SearchResultPageInfo,
  FilterEqualTypeInput,
  FilterMatchTypeInput,
  ID,
} from '@shared/types';

interface CategoryFilterInput {
  category_uid?: FilterEqualTypeInput;
  ids?: FilterEqualTypeInput;
  name?: FilterMatchTypeInput;
  parent_category_uid?: FilterEqualTypeInput;
  parent_id?: FilterEqualTypeInput;
  url_key?: FilterEqualTypeInput;
  url_path?: FilterEqualTypeInput;
}

export interface Category {
  uid: string;
  name?: string;
  url_path?: string;
  include_in_menu?: number;
  default_sort_by?: string;
  position?: number;
  children: Category[];
}

export interface CategoryMenuItem {
  uid: string;
  name?: string;
  url_path?: string;
  include_in_menu?: number;
  position?: number;
}

export interface CategoryMenuRoot {
  uid: ID;
  children: CategoryMenuItem[];
}

export interface Categories {
  items: Category[];
  page_info: SearchResultPageInfo;
}

export interface CategoryQuery {
  categories: Categories;
}

export interface CategoryMenuQuery {
  categories: {
    items: CategoryMenuRoot[];
  };
}

export interface CategoryQueryVars {
  filters?: CategoryFilterInput;
  pageSize?: number;
  currentPage?: number;
}

export interface CategoryMenuQueryVars {
  rootUid?: ID;
}
