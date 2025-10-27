export const ROUTE_CONSTANTS = {
  HOME: '/',
  CART: '/cart',
  CATEGORY_VIEW: '/category/*',
  SIGN_IN: '/sign-in'
}

export const getCategoryRoute = (urlPath) =>
  ROUTE_CONSTANTS.CATEGORY_VIEW.replace('*', urlPath)