import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useProductSearch } from '../../model/useProductSearch';
import { SearchField } from '../SearchField/SearchField';
import { SearchResult } from '../SearchResult/SearchResult';
import { useDebounce } from '@shared/lib';
import { ROUTES } from '@shared/config';

export const Search = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState(searchQuery);
  const [isOpen, setIsOpen] = useState(false);
  const debouncedSearchInput = useDebounce(searchInput, 300);
  const { isFetching } = useProductSearch(debouncedSearchInput);

  return (
    <form
      role='search'
      className='relative'
      onFocus={() => setIsOpen(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setIsOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          setIsOpen(false);
        }
      }}
      onSubmit={(event) => {
        event.preventDefault();
        if (!searchInput.trim()) return;
        setIsOpen(false);
        navigate(`${ROUTES.SEARCH}?${new URLSearchParams({ q: searchInput })}`);
      }}
    >
      <SearchField
        searchInput={searchInput}
        onSearchInputChange={(input) => {
          setSearchInput(input);
          setIsOpen(true);
        }}
        loading={isFetching}
      />
      {debouncedSearchInput && isOpen && (
        <SearchResult
          search={debouncedSearchInput}
          onProductSelect={() => setIsOpen(false)}
          onAllResultsSelect={() => setIsOpen(false)}
          onSuggestionSelect={(suggestion) => setSearchInput(suggestion)}
        />
      )}
    </form>
  );
};
