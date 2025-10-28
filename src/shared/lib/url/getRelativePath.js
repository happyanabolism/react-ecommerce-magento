export const getRelativePath = (pathname) => {
  return pathname ? pathname.replace(/^\/+/, '') : '';
};
