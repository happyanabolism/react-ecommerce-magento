import { SearchIcon } from 'lucide-react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Spinner,
} from '@shared/ui';

interface SearchFieldProps {
  searchInput: string;
  onSearchInputChange: (searchInput: string) => void;
  loading: boolean;
}

export const SearchField = ({
  searchInput,
  onSearchInputChange,
  loading,
}: SearchFieldProps) => {
  return (
    <InputGroup className='h-10 bg-background'>
      <InputGroupAddon>
        {loading ? <Spinner /> : <SearchIcon aria-hidden='true' />}
      </InputGroupAddon>
      <InputGroupInput
        type='search'
        aria-label='Search products'
        placeholder='Search products…'
        autoComplete='off'
        value={searchInput}
        onChange={(event) => onSearchInputChange(event.target.value)}
      />
    </InputGroup>
  );
};
