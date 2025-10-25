import { useQuery } from "@apollo/client/react"
import { GET_CATEGORIES, GET_CATEGORIES_WITH_PRODUCTS } from "../api/categoriesApi"

export const useCategoies = ({ parentCategoryId, pageSize = 20, currentPage = 1} = {}) => {
  const { data, loading, error } = useQuery(GET_CATEGORIES, {
    variables: {
      filters: parentCategoryId ? {parent_id: {eq: parentCategoryId}} : {},
      pageSize: pageSize,
      currentPage: currentPage
    }
  });

  return { categories: data?.categories?.items || [], loading, error };
}

export const useCategoiesWithProducts = ({ urlPath, pageSize = 20, currentPage = 1 }) => {
  const filters = {
    url_path: {
      eq: urlPath
    }
  }

  const { data, loading, error } = useQuery(GET_CATEGORIES_WITH_PRODUCTS, {
    variables: {
      filters: filters,
      pageSize: pageSize,
      currentPage: currentPage
    }
  });

  return { category: data?.categories?.items?.[0] || {}, loading, error };
} 