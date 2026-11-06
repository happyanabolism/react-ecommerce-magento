import { SearchIcon } from 'lucide-react';
import type { SearchSuggestionFragment } from '@shared/api';
import { Button } from '@shared/ui';

interface SearchResultSuggestionsProps {
  suggestions: SearchSuggestionFragment[];
  onSuggestionSelect?: (suggestion: string) => void;
}

export const SearchResultSuggestions = ({
  suggestions,
  onSuggestionSelect,
}: SearchResultSuggestionsProps) => {
  if (suggestions.length === 0) return null;

  return (
    <section className='grid content-start gap-2'>
      <h3 className='text-xs font-semibold tracking-wide text-muted-foreground uppercase'>
        Suggestions
      </h3>
      <ul className='grid gap-0.5'>
        {suggestions.map((suggestion) => (
          <li key={suggestion.search}>
            <Button
              type='button'
              variant='ghost'
              size='sm'
              className='w-full justify-start font-normal'
              onClick={() =>
                onSuggestionSelect && onSuggestionSelect(suggestion.search)
              }
            >
              <SearchIcon
                aria-hidden='true'
                className='text-muted-foreground'
              />
              {suggestion.search}
            </Button>
          </li>
        ))}
      </ul>
    </section>
  );
};
