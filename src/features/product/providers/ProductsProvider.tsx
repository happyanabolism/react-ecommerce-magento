import type { ReactNode } from 'react';
import { useSearchParams } from 'react-router';
import {
  ProductsContext,
  useProducts,
  type ProductsContextValue,
} from '@entities/product';
import type { ID } from '@shared/types';

interface ProductsProviderProps {
  children: ReactNode;
  categoryUid?: ID;
}

export const ProductsProvider = ({
  children,
  categoryUid,
}: ProductsProviderProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') ?? '1');

  // const handlePageChange = (page: number) => {
  //   setSearchParams({ page: page.toString() }, { replace: true });

  //   fetchMore({
  //     variables: {
  //       currentPage: page,
  //     },
  //     updateQuery: (prev, { fetchMoreResult }) => fetchMoreResult ?? prev,
  //   });
  // };

  // const { aggregations, items, page_info, loading, error, fetchMore } =
  //   useProducts({
  //     filter: { category_uid: { eq: categoryUid } },
  //     currentPage: initialPage,
  //     skip: !categoryUid,
  //   });

  console.log(searchParams);

  const productsData = useProducts({
    filter: { category_uid: { eq: categoryUid } },
    currentPage,
    skip: !categoryUid,
  });

  const contextValue: ProductsContextValue = {
    ...productsData,
    setSearchParams,
  };

  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  );
};
