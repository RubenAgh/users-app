import { memo } from 'react';
import styled from 'styled-components';
import { Input } from './Tasks/AddTask';

const SearchInput = styled(Input)`
  width: 60%;
  max-width: 320px;
  margin-left: auto;
  margin-bottom: 32px;
`;

interface SearchProps {
  searchTerm: string;
  isDisabled: boolean;
  inputPlaceholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<SearchProps> = ({ searchTerm, isDisabled, onChange, inputPlaceholder }) => (
  <SearchInput
    value={searchTerm}
    onChange={onChange}
    disabled={isDisabled}
    placeholder={inputPlaceholder}
  />
);

export default memo(Search);