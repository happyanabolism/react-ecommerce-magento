export const getRelativePath = (pathname: string): string => {
  return pathname ? pathname.replace(/^\/+/, '') : '';
};
