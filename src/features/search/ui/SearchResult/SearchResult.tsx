import { Link } from 'react-router';
import { cn } from 'cn';
import { ROUTES } from '@shared/config';
import { useProductSearch } from '../../model/useProductSearch';
import { SearchResultProducts } from '../SearchResultProducts/SearchResultProducts';
import { SearchResultSuggestions } from '../SearchResultSuggestions/SearchResultSuggestions';

interface SearchResultProps {
  search: string;
  onSuggestionSelect?: (suggestion: string) => void;
  onProductSelect?: () => void;
  onAllResultsSelect?: () => void;
}

export const SearchResult = ({
  search,
  onSuggestionSelect,
  onProductSelect,
  onAllResultsSelect,
}: SearchResultProps) => {
  const { data, error, isPlaceholderData } = useProductSearch(search);

  if (!data || error) return null;

  const { products, suggestions, totalCount } = data;

  if (suggestions.length === 0 && totalCount === 0) return null;

  return (
    // the parent is `relative`, the panel drops down under the field
    <div
      aria-busy={isPlaceholderData}
      className='absolute top-full right-0 left-0 z-50 mt-2 overflow-hidden rounded-lg border bg-popover text-popover-foreground shadow-md'
    >
      <div
        className={cn(
          'grid max-h-[70vh] gap-4 overflow-y-auto p-3 transition-opacity',
          isPlaceholderData && 'opacity-50'
        )}
      >
        <SearchResultSuggestions
          suggestions={suggestions}
          onSuggestionSelect={onSuggestionSelect}
        />
        <SearchResultProducts
          products={products}
          onProductSelect={onProductSelect}
        />
      </div>
      {totalCount > 0 && (
        <Link
          to={`${ROUTES.SEARCH}?${new URLSearchParams({ q: search })}`}
          onClick={onAllResultsSelect}
          className='block border-t px-3 py-2 text-sm font-medium hover:bg-muted focus-visible:bg-muted focus-visible:outline-none'
        >
          See all results ({totalCount})
        </Link>
      )}
    </div>
  );
};
