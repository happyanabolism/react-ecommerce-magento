import { UrlRewriteEntityTypeEnum } from '@shared/types';

export interface Route {
  redirect_code: number;
  relative_url: string;
  type: UrlRewriteEntityTypeEnum;
}

export interface RouteQuery {
  route: Route;
}

export interface RouteQueryVars {
  url: string;
}
