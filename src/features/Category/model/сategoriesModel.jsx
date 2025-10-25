import { useQuery } from "@apollo/client/react"
import { GET_CATEGORIES } from "../api/categoriesApi"

export const useCategoies = ({ parentCategoryId, pageSize = 5, currentPage = 1} = {}) => {
  const { data, loading, error } = useQuery(GET_CATEGORIES, {
    variables: {
      filters: parentCategoryId ? {parent_id: {eq: parentCategoryId}} : {},
      pageSize: pageSize,
      currentPage: currentPage
    }
  });

  console.log(data);

  return { categories: data?.categories?.items || [], loading, error };
}