import type {
  SearchResultPageInfo,
  FilterEqualTypeInput,
  FilterMatchTypeInput,
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
  children: Category[];
}

export interface CategoryQuery {
  categories: {
    items: Category[];
    page_info?: SearchResultPageInfo;
  };
}

export interface CategoryQueryVars {
  filters?: CategoryFilterInput;
  pageSize?: number;
  currentPage?: number;
}
