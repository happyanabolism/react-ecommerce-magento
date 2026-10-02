import {
  useProductListing,
  type ProductListingCriteria,
} from '@features/product-listing';

interface CategoryProductFiltersProps {
  criteria: ProductListingCriteria;
}

export const CategoryProductFilters = ({
  criteria,
}: CategoryProductFiltersProps) => {
  const { aggregations } = useProductListing(criteria);

  return (
    <ul>
      {aggregations.map((aggregation) => (
        <li key={aggregation.attribute_code}>{aggregation.label}</li>
      ))}
    </ul>
  );
};
